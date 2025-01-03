import React, { useEffect, useState } from "react";

function Spinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="h-4 w-4 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      <span className="pl-4 text-lg font-bold uppercase tracking-wider">
        Loading...{" "}
      </span>
    </div>
  );
}
export default Spinner;
