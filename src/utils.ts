import { BMR_CONSTANTS } from "./constants";

export const calculateBMR = (
  age: number,
  weight: number,
  sex: 'men' | 'women'
): number => {
  const constants = BMR_CONSTANTS[sex].find((constant) => {
    return age >= constant.minAge && (constant.maxAge ? age < constant.maxAge : true);
  });
  if (!constants) {
    throw new Error(`No BMR constants found for age ${age}`);
  }

  return constants.multiple * weight + constants.additive;
};

