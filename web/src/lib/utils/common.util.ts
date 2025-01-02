import { Option } from "@/interfaces/types";

export function areArraysEqual(array1?: number[], array2?: number[]) {
  if (!array1 || !array2) return;
  if (array1?.length !== array2?.length) {
    return false;
  }

  for (let i = 0; i < array1.length; i++) {
    if (!array1.includes(array2[i])) {
      return false;
    }
  }

  return true;
}

export function transformEnumToOption(enumObj) {
  return enumObj
    ? Object.values(enumObj).map(
        (el) =>
          ({
            label: el,
            value: el,
          } as Option)
      )
    : [];
}
