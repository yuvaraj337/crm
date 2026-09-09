import { supabaseGet } from '../lib/supabase.js';
import { resolveProjectId } from './projectsService.js';

const TYPES = new Set(['PLOT', 'APARTMENT', 'VILLA', 'FARM_LAND']);
const STATUSES = new Set(['AVAILABLE', 'RESERVED', 'SOLD']);
const PROPERTY_FIELDS = 'id,project_id,property_code,slug,property_type,inventory_status,title,description,area,area_unit,price,currency,metadata';

export function validateType(value) {
  return !value || TYPES.has(value);
}

export function validateStatus(value) {
  return !value || STATUSES.has(value);
}

function toProperty(row, includeMetadata = false) {
  const result = {
    id: row.id,
    project_id: row.project_id,
    property_code: row.property_code,
    slug: row.slug,
    property_type: row.property_type,
    inventory_status: row.inventory_status,
    title: row.title,
    description: row.description,
    area: row.area,
    area_unit: row.area_unit,
    price: row.price,
    currency: row.currency
  };
  if (includeMetadata) result.metadata = row.metadata;
  return result;
}

export async function listProperties(filters = {}) {
  const params = {
    select: PROPERTY_FIELDS,
    order: 'property_code.asc'
  };

  if (filters.type) params.property_type = `eq.${filters.type}`;
  if (filters.status) params.inventory_status = `eq.${filters.status}`;
  if (filters.project) {
    const projectId = await resolveProjectId(filters.project);
    if (!projectId) return [];
    params.project_id = `eq.${projectId}`;
  }

  const rows = await supabaseGet('properties', params);
  return rows.map((row) => toProperty(row));
}

export async function getPropertyById(id) {
  const rows = await supabaseGet('properties', {
    select: PROPERTY_FIELDS,
    id: `eq.${id}`,
    limit: '1'
  });
  if (!rows[0]) return null;

  const property = rows[0];
  const plotRows = await supabaseGet('plot_details', {
    select: 'property_id,plot_number,plot_area,area_unit,label_x,label_y,rotation,display_order,geometry,centroid',
    property_id: `eq.${property.id}`,
    limit: '1'
  });

  return {
    property: toProperty(property, true),
    plot_details: plotRows[0] ? {
      property_id: plotRows[0].property_id,
      plot_number: plotRows[0].plot_number,
      plot_area: plotRows[0].plot_area,
      area_unit: plotRows[0].area_unit,
      label_x: plotRows[0].label_x,
      label_y: plotRows[0].label_y,
      rotation: plotRows[0].rotation,
      display_order: plotRows[0].display_order,
      geometry: plotRows[0].geometry ?? null,
      centroid: plotRows[0].centroid ?? null,
      coordinate_system: 'local SVG/project coordinates for source x/y/w/h; not EPSG:4326'
    } : null
  };
}

export async function getPropertyByCode(propertyCode, project) {
  const params = {
    select: PROPERTY_FIELDS,
    property_code: `eq.${propertyCode}`,
    order: 'id.asc'
  };
  if (project) {
    const projectId = await resolveProjectId(project);
    if (!projectId) return { kind: 'not_found' };
    params.project_id = `eq.${projectId}`;
  }

  const rows = await supabaseGet('properties', params);
  if (!rows.length) return { kind: 'not_found' };
  if (rows.length > 1) return { kind: 'ambiguous' };
  return { kind: 'ok', data: toProperty(rows[0], true) };
}
