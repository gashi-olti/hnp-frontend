import withSession from '@/lib/withSession';
import cors from '@/lib/corsMiddleware';
import proxyMiddleware from '@/lib/proxyMiddleware';

export default withSession(async (req, res) => {
  await cors(req, res);

  const token = req.session.get('token');

  await proxyMiddleware(token)(req, res);
});

export const config = {
  api: {
    externalResolver: true,
    bodyParser: false,
  },
};
