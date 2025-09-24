import React, { useState } from "react";
import axios from "axios";
import Page from "./components/page";
import Player from "./components/player";
import Spinner from "./components/spinner";

import cover from "./components/pictures/cover.jpg";

function App() {
  const [book, setBook] = useState([]);

  const [actual, setActual] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [start, setStart] = useState(false);
  const [character, setCharacter] = useState(false);

  const characterField = character ? "" : "hidden";
  const coverField = character ? "hidden" : "";
  const pageField = start ? "" : "hidden";

  const url = "https://fighting-fantasy-game-rlrw.onrender.com";

  const apiCall = async () => {
    setIsLoading(true);
    console.log("apiCall triggered");

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), 15000),
    );

    try {
      const res = await Promise.race([axios.get(url), timeoutPromise]);
      setBook(res.data);
      setCharacter(true);
    } catch (error) {
      console.error("Error:", error.message);
      alert("Render.com's free server is taking too long. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const currentPage = book.find((item) => item.page === actual);

  const currentReduces = currentPage?.reduces || {
    skill: 0,
    luck: 0,
    stamina: 0,
  };
  const currentEnemy = currentPage?.enemy || {
    name: "",
    skill: 0,
    stamina: 0,
  };

  function handleTurn(e) {
    e.preventDefault();
    window.scrollTo(0, 0);
    const newPage = parseInt(e.target.value);
    return setActual(newPage);
  }

  function handleStart(e) {
    e.preventDefault();
    setStart(true);
    return setActual(0);
  }

  function handleNewGame() {
    setCharacter(false);
    return setStart(false);
  }

  function handleDead() {
    return setActual(110);
  }

  return (
    <div className="min-h-screen bg-stone-800 text-center text-white">
      <header>
        <div className={coverField}>
          <h1 className="p-4 text-5xl font-bold uppercase tracking-wider">
            Planet of the Spiders
          </h1>
          <button onClick={apiCall}>
            <img
              className="max-h-[75vh] px-10"
              src={cover}
              alt="Planet of the Spiders"
            />
          </button>
          <div className="p-4 text-lg font-bold uppercase tracking-wider">
            {isLoading ? (
              <Spinner />
            ) : (
              "Click on the picture to start your journey"
            )}
          </div>
        </div>
        <div className={characterField}>
          <Player
            reduces={currentReduces}
            enemy={currentEnemy}
            handleStart={handleStart}
            start={start}
            newGame={handleNewGame}
            handleDead={handleDead}
          />
        </div>
        <div className={pageField}>
          {currentPage && (
            <Page
              page={currentPage.page}
              text={currentPage.text}
              key={currentPage._id}
              routes={currentPage.routes}
              reduces={currentPage.reduces}
              enemy={currentPage.enemy}
              handleTurn={handleTurn}
            />
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
