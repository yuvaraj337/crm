import { supabaseGet } from '../lib/supabase.js';
import { resolveProjectId } from './projectsService.js';

export async function listProjectPlots(slug) {
  const projectId = await resolveProjectId(slug);
  if (!projectId) return null;

  const properties = await supabaseGet('properties', {
    select: 'id,property_code,title,inventory_status,metadata',
    project_id: `eq.${projectId}`,
    property_type: 'eq.PLOT',
    order: 'property_code.asc'
  });

  if (!properties.length) return [];
  const ids = properties.map((row) => row.id);
  const details = await supabaseGet('plot_details', {
    select: 'property_id,plot_number,plot_area,area_unit,label_x,label_y,rotation,display_order',
    property_id: `in.(${ids.join(',')})`,
    order: 'display_order.asc,plot_number.asc'
  });
  const detailMap = new Map(details.map((row) => [row.property_id, row]));

  return properties.map((property) => {
    const detail = detailMap.get(property.id) ?? null;
    return {
      property_id: property.id,
      property_code: property.property_code,
      title: property.title,
      inventory_status: property.inventory_status,
      plot_number: detail?.plot_number ?? null,
      plot_area: detail?.plot_area ?? null,
      area_unit: detail?.area_unit ?? null,
      label_x: detail?.label_x ?? null,
      label_y: detail?.label_y ?? null,
      rotation: detail?.rotation ?? null,
      display_order: detail?.display_order ?? null,
      local_coordinates: property.metadata ?? null,
      coordinate_system: 'local SVG/project coordinates; not EPSG:4326'
    };
  });
}
