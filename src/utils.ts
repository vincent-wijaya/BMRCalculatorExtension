import { BMR_CONSTANTS, PHYSICAL_ACTIVITY_LEVELS } from "./constants";
import { ActivityLevel } from "./interfaces/IActivityLevel";
import { Sex } from "./interfaces/ISex";

export const calculateBMR = (
  age: number,
  weight: number,
  sex: Sex
): number => {
  const constants = BMR_CONSTANTS[sex].find((constant) => {
    return constant.minAge <= age && age < constant.maxAge;
  });
  if (!constants) {
    throw new Error(`No BMR constants found for age ${age}`);
  }

  return constants.multiple * weight + constants.additive;
};

export const calculateTDEE = (
  age: number,
  weight: number,
  sex: Sex,
  activityLevel: ActivityLevel,
): number => {
  const bmr = calculateBMR(age, weight, sex);
  
  const activityLevelMultiplier = PHYSICAL_ACTIVITY_LEVELS[activityLevel].multiplier;

  return Math.round(bmr * activityLevelMultiplier);
}