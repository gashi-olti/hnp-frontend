import getConfig from 'next/config';

import withSession from '@/lib/withSession';
import { fetchJson } from '@/lib/api';
import authHeaders from '@/lib/authHeaders';
import cors from '@/lib/corsMiddleware';

const { serverRuntimeConfig } = getConfig();
const baseUrl = serverRuntimeConfig.backendUrl;

export default withSession(async (req, res) => {
  const param = (req.query.param as string[]) ?? [];
  const url = [baseUrl, 'user', ...param].join('/');

  await cors(req, res);

  const token = req.session.get('token');
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    const body = await req.body;

    try {
      const data = await fetchJson(url, {
        body: JSON.stringify(body),
        headers: authHeaders(token),
        method: 'POST',
      });

      return res.json(data);
    } catch (error: any) {
      const { response } = error;
      return res.status(response?.status || 500).json(error.data);
    }
  }

  if (req.method === 'GET') {
    try {
      const data = await fetchJson(url, {
        headers: authHeaders(token),
        method: 'GET',
      });

      return res.json(data);
    } catch (error: any) {
      const { response } = error;
      return res.status(response?.status || 500).json(error.data);
    }
  }

  if (req.method === 'PUT') {
    const body = await req.body;
    try {
      const data = await fetchJson(url, {
        body: JSON.stringify(body),
        headers: authHeaders(token),
        method: 'PUT',
      });

      return res.json(data);
    } catch (error: any) {
      const { response } = error;
      return res.status(response?.status || 500).json(error.data);
    }
  }
  return res.status(405).send('Method not allowed.');
});
