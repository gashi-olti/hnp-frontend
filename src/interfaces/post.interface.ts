import { DateTime } from 'luxon';

export enum JobTypes {
  fullTime = 1,
  partTime,
  internship,
}

export interface PostModel {
  uuid?: string;
  title?: string;
  description?: string;
  type?: JobTypes;
  category?: number;
  location?: string;
  positions?: number;
  experience?: string;
  salary?: string;
  ends?: string | DateTime;

  created_at?: string | DateTime;
}
