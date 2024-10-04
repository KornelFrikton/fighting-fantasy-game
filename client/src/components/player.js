import React, { useEffect, useState } from "react";
import Dice from "./dice";
import Skill from "./skill";
import Luck from "./luck";
import Stamina from "./stamina";
import Skilltest from "./skill_test";
import Lucktest from "./luck_test";
import Combat from "./combat";
import Notepad from "./notepad";

import coinflip from "./pictures/coinflip.svg";
import tombstone from "./pictures/tombstone.svg";

function Player({ reduces, enemy, handleStart, start, newGame, handleDead }) {
  const [skill, setSkill] = useState(0);
  const [stamina, setStamina] = useState(0);
  const [stamina2, setStamina2] = useState(0);
  const [luck, setLuck] = useState(0);

  const [dead, setDead] = useState(false);

  const [showSkill, setShowSkill] = useState(false);
  const [showLuck, setShowLuck] = useState(false);

  const showTestSkill = start ? "flex-auto mx-4 p-2" : "hidden";
  const showTestLuck = start ? "flex-auto mx-4 p-2" : "hidden";

  const showTestSkillDetails = showSkill ? "flex-auto" : "hidden";
  const showTestLuckDetails = showLuck ? "flex-auto" : "hidden";

  const startField = start ? "hidden" : "flex-auto";
  const afterStart = start ? "hidden" : "";

  const resetField = dead ? "flex-auto" : "hidden";
  const resetActive = dead ? "hidden" : "";

  const combatActive = enemy.name ? "" : "hidden";

  useEffect(() => {
    const reducesLuck = parseInt(reduces.luck);
    const newLuck = luck - reducesLuck;
    setLuck(newLuck);

    const reducesSkill = parseInt(reduces.skill);
    const newSkill = skill - reducesSkill;
    setSkill(newSkill);

    const reducesStamina = parseInt(reduces.stamina);
    const newStamina = stamina - reducesStamina;
    setStamina(newStamina);
  }, [reduces]);

  function getRandomDice() {
    var randomDice = Math.floor(6 * Math.random()) + 1;
    return randomDice;
  }

  function handleGenerateSkill(e) {
    e.preventDefault();
    const newSkill = getRandomDice() + 6;
    return setSkill(newSkill);
  }

  function handleGenerateStamina(e) {
    e.preventDefault();
    const buttonValue = e.currentTarget.value;
    const newStamina = getRandomDice() + 6;
    if (buttonValue === "first") {
      return setStamina(newStamina);
    } else return setStamina2(newStamina);
  }

  function handleGenerateLuck(e) {
    e.preventDefault();
    const newLuck = getRandomDice() + 6;
    return setLuck(newLuck);
  }

  function handleReset(e) {
    e.preventDefault();
    setSkill(0);
    setStamina(0);
    setStamina2(0);
    setLuck(0);
    setDead(false);
    newGame();
  }

  function handleStartSkillTest() {
    setShowLuck(false);
    return setShowSkill(true);
  }

  function handleClose() {
    setShowSkill(false);
    setShowLuck(false);
  }

  function handleStartLuckTest() {
    setShowLuck(true);
    setShowSkill(false);
    return setLuck((prev) => prev - 1);
  }

  function staminaDecrease() {
    setStamina((prev) => prev - 2);
  }

  useEffect(() => {
    if (start) {
      if (stamina + stamina2 < 1) {
        handleDead();
        return setDead(true);
      }
    }
  }, [stamina]);

  return (
    <div>
      <div className={afterStart}>
        <h2 className="p-4 text-3xl font-bold uppercase tracking-wider drop-shadow-md">
          Creating your character
        </h2>
      </div>
      <div className="flex flex-wrap justify-center py-4">
        <div className="mx-4 min-w-60 rounded border-4 bg-gradient-to-r from-amber-900 p-2">
          <Skill skill={skill} />
          <div className={afterStart}>
            <button
              className="m-2 rounded-lg enabled:hover:scale-110"
              disabled={skill}
              onClick={handleGenerateSkill}
            >
              <Dice spin={skill} />
            </button>
          </div>
        </div>

        <div className="mx-4 min-w-60 rounded border-4 bg-gradient-to-r from-amber-900 p-2">
          <Stamina
            stamina={stamina + stamina2}
            staminaReady={stamina && stamina2}
          />
          <div className={afterStart}>
            <button
              className="m-2 rounded-lg enabled:hover:scale-110"
              disabled={stamina}
              value="first"
              onClick={handleGenerateStamina}
            >
              <Dice spin={stamina} />
            </button>

            <button
              className="m-2 rounded-lg enabled:hover:scale-110"
              disabled={stamina2}
              value="second"
              onClick={handleGenerateStamina}
            >
              <Dice spin={stamina2} />
            </button>
          </div>
        </div>

        <div className="mx-4 min-w-60 rounded border-4 bg-gradient-to-r from-amber-900 p-2">
          <Luck luck={luck} />
          <div className={afterStart}>
            <button
              className="m-2 rounded-lg enabled:hover:scale-110"
              disabled={luck}
              onClick={handleGenerateLuck}
            >
              <Dice spin={luck} />
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className={startField}>
          <button
            className="m-4 w-40 rounded bg-green-600 p-3 text-2xl font-bold uppercase tracking-wider enabled:hover:scale-110 disabled:bg-red-700 disabled:opacity-50"
            disabled={!skill || !stamina || !stamina2 || !luck}
            onClick={handleStart}
          >
            Start
          </button>
        </div>

        <div className={resetField}>
          <button
            className="m-4 w-40 rounded bg-green-600 p-3 text-2xl font-bold uppercase tracking-wider enabled:hover:scale-110 disabled:bg-red-700 disabled:opacity-50"
            disabled={!dead}
            type="reset"
            onClick={handleReset}
          >
            Restart
          </button>
          <div className="m-4 flex items-center justify-center rounded border-4 bg-neutral-900 p-2 text-xl font-bold uppercase tracking-wider">
            <img className="mr-2 h-8 rounded-md" src={tombstone} alt="Dead" />
            You are dead
          </div>
        </div>
      </div>

      <div className={resetActive}>
        <div className="flex flex-wrap">
          <div className={showTestSkill}>
            <button
              className="m-3 w-60 rounded bg-green-600 p-2 text-xl font-bold uppercase tracking-wider enabled:hover:scale-110 disabled:bg-red-700 disabled:opacity-50"
              onClick={handleStartSkillTest}
              disabled={!start}
            >
              <p>
                <img
                  className="float-left mx-1 h-8 rounded-md"
                  src={coinflip}
                  alt="Test"
                />
                Test your skill
              </p>
            </button>

            <div className={showTestSkillDetails}>
              <Skilltest
                skill={skill}
                getRandomDice={getRandomDice}
                handleClose={handleClose}
              />
            </div>
          </div>
          <div className={showTestLuck}>
            <button
              className="m-3 w-60 rounded bg-green-600 p-2 text-xl font-bold uppercase tracking-wider enabled:hover:scale-110 disabled:bg-red-700 disabled:opacity-50"
              onClick={handleStartLuckTest}
              disabled={!start}
            >
              <p>
                <img
                  className="float-left mx-1 h-8 rounded-md"
                  src={coinflip}
                  alt="Test"
                />
                Test your Luck
              </p>
            </button>

            <div className={showTestLuckDetails}>
              <Lucktest
                luck={luck}
                getRandomDice={getRandomDice}
                handleClose={handleClose}
              />
            </div>
          </div>
        </div>

        <div className={combatActive}>
          <Combat
            enemy={enemy}
            skill={skill}
            stamina={stamina + stamina2}
            getRandomDice={getRandomDice}
            staminaDecrease={staminaDecrease}
          />
        </div>
        <div>
          <Notepad />
        </div>
      </div>
    </div>
  );
}

export default Player;
