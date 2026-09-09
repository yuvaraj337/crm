import { router } from './server.js';

export default async function handler(req, res) {
  return router(req, res);
}
