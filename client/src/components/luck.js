import React, { useRef } from "react";

import shamrock from "./pictures/shamrock.svg";

function Luck({ luck }) {
  const luckPositive = useRef(false);

  if (luck > 0 && !luckPositive.current) {
    luckPositive.current = true;
  }

  const luckField = luckPositive.current
    ? "hidden"
    : "p-1 tracking-tight text-lg";

  return (
    <div>
      <div className="flex items-center justify-center p-1 text-2xl font-bold uppercase tracking-wider">
        <img className="mr-2 h-8 rounded-md" src={shamrock} alt="Luck" />
        Luck: {luck}
      </div>
      <div className={luckField}>
        Roll 1 die and add 6. The total is your{" "}
        <span className="font-semibold"> LUCK</span>. This represents your
        general fortune. Sometimes the outcome of this is determined purely by
        luck. If you are asked to test your LUCK, do so in the way as for the
        test of SKILL. The only difference is that when you test your LUCK, you
        must reduce your current LUCK by 1.
      </div>
    </div>
  );
}

export default Luck;
