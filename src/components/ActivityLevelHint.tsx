import Icon from "@mdi/react";
import { PHYSICAL_ACTIVITY_LEVELS } from "../constants";
import { mdiClose } from "@mdi/js";
import { Link } from "react-router-dom";

const ActivityLevelHint = () => {
  const activityLevels = PHYSICAL_ACTIVITY_LEVELS;

  return (
    (
      <div className="fixed inset-0 w-full z-50 bg-c9c9c9 bg-opacity-50 text-black overflow-auto pointer-events-auto p-2">
        <div className="bg-white rounded-lg shadow-xl p-6 max-w-lg w-full mx-auto">
          <h2>Activity Level</h2>
          <ul>
            {Object.entries(activityLevels).map(([key, value]) => (
              <li key={key} className="mb-4">
                <div>
                  <strong>{value.name}</strong> - {value.multiplier}
                  <br />
                  {value.description}
                </div>
                <div className="text-gray-500">
                  <strong>Example:</strong> {value.example}
                </div>
              </li>
            ))}
          </ul>
          <button className="fixed top-4 right-5">
            <Link to="/">
              <Icon path={mdiClose} size={1} />
            </Link>
          </button>
        </div>
      </div>
    )
  );
}

export default ActivityLevelHint;