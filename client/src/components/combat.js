import React, { useEffect, useState } from "react";
import Dice from "./dice";

import combat from "./pictures/crossed-swords.svg";
import winner from "./pictures/mighty-force.svg";

function Combat({ enemy, skill, stamina, staminaDecrease, getRandomDice }) {
  const [enemyStamina, setEnemyStamina] = useState(enemy.stamina);

  useEffect(() => {
    setEnd(false);
    setEnemyStamina(enemy.stamina);
  }, [enemy.stamina]);

  const [attackStrength, setAttackStrength] = useState(0);
  const [enemyAttackStrength, setEnemyAttackStrength] = useState(0);

  const [show, setShow] = useState(false);
  const nextButton = show ? "" : "hidden";
  const fightButton = show ? "hidden" : "";

  const [fightActive, setFightActive] = useState(false);

  const [end, setEnd] = useState(false);
  const win = end
    ? "bg-amber-600 border-4 rounded m-4 p-2 flex justify-center items-center text-xl font-bold uppercase tracking-wider"
    : "hidden";
  const afterWin = end ? "hidden" : "";

  const [attack, setAttack] = useState(0);
  const [attack2, setAttack2] = useState(0);
  const [enemyAttack, setEnemyAttack] = useState(0);
  const [enemyAttack2, setEnemyAttack2] = useState(0);

  useEffect(() => {
    setFightActive(!attack || !attack2 || !enemyAttack || !enemyAttack2);
    setAttackStrength(attack + attack2 + skill);
    setEnemyAttackStrength(enemyAttack + enemyAttack2 + enemy.skill);
  }, [handleAttack, handleEnemyAttack, handleNextTurn]);

  function handleAttack(e) {
    e.preventDefault();
    const buttonValue = e.currentTarget.value;
    const attackValue = getRandomDice();
    if (buttonValue === "first") {
      return setAttack(attackValue);
    } else return setAttack2(attackValue);
  }

  function handleEnemyAttack(e) {
    e.preventDefault();
    const buttonValue = e.currentTarget.value;
    const attackValue = getRandomDice();
    if (buttonValue === "first") {
      return setEnemyAttack(attackValue);
    } else return setEnemyAttack2(attackValue);
  }

  function handleNextTurn() {
    setAttack(0);
    setAttack2(0);
    setEnemyAttack(0);
    setEnemyAttack2(0);
    setShow(false);
  }

  function handleFight() {
    setShow(true);
    if (attackStrength > enemyAttackStrength) {
      return setEnemyStamina((prev) => prev - 2);
    } else if (attackStrength < enemyAttackStrength) {
      staminaDecrease();
      if (stamina < 1) {
        console.log("halott vagy");
        return setEnd(true);
      }
    }
  }

  useEffect(() => {
    if (enemyStamina < 1) {
      handleNextTurn();
      return setEnd(true);
    }
  }, [enemyStamina]);

  return (
    <div>
      <h2 className="bg-gradient-to-r from-red-900 to-slate-900 border-4 rounded m-4 p-2 flex justify-center items-center text-xl font-bold uppercase tracking-wider">
        <img className="h-8 rounded-md mr-2" src={combat} alt="Combat" />
        Combat
      </h2>
      <ol className="list-decimal list-outside tracking-tight text-left pl-6 p-2 m-4 border rounded ">
        <li>
          Roll 2 dice and add the result to your SKILL. The total is your Attack
          Strength.
        </li>
        <li>
          Roll 2 dice and add the result to your opponent's SKILL. The total is
          their Attack Strength.
        </li>
        <li>
          Compare the two Attack Strengths. If your AS is higher, then you have
          wounded your opponent (go to Step 4). If their AS is higher, then they
          have wounded you (go to Step 5).
        </li>
        <li>
          You have wounded your opponent. Reduce their STAMINA by 2. Now return
          to Step 1 for the next round.
        </li>
        <li>
          You have been wounded. Reduce your STAMINA by 2. Now return to Step 1
          for the next round. This process continues until either you or your
          opponent's STAMINA is 0. If your STAMINA reaches 0, you are dead. If
          your opponent's STAMINA reaches 0, you have defeated them and can
          continue the story.
        </li>
      </ol>
      <div className={afterWin}>
        <div className="flex flex-wrap">
          <div className="bg-gradient-to-r from-red-900 to-slate-900 border-4 border-b-2 rounded mx-4 p-2 flex-auto basis-1/2 text-xl font-bold uppercase tracking-wider">
            <div> Enemy name: {enemy.name}</div>
            <div> Enemy skill: {enemy.skill}</div>
            <div> Enemy stamina: {enemyStamina}</div>
          </div>
          <div className="bg-gradient-to-r from-red-900 to-slate-900 border-x-4 border-y-2 rounded mx-4 p-2 flex-auto basis-1/2 text-xl font-bold uppercase tracking-wider">
            <div> Your skill: {skill} </div>
            <div> Your stamina: {stamina} </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-red-900 to-slate-900 border-4 border-t-2 rounded mx-4 mb-4 p-2 flex-auto text-xl font-bold uppercase tracking-wider">
          <div>Your Attack Strength: {attackStrength}</div>
          <div>Enemy Attack Strength: {enemyAttackStrength}</div>
        </div>

        <div className={fightButton}>
          <button
            className="w-40 text-xl font-bold uppercase tracking-wider rounded m-4 p-3 bg-green-600 enabled:hover:scale-110 disabled:bg-red-700 disabled:opacity-50"
            onClick={handleFight}
            disabled={fightActive}
          >
            Fight
          </button>
        </div>
        <div className={nextButton}>
          <button
            className="w-40 text-xl font-bold uppercase tracking-wider rounded m-4 p-3 bg-green-600 enabled:hover:scale-110 disabled:bg-red-700 disabled:opacity-50"
            onClick={handleNextTurn}
          >
            Next turn
          </button>
        </div>
        <div className="flex">
          <div className="bg-gradient-to-t from-red-900 to-slate-900 border-4 rounded m-4 p-2 flex-auto basis-1/2 text-xl font-bold uppercase tracking-wider">
            Your Attack:
            <div>
              <button
                className="rounded-lg m-2 enabled:hover:scale-110"
                onClick={handleAttack}
                value="first"
                disabled={attack}
              >
                <Dice spin={attack} />
              </button>
              <button
                className="rounded-lg m-2 enabled:hover:scale-110"
                onClick={handleAttack}
                value="second"
                disabled={attack2}
              >
                <Dice spin={attack2} />
              </button>
            </div>
          </div>
          <div className="bg-gradient-to-t from-red-900 to-slate-900 border-4 rounded m-4 p-2 flex-auto basis-1/2 text-xl font-bold uppercase tracking-wider">
            Enemy's Attack:
            <div>
              <button
                className="rounded-lg m-2 enabled:hover:scale-110"
                onClick={handleEnemyAttack}
                value="first"
                disabled={enemyAttack}
              >
                <Dice spin={enemyAttack} />
              </button>
              <button
                className="rounded-lg m-2 enabled:hover:scale-110"
                onClick={handleEnemyAttack}
                value="second"
                disabled={enemyAttack2}
              >
                <Dice spin={enemyAttack2} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={win}>
        <img className="h-8 rounded-md mr-2" src={winner} alt="Winner" />
        You win!
      </div>
    </div>
  );
}

export default Combat;
