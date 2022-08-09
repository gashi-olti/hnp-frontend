export interface CompanySizeInterface {
  key: number | null;
  value: string;
}

const companySize: CompanySizeInterface[] = [
  {
    key: null,
    value: '1 Employee',
  },
  {
    key: 1,
    value: '2-10 Employees',
  },
  {
    key: 2,
    value: '11-50 Employees',
  },
  {
    key: 3,
    value: '51-200 Employees',
  },
  {
    key: 4,
    value: '201-1000 Employees',
  },
  {
    key: 5,
    value: '1,001-5,000 Employees',
  },
  {
    key: 6,
    value: '5,001+ Employees',
  },
];

export default companySize;
