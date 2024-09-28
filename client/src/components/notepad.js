import React from "react";

function Notepad() {
  return (
    <div className="p-4">
      <textarea
        className="placeholder:italic placeholder:text-slate-400 rounded-md w-4/5 px-2 py-1 resize-none text-black sm:text-sm text focus:outline-none focus:ring-sky-500 focus:ring-2 focus:border-sky-500"
        placeholder="You can make notes here during your journey..."
        rows="5"
      ></textarea>
    </div>
  );
}

export default Notepad;
