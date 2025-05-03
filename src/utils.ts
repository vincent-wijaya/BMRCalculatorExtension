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

export const calculateEnergyRequirement = (
  bmr: number,
  activityLevelMultiplier: number,
): number => {
  return bmr * activityLevelMultiplier;
}

/**
 * Calculates the Estimated Energy Requirement per day with 500kcal/d deficit 
 * @param energyRequirement
 * @returns 
 */
export const calculateEER = (
  energyRequirement: number
): number => {
  return energyRequirement - 500;
}

export const getActivityLevelDescription =(
  activityLevel: ActivityLevel
): string => {
  return PHYSICAL_ACTIVITY_LEVELS[activityLevel].description;
}