import React from "react";
import { useNavigate } from "react-router-dom";

const Step1 = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex justify-center items-center">
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => navigate("/")}
      >
        Go to Step 2
      </button>
    </div>
  );
};

export default Step1;
