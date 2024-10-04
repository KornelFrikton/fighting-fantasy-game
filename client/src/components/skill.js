import React from "react";

import stars from "./pictures/stars-stack.svg";

function Skill({ skill }) {
  const skillField = skill ? "hidden" : "p-1 tracking-tight text-lg";

  return (
    <div>
      <div className="flex items-center justify-center p-1 text-2xl font-bold uppercase tracking-wider">
        <img className="mr-2 h-8 rounded-md" src={stars} alt="Skill" />
        Skill: {skill}
      </div>
      <div className={skillField}>
        Roll 1 die and add 6. The total is your
        <span className="font-semibold"> SKILL</span>. This represents your
        general ability to perform tasks. . If you are ever asked to test your
        SKILL, roll 2 die. If the total is the same or less than your SKILL,
        then you are successful. If the dice roll is higher, then you have
        failed. SKILL is also used in combat as explained below.
      </div>
    </div>
  );
}

export default Skill;
