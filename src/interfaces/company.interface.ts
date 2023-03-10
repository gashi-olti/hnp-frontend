import { MediaItemType } from './media.interface';

export interface Company {
  uuid?: string;
  name?: string;
  number?: string;
  industry?: string;
  size?: number | null;
  founded?: string;
  website?: string;
  description?: string;
  specialties?: string;
  // vat_id?: string; - VAT doesn't exist for non-eu countries
  city?: string;
  postal_code?: string;
  country?: string;
  phone?: string;
  cover?: MediaItemType | null;
  media?: MediaItemType[] | null;

  slug?: string;
}
