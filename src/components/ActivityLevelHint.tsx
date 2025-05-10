import Icon from "@mdi/react";
import { PHYSICAL_ACTIVITY_LEVELS } from "../constants";
import { mdiClose } from "@mdi/js";


interface ActivityLevelHintProps {
  show: boolean;
  close: () => void;
}

const ActivityLevelHint = ({ show, close }: ActivityLevelHintProps) => {
  const activityLevels = PHYSICAL_ACTIVITY_LEVELS;

  return (
    show && (
      <div className="fixed inset-0 z-50 bg-white bg-opacity-50 text-black overflow-auto pointer-events-auto p-6">
        <div className="bg-white rounded-2xl shadow-xl p-6 max-w-lg w-full mx-auto">
          <h2>Activity Level</h2>
          <ul>
            {Object.entries(activityLevels).map(([key, value]) => (
              <li key={key} className="mb-4">
                <strong>{value.name}</strong> - {value.multiplier}<br />
                {value.description} 
              </li>
            ))}
          </ul>
          <button onClick={close} className="fixed top-2 right-6">
            <Icon path={mdiClose} size={1} />
          </button>
        </div>
      </div>
    )
  );
}

export default ActivityLevelHint;