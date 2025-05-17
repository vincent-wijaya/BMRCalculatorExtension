import { BMR_CONSTANTS, KCAL_TO_KJ_MULTIPLIER, PHYSICAL_ACTIVITY_LEVELS } from "./constants";
import { ActivityLevel } from "./interfaces/IActivityLevel";
import { Sex } from "./interfaces/ISex";

export const calculateBMR = (age: number, weight: number, sex: Sex): number => {
  const constants = BMR_CONSTANTS[sex].find((constant) => {
    return constant.minAge <= age && age < constant.maxAge;
  });
  if (!constants) {
    throw new Error(`No BMR constants found for age ${age}`);
  }

  return constants.multiple * weight + constants.additive;
};

export const calculateEnergyRequirement = (bmr: number, activityLevelMultiplier: number): number => {
  return bmr * activityLevelMultiplier;
}

/**
 * Calculates the Estimated Energy Requirement per day with 500kcal/d deficit 
 * @param energyRequirement
 * @returns 
 */
export const calculateEER = (energyRequirement: number): number => {
  return energyRequirement - 500;
}

export const getActivityLevelDescription = (activityLevel: ActivityLevel): string => {
  return PHYSICAL_ACTIVITY_LEVELS[activityLevel].description;
}

export const convertKCalToKJ = (calories: number) => {
  return calories * KCAL_TO_KJ_MULTIPLIER;
}
// ABW = ideal weight at bmi 25 + 0.25(actual weight - ideal weight at bmi 25)

// bmi at 25 = height in metres^2 x 25


/**
 * Calculates the ABW (Adjusted Body Weight) based on the given height.
 * @param weight - Weight in kg
 * @param height - Height in meters
 * @returns Adjusted Body Weight
 */
export const calculateABW = (weight: number, height: number): number => {
  const idealWeight = calculateIdealWeightAtBMI25(height);
  return idealWeight + 0.25 * (weight - idealWeight);
}

/**
 * Calculates the ideal weight at BMI 25 based on the given height.
 * @param height - Height in meters
 * @returns Ideal weight at BMI 25
 */
export const calculateIdealWeightAtBMI25 = (height: number): number => {
  return Math.pow(height, 2) * 25;
}