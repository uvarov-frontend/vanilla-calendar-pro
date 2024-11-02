const replaceProperties = <T extends object>(original: T, replacement: T) => {
  const keys = Object.keys(replacement) as Array<keyof T>;
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (typeof original[key] === 'object' && typeof replacement[key] === 'object' && !(replacement[key] instanceof Date) && !Array.isArray(replacement[key])) {
      replaceProperties(original[key] as object, replacement[key] as object);
    } else if (replacement[key] !== undefined) {
      original[key] = replacement[key];
    }
  }
};

export default replaceProperties;
