export const cached = <T extends unknown>(obj: any, register: () => T): T => {
  if (!("__" in obj)) {
    Object.assign(obj, { __: register() ?? true });
  }

  return obj.__;
};
