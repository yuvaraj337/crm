import { listProjectPlots } from '../services/plotsService.js';

export async function handlePlots(pathParts) {
  if (pathParts.length === 4 && pathParts[1] === 'projects' && pathParts[3] === 'plots') {
    return { status: 200, data: await listProjectPlots(decodeURIComponent(pathParts[2])) };
  }
  return null;
}
