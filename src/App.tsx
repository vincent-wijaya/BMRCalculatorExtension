import { PHYSICAL_ACTIVITY_LEVELS } from "./constants";
import "./App.css";
import { useState } from "react";
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { calculateTDEE } from "./utils";
import { ActivityLevel } from "./interfaces/IActivityLevel";
import { Sex } from "./interfaces/ISex";

function App() {
  const [sex, setSex] = useState<Sex>();
  const [age, setAge] = useState<number>();
  const [weight, setWeight] = useState<number>();
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>();
  const [energyDeficit, setEnergyDeficit] = useState<number>(0);

  const handleSubmit = () => {
    if (!sex || !age || !weight || !activityLevel) {
      alert("Please fill in all fields.");
      return;
    }

    const energyDeficit = calculateTDEE(age, weight, sex, activityLevel)

    console.log("Energy Deficit:", energyDeficit);
    setEnergyDeficit(energyDeficit - 500);
  }


  return (
    <div className="bg-gradient-to-br from-gray-100 rounded-sm to-gray-300 flex items-center justify-center">
      <div className="bg-indigo-800 rounded-lg shadow-xl px-8 py-4 w-full max-w-md transition-transform">
        <h1 className="font-bold text-white mb-6 text-center">
          Energy Deficit Calculator
        </h1>
        <FormControl className="space-y-2 text-white">
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
              className="block text-sm font-medium text-white"
            >
              Age:
            </label>
            <input
              value={age}
              type="number"
              id="age"
              name="age"
              required
              className="w-full px-4 py-1 text-white rounded-md border border-gray-300 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your age"
              onChange={(e) => setAge(Number(e.target.value))}
            />
          </div>

          <div className="flex items-center gap-1">
            <div className="space-y-1 flex-1">
              <label
                htmlFor="weight"
                className="block text-sm font-medium text-white"
              >
                Weight (kg):
              </label>
              <input
                value={weight}
                type="number"
                id="weight"
                name="weight"
                color=""
                required
                className="w-full text-white px-4 py-1 rounded-md border border-gray-300 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your weight"
                onChange={(e) => setWeight(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label
              htmlFor="activity"
              className="block text-sm font-medium text-white"
            >
              Activity Level:
            </label>
            <select
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value as ActivityLevel)}
              id="activity"
              name="activity"
              required
              className="w-full px-4 py-1 rounded-md border border-gray-300 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            >
              <option value="" disabled selected>
                Select your activity level
              </option>
              {Object.entries(PHYSICAL_ACTIVITY_LEVELS).map(([key, level]) => (
                <option key={key} value={key}>
                  {level.name} ({level.multiplier})
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 rounded-md transition-colors duration-300"
          >
            Calculate
          </button>
        </FormControl>
        <div className="mt-6 text-center">
          <h2 className="text-xl font-semibold text-white">Result</h2>
          <p className="text-white">
            Your energy deficit is:{" "}
            <span id="energy-deficit" className="text-orange-500 font-bold">
              {energyDeficit > 0 ? energyDeficit : 0}
            </span>{" "}
            kcal/day
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
