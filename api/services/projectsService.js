import { supabaseGet } from '../lib/supabase.js';

const PROJECT_FIELDS = 'id,slug,name,description,project_type,status,developer_name,rera_number,total_area,area_unit';

function toProject(project) {
  return {
    id: project.id,
    slug: project.slug,
    name: project.name,
    description: project.description,
    project_type: project.project_type,
    status: project.status,
    developer_name: project.developer_name,
    rera_number: project.rera_number,
    total_area: project.total_area,
    area_unit: project.area_unit
  };
}

export async function listProjects() {
  const rows = await supabaseGet('projects', {
    select: PROJECT_FIELDS,
    order: 'name.asc'
  });
  return rows.map(toProject);
}

export async function getProjectDetails(slug) {
  const projects = await supabaseGet('projects', {
    select: PROJECT_FIELDS,
    slug: `eq.${slug}`,
    limit: '1'
  });
  if (!projects[0]) return null;

  const project = projects[0];
  const [links, locations, landmarks] = await Promise.all([
    supabaseGet('project_amenities', {
      select: 'amenity_id',
      project_id: `eq.${project.id}`
    }),
    supabaseGet('project_locations', {
      select: 'id,location_type,address_line,city,district,state,postal_code,latitude,longitude,map_url,is_primary',
      project_id: `eq.${project.id}`,
      order: 'is_primary.desc,id.asc'
    }),
    supabaseGet('project_landmarks', {
      select: 'id,name,landmark_type,distance_value,distance_unit,travel_time_minutes,latitude,longitude,sort_order',
      project_id: `eq.${project.id}`,
      order: 'sort_order.asc,id.asc'
    })
  ]);

  let amenities = [];
  const amenityIds = links.map((row) => row.amenity_id).filter(Boolean);
  if (amenityIds.length) {
    amenities = await supabaseGet('amenities', {
      select: 'id,name,slug,description,icon',
      id: `in.(${amenityIds.join(',')})`,
      order: 'name.asc'
    });
  }

  return {
    project: toProject(project),
    amenities,
    primary_location: locations[0] ?? null,
    locations,
    landmarks
  };
}

export async function resolveProjectId(value) {
  if (!value) return null;
  const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (uuidPattern.test(value)) {
    const rows = await supabaseGet('projects', { select: 'id', id: `eq.${value}`, limit: '1' });
    return rows[0]?.id ?? null;
  }
  const rows = await supabaseGet('projects', { select: 'id', slug: `eq.${value}`, limit: '1' });
  return rows[0]?.id ?? null;
}
