import Cors from 'cors';

import middleware from './middleware';

// Initialize the cors middleware
const cors = middleware(
  Cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  })
);

export default cors;
