export const url = (currentValue: any) =>
  currentValue && `${currentValue}`.match(/^https?:\/\//i) === null
    ? `https://${currentValue}`
    : currentValue;
