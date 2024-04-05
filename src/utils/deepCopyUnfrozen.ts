export function deepCopyUnfrozen(obj: any): any {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (obj instanceof File) return new File([obj], obj.name, { type: obj.type })

  if (Array.isArray(obj)) {
    return obj.map(deepCopyUnfrozen);
  }

  const newObj:{[key: string]: any} = {};
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      newObj[key] = deepCopyUnfrozen(obj[key]);
    }
  }
  return newObj;
}
