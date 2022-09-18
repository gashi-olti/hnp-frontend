export interface PostModel {
  uuid: string;
  title: string;
  description: string;
  type: number | null;
  category: number | null;
  location: string;
  positions: number;
  experience?: string;
  salary?: string;
  ends: string | Date;
  created_at?: string | Date;
}
