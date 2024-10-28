// Copies properties from sourceObject to targetObject
export function copyPropertiesToTarget(target: object, source: object): void {
  for (const key of Object.keys(source)) {
    (target as any)[key] = (source as any)[key];
  }
}
