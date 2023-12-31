export const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (_: any, value: object) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

export const maskJSONOptions = {
  maskWith: '*',
  fields: [
    'password',
    'email',
    'phone_number',
    'items[*].password',
    'items[*].email',
    'items[*].phone_number',
  ],
};
