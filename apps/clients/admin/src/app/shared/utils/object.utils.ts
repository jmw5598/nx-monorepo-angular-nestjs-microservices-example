export const removeEmptyKeys = (obj: any) => {
  Object.entries(obj).forEach(([k, v]) => {
      (v ?? delete obj[k])
      if (v && typeof v === 'object') {
          removeEmptyKeys(v)
      }
  });
}
