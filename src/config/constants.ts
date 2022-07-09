const constants = {
  pageTitle: 'hajdenpun.com',
  tagMaxLength: 32,
  creditCards: {
    visa: 'Visa',
    mastercard: 'Mastercard',
  },
  pagination: {
    defaultPageLimit: 10 as number,
    rowsPerPageOptions: [5, 10, 25] as number[],
  },
} as const;

export default constants;
