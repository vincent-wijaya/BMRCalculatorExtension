import { DEFICIT, MAX_ACTIVITY_LEVEL, MIN_ACTIVITY_LEVEL, MIN_AGE } from "./constants";
import "./App.css";
import { useState } from "react";
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { Sex } from "./interfaces/ISex";
import { calculateBMR, calculateEER, calculateEnergyRequirement, convertKCalToKJ } from "./utils";

function App() {
  const [sex, setSex] = useState<Sex>();
  const [age, setAge] = useState<number>();
  const [weight, setWeight] = useState<number>();
  const [activityLevel, setActivityLevel] = useState<number>();
  const [bmr, setBmr] = useState<number>(0);
  const [energyRequirement, setEnergyRequirement] = useState<number>(0);
  const [energyRequirementSubtracted, setEnergyRequirementSubtracted] = useState<number>(0);
  const [errors, setErrors] = useState<string[]>([]);

  const validate = (): boolean => {
    const currentErrors: string[] = [];

    if (!sex || !age || !weight || !activityLevel) {
      currentErrors.push('Missing fields');
      setErrors(currentErrors);
      return false;
    }

    if (age < 18) {
      currentErrors.push('Age must be above 18');
    }

    if (activityLevel < MIN_ACTIVITY_LEVEL || activityLevel > MAX_ACTIVITY_LEVEL) {
      currentErrors.push(`Activity Level must be between ${MIN_ACTIVITY_LEVEL} and ${MAX_ACTIVITY_LEVEL}`);
    }

    setErrors(currentErrors);
    return errors.length === 0;
  }

  const handleSubmit = () => {
    if (!validate()) return;

    const bmr = calculateBMR(age!, weight!, sex!);
    setBmr(Math.round(bmr));

    const energyRequirement = calculateEnergyRequirement(bmr, activityLevel!);
    setEnergyRequirement(Math.round(energyRequirement));

    const energyRequirementSubtracted = calculateEER(energyRequirement);
    setEnergyRequirementSubtracted(Math.round(energyRequirementSubtracted));
  }

  const handleKeyUp = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  }

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl px-8 py-4 w-full max-w-md transition-transform" onKeyUp={handleKeyUp}>
        <h1 className="font-bold text-black mb-6 text-center">
          Energy Deficit Calculator
        </h1>
        <FormControl className="space-y-1 text-black">
          <RadioGroup
            value={sex}
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            onChange={(e) => setSex(e.target.value as Sex)}
          >
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="female" control={<Radio />} label="Female" />
          </RadioGroup>

          <div className="space-y-1">
            <label
              htmlFor="age"
              className="block text-sm font-medium text-black"
            >
              Age:
            </label>
            <input
              value={age}
              type="number"
              id="age"
              name="age"
              min={MIN_AGE}
              required
              className="w-full px-4 py-1 text-black rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter the age"
              onChange={(e) => setAge(Number(e.target.value))}
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="weight"
              className="block text-sm font-medium text-black"
            >
              Adjusted Body Weight (kg):
            </label>
            <input
              value={weight}
              type="number"
              id="weight"
              name="weight"
              color=""
              required
              className="w-full text-black px-4 py-1 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter the weight"
              onChange={(e) => setWeight(Number(e.target.value))}
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="activity"
              className="block text-sm font-medium text-black"
            >
              Activity Level:
            </label>
            <input
              value={activityLevel}
              type="number"
              id="activity-level"
              name="weight"
              color=""
              min={MIN_ACTIVITY_LEVEL}
              max={MAX_ACTIVITY_LEVEL}
              required
              className="w-full text-black px-4 py-1 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter the activity level"
              onChange={(e) => setActivityLevel(Number(e.target.value))}
            />
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg my-2 py-2.5 rounded-md transition-colors duration-300"
          >
            Calculate
          </button>

          <div>
            {errors.length > 0 && (
              <div className="text-red-500">
                {
                  errors.map((error, index) => (
                    <p key={index}>{error}</p>
                  ))
                }
              </div>
            )}
          </div>
        </FormControl>
        {
          bmr && energyRequirement && energyRequirementSubtracted && (
            <div className="mt-3 text-center">
              <h2 className="font-semibold text-black">Result</h2>
              <h2 className="text-black justify-between">
                BMR:{" "}
                <span id="bmr" className="text-orange-500 font-bold">
                  {bmr}
                </span>{" "}
                kcal/d
              </h2>
              <h2 className="text-black">
                EER:{" "}
                <span id="energy-requirement" className="text-orange-500 font-bold">
                  {energyRequirement}
                </span>{" "}
                kcal/d
              </h2>
              <h2 className="text-black">
                EER - {DEFICIT}:{" "}
                <span id="energy-requirement-subtracted-kcal" className="text-orange-500 font-bold">
                  {energyRequirementSubtracted}
                </span>{" "}
                kcal/d or{" "}
                <span id="energy-requirement-subtracted-kj" className="text-orange-500 font-bold">
                  {Math.round(convertKCalToKJ(energyRequirementSubtracted))}
                </span>{" "}
                kJ/d
              </h2>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default App;
