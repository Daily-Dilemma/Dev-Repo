import React from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  const handlePlay = () => {
    // Navigate to the prompt page (i.e. MinimalDilemma page)
    navigate("/prompt");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center relative font-sans">
      {/* Main container with two columns and a vertical line in the middle */}
      <div className="flex items-center justify-center mb-12">
        {/* Left side text */}
        <div className="text-right mr-12">
          <h1 className="text-7xl font-bold leading-none">
            The{" "}
            <span className="inline-block">
              Da
              {/* Different color for "I" in "Daily" */}
              <span className="text-[#FFC346]">i</span>
              ly
            </span>{" "}
            <br />D<span className="text-[#47C0FF]">i</span>lemma
          </h1>
        </div>

        {/* Middle vertical line with a dot */}
        <div className="relative flex justify-center items-center mx-12">
          <div className="w-px h-64 bg-gray-600" />
          {/* The small circle in the center of the line */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-700 border border-white rounded-full" />
        </div>

        {/* Right side text and color squares */}
        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <p className="text-4xl font-medium">Pick a side </p>
            <div className="flex space-x-4">
              {/* Left rectangle with gold border */}
              <div className="w-16 h-7 rounded border-2 border-[#FFC346] bg-[#1c1c1c] ml-2" />
              {/* Right rectangle with blue border */}
              <div className="w-16 h-7 rounded border-2 border-[#47C0FF] bg-[#1c1c1c]" />
            </div>
          </div>
          <p className="text-4xl font-medium">on today's dilemma.</p>
        </div>
      </div>

      {/* PLAY button + Login link at the bottom */}
      <div className="flex flex-col items-center space-y-4">
        <button
          onClick={handlePlay}
          className="
          px-10 py-3
          border border-white 
          rounded-full 
          hover:bg-white hover:text-black 
          transition-colors
          text-xl
        "
        >
          PLAY
        </button>
        <button className="text-white hover:underline text-sm">Login</button>
      </div>
    </div>
  );
}

export default LandingPage;
