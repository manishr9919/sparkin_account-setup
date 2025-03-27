import React, { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { FaCopy } from "react-icons/fa";

// State management with useReducer
const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_ACTION":
      return state.selected.includes(action.payload)
        ? {
            ...state,
            selected: state.selected.filter((item) => item !== action.payload),
          }
        : { ...state, selected: [...state.selected, action.payload] };
    case "CLEAR_SELECTION":
      return { ...state, selected: [] };
    default:
      return state;
  }
};

// Initial state
const initialState = { selected: [] };

// Action Categories
const actions = [
  {
    category: "Start-Stop Resources",
    options: ["EC2", "RDS", "LightSail", "Amazon Neptune"],
  },
  {
    category: "Pause-Resume Resources",
    options: ["Redshift Clusters", "Aurora Serverless V2"],
  },
  {
    category: "Resource Cleanup",
    options: [
      "Terminate EC2",
      "Delete EBS Volumes",
      "Delete EBS Snapshot",
      "Delete RDS Snapshot",
    ],
  },
];

const Step2 = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Sidebar: Actions List */}
      <div className="md:w-2/3 w-full p-6 bg-gray-100 flex flex-col">
        {/* Step Indicator */}
        <div className="flex justify-between my-4">
          <span className="text-gray-500">○ Start</span>
          <span className="font-bold text-blue-600">● Select Actions</span>
          <span className="text-gray-500">○ Link AWS AZ’s</span>
          <span className="text-gray-500">○ Fetch</span>
        </div>

        {/* Responsive Actions Layout */}
        <div className="flex md:flex-row flex-col md:space-x-6 space-y-4 md:space-y-0 py-4">
          {actions.map((group, index) => (
            <div
              key={index}
              className="p-4 bg-white shadow-md rounded-md w-full md:w-auto"
            >
              <h3 className="font-medium text-gray-700 mb-2">
                {group.category}
              </h3>
              {group.options.map((option) => (
                <label key={option} className="block my-2">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={state.selected.includes(option)}
                    onChange={() =>
                      dispatch({ type: "TOGGLE_ACTION", payload: option })
                    }
                  />
                  {option}
                </label>
              ))}
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <div className="space-x-4">
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded"
              onClick={() => navigate("/step1")}
            >
              Previous
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded"
              onClick={() => navigate("/step3")}
            >
              Next
            </button>
          </div>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={() => dispatch({ type: "CLEAR_SELECTION" })}
          >
            Clear Selection
          </button>
        </div>
      </div>
      {/* Right Sidebar: Selection Preview */}
      <div className="md:w-1/3 w-full p-6 bg-white border-l md:h-[80vh] md:overflow-y-scroll">
        {/* Fixed JAM Police Header */}
        <div className="sticky top-0 bg-white p-3 shadow-md z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-700">JAM Police</h2>
            <FaCopy className="text-gray-500 cursor-pointer hover:text-gray-700" />
          </div>
        </div>

        <h3 className="text-lg font-semibold mb-3">Selected Actions</h3>

        {state.selected.length > 0 ? (
          <ul className="list-disc pl-5 text-gray-700">
            {state.selected.map((action, index) => (
              <li key={index}>{action}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No actions selected.</p>
        )}
      </div>
    </div>
  );
};

export default Step2;
