import { DEFICIT, MAX_ACTIVITY_LEVEL, MIN_ACTIVITY_LEVEL } from "./constants";
import "./App.css";
import { useState } from "react";
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { Sex } from "./interfaces/ISex";
import { calculateBMR, calculateEER, calculateEnergyRequirement } from "./utils";

function App() {
  const [sex, setSex] = useState<Sex>();
  const [age, setAge] = useState<number>();
  const [weight, setWeight] = useState<number>();
  const [activityLevelMultiplier, setActivityLevelMultiplier] = useState<number>();
  const [bmr, setBmr] = useState<number>(0);
  const [energyRequirement, setEnergyRequirement] = useState<number>(0);
  const [energyRequirementSubtracted, setEnergyRequirementSubtracted] = useState<number>(0);

  const handleSubmit = () => {
    if (!sex || !age || !weight || !activityLevelMultiplier) {
      alert("Please fill in all fields.");
      return;
    }

    const bmr = calculateBMR(age, weight, sex);
    setBmr(Math.round(bmr));

    const energyRequirement = calculateEnergyRequirement(bmr, activityLevelMultiplier);
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
        <FormControl className="space-y-2 text-black">
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
              required
              className="w-full px-4 py-1 text-black rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your age"
              onChange={(e) => setAge(Number(e.target.value))}
            />
          </div>

          <div className="flex items-center gap-1">
            <div className="space-y-1 flex-1">
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
                placeholder="Enter your weight"
                onChange={(e) => setWeight(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label
              htmlFor="activity"
              className="block text-sm font-medium text-black"
            >
              Activity Level:
            </label>
            <input
              value={activityLevelMultiplier}
              type="number"
              id="activity-level"
              name="weight"
              color=""
              min={MIN_ACTIVITY_LEVEL}
              max={MAX_ACTIVITY_LEVEL}
              required
              className="w-full text-black px-4 py-1 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your weight"
              onChange={(e) => setActivityLevelMultiplier(Number(e.target.value))}
            />
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-blue-500 hover:bg-blue-600 text-black font-semibold py-2.5 rounded-md transition-colors duration-300"
          >
            Calculate
          </button>
        </FormControl>
        {
          bmr && energyRequirement && energyRequirementSubtracted && (
            <div className="mt-6 text-center">
              <h2 className="font-semibold text-black">Result</h2>
              <h2 className="text-black justify-between">
                BMR:{" "}
                <span id="bmr" className="text-orange-500 font-bold">
                  {bmr > 0 ? bmr : 0}
                </span>{" "}
                kcal/d
              </h2>
              <h2 className="text-black">
                EER:{" "}
                <span id="energy-requirement" className="text-orange-500 font-bold">
                  {energyRequirement > 0 ? energyRequirement : 0}
                </span>{" "}
                kcal/d
              </h2>
              <h2 className="text-black">
                EER - {DEFICIT}:{" "}
                <span id="energy-requirement-subtracted" className="text-orange-500 font-bold">
                  {energyRequirementSubtracted > 0 ? energyRequirementSubtracted : 0}
                </span>{" "}
                kcal/d
              </h2>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default App;
