const protectedOptions = ['extensions', 'context', 'init', 'update', 'destroy', 'show', 'hide', 'set', 'queryAndMemoize'];

const replaceProperties = <T extends object>(original: T, replacement: T, root = true) => {
  const keys = Object.keys(replacement) as Array<keyof T>;
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    // Never traverse prototype setters or constructor chains from configuration data.
    if (key === '__proto__' || key === 'constructor' || key === 'prototype') continue;
    // Options must not reach live DOM nodes through context or replace instance methods.
    if (root && protectedOptions.includes(String(key))) continue;
    if (
      typeof original[key] === 'object' &&
      original[key] !== null &&
      typeof replacement[key] === 'object' &&
      replacement[key] !== null &&
      !(replacement[key] instanceof Date) &&
      !Array.isArray(replacement[key])
    ) {
      replaceProperties(original[key] as object, replacement[key] as object, false);
    } else if (replacement[key] !== undefined) {
      original[key] = replacement[key];
    }
  }
};

export default replaceProperties;
