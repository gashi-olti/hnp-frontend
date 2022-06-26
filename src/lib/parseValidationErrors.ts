type ValidationError = {
  field: string;
  message: string;
  rule: string;
};

type ValidationOutput = {
  [key: string]: string[];
};

export default function parseValidationErrors(errors: ValidationError[]) {
  if (!errors) return null;

  return errors.reduce(
    (prev: ValidationOutput, curr) => ({
      ...prev,
      [curr.field]: prev[curr.field] ? [...prev[curr.field], curr.message] : [curr.message],
    }),
    {}
  );
}
