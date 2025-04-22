import { PHYSICAL_ACTIVITY_LEVELS } from "./constants";
import "./App.css";
import { useState } from "react";
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";

function App() {
  const [sex, setSex] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [activityLevel, setActivityLevel] = useState<string>("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md transition-transform">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Energy Deficit Calculator
        </h1>
        <FormControl className="space-y-4 text-black">
          <RadioGroup
            value={sex}
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            onChange={(e) => setSex(e.target.value)}
          >
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="female" control={<Radio />} label="Female" />
          </RadioGroup>

          <div className="space-y-2">
            <label
              htmlFor="age"
              className="block text-sm font-medium text-gray-700"
            >
              Age:
            </label>
            <input
              value={age}
              type="number"
              id="age"
              name="age"
              required
              className="w-full px-4 py-2 text-black rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your age"
              onChange={(e) => setAge(Number(e.target.value))}
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="space-y-2 flex-1">
              <label
                htmlFor="weight"
                className="block text-sm font-medium text-gray-700"
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
                className="w-full text-black px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your weight"
                onChange={(e) => setWeight(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="activity"
              className="block text-sm font-medium text-gray-700"
            >
              Activity Level:
            </label>
            <select
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value)}
              id="activity"
              name="activity"
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700"
            >
              <option value="" disabled selected>
                Select your activity level
              </option>
              {PHYSICAL_ACTIVITY_LEVELS.map((level) => (
                <option key={level.code} value={level.code}>
                  {level.name} ({level.multiplier})
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 rounded-md transition-colors duration-300"
          >
            Calculate
          </button>
        </FormControl>
        <div className="mt-6 text-center">
          <h2 className="text-xl font-semibold text-gray-800">Result</h2>
          <p className="text-gray-600">
            Your energy deficit is:{" "}
            <span id="energy-deficit" className="text-blue-600 font-bold">
              0
            </span>{" "}
            kcal/day
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
