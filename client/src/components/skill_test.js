import React, { useEffect, useState } from "react";
import Dice from "./dice";

function Skilltest({ skill, getRandomDice, handleClose }) {
  const [result, setResult] = useState(0);

  const [testSkill, setTestSkill] = useState(0);
  const [testSkill2, setTestSkill2] = useState(0);

  const showResult =
    testSkill && testSkill2
      ? "text-xl font-bold uppercase tracking-wider p-1"
      : "hidden";

  function handleTestSkill(e) {
    e.preventDefault();
    const buttonValue = e.currentTarget.value;
    const newTestSkill = getRandomDice();
    if (buttonValue === "first") {
      return setTestSkill(newTestSkill);
    } else return setTestSkill2(newTestSkill);
  }

  useEffect(() => {
    if (testSkill && testSkill2) {
      if (testSkill + testSkill2 > skill) {
        return setResult("Failed");
      } else return setResult("Successful");
    }
  }, [handleTestSkill]);

  function handleCloseTest() {
    setTestSkill(0);
    setTestSkill2(0);
    handleClose();
  }

  return (
    <div>
      <div className="p-1 tracking-tight text-lg">
        If you are ever asked to test your SKILL, roll 2 die. If the total is
        the same or less than your SKILL, then you are successful. If the dice
        roll is higher, then you have failed.
      </div>
      <div className="text-xl font-bold uppercase tracking-wider p-2">
        <div>Test total: {testSkill + testSkill2}</div>
        <div>Your skill: {skill}</div>
        <div className={showResult}>Skill test: {result}</div>
      </div>
      <button
        className="rounded-lg m-2 enabled:hover:scale-110"
        onClick={handleTestSkill}
        value="first"
        disabled={testSkill}
      >
        <Dice spin={testSkill} />
      </button>
      <button
        className="rounded-lg m-2 enabled:hover:scale-110"
        onClick={handleTestSkill}
        value="second"
        disabled={testSkill2}
      >
        <Dice spin={testSkill2} />
      </button>
      <div>
        <button
          className="w-40 text-xl font-bold uppercase tracking-wider rounded m-2 p-3 bg-green-700 disabled:bg-red-700 disabled:opacity-50"
          onClick={handleCloseTest}
          disabled={!testSkill || !testSkill2}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Skilltest;
