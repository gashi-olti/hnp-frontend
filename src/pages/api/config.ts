/* eslint-disable import/no-anonymous-default-export */
import getConfig from 'next/config';

import withSession from '@/lib/withSession';
import { fetchJson } from '@/lib/api';
import cors from '@/lib/corsMiddleware';

const { serverRuntimeConfig } = getConfig();
const baseUrl = serverRuntimeConfig.backendUrl;

export default withSession(async (req, res) => {
  await cors(req, res);

  if (req.method === 'GET') {
    const url = `${baseUrl}/config`;

    try {
      const data = await fetchJson(url, {
        method: 'GET',
      });

      return res.json(data);
    } catch (error: any) {
      const { response } = error;
      return res.status(response?.status || 500).json(error.data);
    }
  }

  return res.status(405).send('Method not allowed.');
});
