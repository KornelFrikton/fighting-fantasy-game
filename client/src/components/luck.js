import React, { useRef }  from "react";

import shamrock from './pictures/shamrock.svg';

function Luck({ luck }) {

  const luckPositive = useRef(false);

  if (luck > 0 && !luckPositive.current) {
    luckPositive.current = true;
  }
  
  const luckField = luckPositive.current ? "hidden" : "p-1 tracking-tight text-lg";

  return (
    <div>
      <div className="text-2xl flex justify-center items-center font-bold uppercase tracking-wider p-1">
      <img className="h-8 rounded-md mr-2" src={shamrock} alt="Luck" />
         Luck: {luck}</div>
      <div className={luckField}>
        Roll 1 die and add 6. The total is your <span className="font-semibold"> LUCK</span>. This represents your
        general fortune. Sometimes the outcome of this is determined purely by
        luck. If you are asked to test your LUCK, do so in the way as for the test of SKILL. The only difference is that when you test your LUCK, you must reduce your current LUCK by 1.
      </div>
    </div>
  );
}

export default Luck;