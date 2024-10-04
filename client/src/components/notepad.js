import React from "react";

function Notepad() {
  return (
    <div className="p-4">
      <textarea
        className="text w-4/5 resize-none rounded-md px-2 py-1 text-black placeholder:italic placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500 sm:text-sm"
        placeholder="You can make notes here during your journey..."
        rows="5"
      ></textarea>
    </div>
  );
}

export default Notepad;
