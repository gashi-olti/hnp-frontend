import { NextApiRequest, NextApiResponse } from 'next';
import { Session, withIronSession } from 'next-iron-session';

export type NextIronRequest = NextApiRequest & { session: Session };
export type NextIronHandler = (req: NextIronRequest, res: NextApiResponse) => void | Promise<void>;

const withSession = (handler: NextIronHandler) =>
  withIronSession(handler, {
    password: process.env.SECRET_COOKIE_PASSWORD!,
    cookieName: 'hnp-functional',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  });

export default withSession;
