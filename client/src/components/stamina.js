import React, { useRef } from "react";

import life from "./pictures/life-bar.svg";

function Stamina({ stamina, staminaReady }) {
  const staminaPositive = useRef(false);

  if (staminaReady && !staminaPositive.current) {
    staminaPositive.current = true;
  }

  const staminaField = staminaPositive.current
    ? "hidden"
    : "p-1 tracking-tight text-lg";

  return (
    <div>
      <div className="flex items-center justify-center p-1 text-2xl font-bold uppercase tracking-wider">
        <img className="mr-2 h-8 rounded-md" src={life} alt="Stamina" />
        Stamina: {stamina}
      </div>
      <div className={staminaField}>
        Roll 2 dice and add 12. The total is your
        <span className="font-semibold"> STAMINA</span>. This represents your
        strength, fitness, life and energy. If this is ever reduced to 0, then
        you are dead. Certain items can increase STAMINA. The passages you read
        will tell you when you have lost STAMINA and when and how it can be
        restored.
      </div>
    </div>
  );
}

export default Stamina;
