import { DateTime } from 'luxon';

// export enum JobTypes {
//   fullTime = 1,
//   partTime,
//   internship,
// }

// export enum JobCategories {
//   administration = 1,
//   education,
//   agronomy,
//   it,
// }

export interface PostModel {
  uuid?: string;
  title?: string;
  description?: string;
  type?: number | null;
  category?: number | null;
  location?: string;
  positions?: number;
  experience?: string;
  salary?: string;
  ends?: string | Date;

  created_at?: string | DateTime;
}
