import { getPropertyByCode, getPropertyById, listProperties, validateStatus, validateType } from '../services/propertiesService.js';

export async function handleProperties(pathParts, searchParams) {
  if (pathParts.length === 2 && pathParts[1] === 'properties') {
    const type = searchParams.get('type');
    const status = searchParams.get('status');
    const project = searchParams.get('project');
    if (!validateType(type)) return { status: 400, error: { code: 'INVALID_TYPE', message: 'Invalid property type.' } };
    if (!validateStatus(status)) return { status: 400, error: { code: 'INVALID_STATUS', message: 'Invalid inventory status.' } };
    return { status: 200, data: await listProperties({ project, type, status }) };
  }

  if (pathParts.length === 3 && pathParts[1] === 'properties' && pathParts[2] !== 'code') {
    return { status: 200, data: await getPropertyById(decodeURIComponent(pathParts[2])) };
  }

  if (pathParts.length === 4 && pathParts[1] === 'properties' && pathParts[2] === 'code') {
    const result = await getPropertyByCode(decodeURIComponent(pathParts[3]), searchParams.get('project'));
    if (result.kind === 'ambiguous') return { status: 400, error: { code: 'AMBIGUOUS_PROPERTY_CODE', message: 'Property code is not globally unique; provide the project filter.' } };
    return { status: 200, data: result.kind === 'ok' ? result.data : null };
  }

  return null;
}
