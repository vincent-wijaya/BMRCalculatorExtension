// interface BMRConstants {
//   minAge: number;

//   maxAge?: number;

//   multiple: number;

//   additive: number;
// }

/**
  
   * minAge (inclusive): the minimum age for the range
  
   * maxAge (exclusive): the maximum age for the range
  
   * multiple: the multiplier for the weight
  
   * additive: the additive constant for the BMR calculation
  
   */

export const BMR_CONSTANTS = {
  male: [
    {
      minAge: 18,
      maxAge: 31,
      multiple: 15.057,
      additive: 692.2,
    },
    {
      minAge: 31,
      maxAge: 61,
      multiple: 11.472,
      additive: 873.1,
    },
    {
      minAge: 61,
      maxAge: 100,
      multiple: 9.247,
      additive: 587.7,
    },
  ],
  female: [
    {
      minAge: 18,
      maxAge: 31,
      multiple: 14.818,
      additive: 486.6,
    },
    {
      minAge: 31,
      maxAge: 61,
      multiple: 8.126,
      additive: 845.6,
    },
    {
      minAge: 61,
      maxAge: 100,
      multiple: 9.082,
      additive: 658.5,
    },
  ],
};

export const KCAL_TO_KJ_MULTIPLIER = 4.184;

export const MIN_AGE = 18;

export const MIN_ACTIVITY_LEVEL = 1.1;
export const MAX_ACTIVITY_LEVEL = 2.0;
export const DEFICIT = 500; // kcal/d

export const PHYSICAL_ACTIVITY_LEVELS = {
  bed_rest:{
    name: "Bed Rest",
    description: "Little or no physical activity. Most of the day is spent sitting, with minimal physical exertion beyond routine activities like walking to the car or doing light household tasks.",
    multiplier: 1.2,
  },
  sedentary_1:{
    name: "Sedentary",
    description: "Some light physical activity beyond their regular daily routine. e.g. walking, or light exercise like casual walking or stretching a few days a week.",
    multiplier: 1.3,
  },
  sedentary_2: {
    name: "Sedentary",
    description: "Some light physical activity beyond their regular daily routine. e.g. walking, or light exercise like casual walking or stretching a few days a week.",
    multiplier: 1.4,
  },
  light: {
    name: "Light",
    description: "Moderate-intensity exercise or physical labor. e.g. walking, cycling, or light jogging for 30-60 minutes a day, or performing moderate-intensity labor like retail work.",
    multiplier: 1.6,
  },
  moderate: {
    name: "Moderate",
    description: "Regular hard physical activity which includes more intense exercise or physically demanding jobs. e.g. vigorous exercise (running, swimming, high-intensity workouts), manual labor, athletes in training, or those with physically active jobs.",
    multiplier: 1.8,
  },
  heavy:{
    name: "Heavy",
    description: "Super active individuals who engage in very high levels of activity or extreme physical demands, often several hours a day. e.g. athletes who train intensively or people doing physically demanding jobs for extended periods.",
    multiplier: 2,
  },
};
