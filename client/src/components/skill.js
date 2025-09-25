import React from "react";

import stars from "./pictures/stars-stack.svg";

function Skill({ skill, showDescription }) {
  const skillField = showDescription ? "p-1 tracking-tight text-lg" : "hidden";

  return (
    <div>
      <div className="flex items-center justify-center p-1 text-2xl font-bold uppercase tracking-wider">
        <img className="mr-2 h-8 rounded-md" src={stars} alt="Skill icon" />
        Skill: {skill}
      </div>
      <p className={skillField}>
        Roll 1 die and add 6. The total is your
        <span className="font-bold"> SKILL</span>. This represents your general
        ability to perform tasks. If you are ever asked to test your SKILL, roll
        2 dice. If the total is the same or less than your SKILL, you succeed.
        If the dice roll is higher, you fail. SKILL is also used in combat as
        explained below.
      </p>
    </div>
  );
}

export default Skill;
