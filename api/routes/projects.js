import { getProjectDetails, listProjects } from '../services/projectsService.js';

export async function handleProjects(pathParts) {
  if (pathParts.length === 2 && pathParts[1] === 'projects') {
    return { status: 200, data: await listProjects() };
  }
  if (pathParts.length === 3 && pathParts[1] === 'projects') {
    const slug = decodeURIComponent(pathParts[2]);
    return { status: 200, data: await getProjectDetails(slug) };
  }
  return null;
}
