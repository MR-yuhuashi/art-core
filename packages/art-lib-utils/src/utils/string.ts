export const trim = (value: string) => {
  return value && value.replace(/^\s+|\s+$/g, '') || '';
};