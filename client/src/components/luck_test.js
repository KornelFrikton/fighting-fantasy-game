import React, { useEffect, useState } from "react";
import Dice from "./dice";

function Lucktest({ luck, getRandomDice, handleClose }) {
  const [result, setResult] = useState(0);

  const [testLuck, setTestLuck] = useState(0);
  const [testLuck2, setTestLuck2] = useState(0);

  const showResult =
    testLuck && testLuck2
      ? "text-xl font-bold uppercase tracking-wider p-1"
      : "hidden";

  function handleTestLuck(e) {
    e.preventDefault();
    const buttonValue = e.currentTarget.value;
    const newTestLuck = getRandomDice();
    if (buttonValue === "first") {
      return setTestLuck(newTestLuck);
    } else return setTestLuck2(newTestLuck);
  }

  useEffect(() => {
    if (testLuck && testLuck2) {
      if (testLuck + testLuck2 > luck) {
        return setResult("Failed");
      } else return setResult("Successful");
    }
  }, [handleTestLuck]);

  function handleCloseTest() {
    setTestLuck(0);
    setTestLuck2(0);
    handleClose();
  }

  return (
    <div>
      <div className="p-1 tracking-tight text-lg">
        If you are asked to test your LUCK, do so in the way as for the test of
        SKILL. The only difference is that when you test your LUCK, you must
        reduce your current LUCK by 1.
      </div>
      <div className="text-xl font-bold uppercase tracking-wider p-2">
        <div> Test total: {testLuck + testLuck2} </div>
        <div>Your luck: {luck} </div>
        <div className={showResult}>Luck test: {result}</div>
      </div>
      <button
        className="rounded-lg m-2 enabled:hover:scale-110"
        onClick={handleTestLuck}
        value="first"
        disabled={testLuck}
      >
        <Dice spin={testLuck} />
      </button>
      <button
        className="rounded-lg m-2 enabled:hover:scale-110"
        onClick={handleTestLuck}
        value="second"
        disabled={testLuck2}
      >
        <Dice spin={testLuck2} />
      </button>
      <div>
        <button
          className="w-40 text-xl font-bold uppercase tracking-wider rounded m-2 p-3 bg-green-700 disabled:bg-red-700 disabled:opacity-50"
          onClick={handleCloseTest}
          disabled={!testLuck || !testLuck2}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Lucktest;
