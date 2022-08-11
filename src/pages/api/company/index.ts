import getConfig from 'next/config';

import withSession from '@/lib/withSession';
import { fetchJson } from '@/lib/api';
import authHeaders from '@/lib/authHeaders';
import cors from '@/lib/corsMiddleware';

const { serverRuntimeConfig } = getConfig();
const baseUrl = serverRuntimeConfig.backendUrl;

export default withSession(async (req, res) => {
  await cors(req, res);

  const token = req.session.get('token');
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    const url = `${baseUrl}/company`;

    try {
      const data = await fetchJson(url, {
        headers: authHeaders(token),
      });

      return res.json(data);
    } catch (error: any) {
      const { response } = error;
      if (response?.status === 404) {
        return res.json({});
      }
      return res.status(response?.status || 500).json(error.data);
    }
  }

  return res.status(405).send('Method not allowed.');
});
