import getConfig from 'next/config';

import withSession from '@/lib/withSession';
import { fetchJson } from '@/lib/api';
import authHeaders from '@/lib/authHeaders';
import cors from '@/lib/corsMiddleware';

const { serverRuntimeConfig } = getConfig();
const baseUrl = serverRuntimeConfig.backendUrl;

export default withSession(async (req, res) => {
  await cors(req, res);

  if (req.method === 'GET') {
    const token = req.session.get('token');

    if (token) {
      try {
        const userData = await fetchJson(`${baseUrl}/auth`, {
          headers: authHeaders(token),
          method: 'GET',
        });

        return res.json({
          isLoggedIn: true,
          ...userData,
        });
      } catch (error) {
        return res.json({
          isLoggedIn: false,
        });
      }
    }

    return res.json({
      isLoggedIn: false,
    });
  }

  if (req.method === 'DELETE') {
    try {
      await fetchJson(`${baseUrl}/logout`);
    } catch (_err) {
      //
    }
    req.session.destroy();
    return res.json({ isLoggedIn: false });
  }

  return res.status(405).send('Method not allowed.');
});
