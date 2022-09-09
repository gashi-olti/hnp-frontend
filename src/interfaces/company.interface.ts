import { MediaItemType } from './media.interface';

export interface CompanyProfile {
  uuid?: string;
  name?: string;
  number?: string;
  industry?: string;
  size?: string;
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
