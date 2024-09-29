import React, { useEffect, useState } from "react";
import axios from "axios";
import Page from "./components/page";
import Player from "./components/player";

import cover from "./components/pictures/cover.jpg";

function App() {
  const [book, setBook] = useState([]);
  const [allPage, setallPage] = useState([]);

  const [actual, setActual] = useState();

  const [reduces, setReduces] = useState({ skill: 0, luck: 0, stamina: 0 });
  const [enemy, setEnemy] = useState({ name: "", skill: 0, stamina: 0 });

  const [start, setStart] = useState(false);
  const [character, setCharacter] = useState(false);

  const characterField = character ? "" : "hidden";
  const coverField = character ? "hidden" : "";
  const pageField = start ? "" : "hidden";

  const url = process.env.REACT_APP_API_URL;

  const apiCall = () => {
    axios
      .get(url)
      .then((res) => {
        console.log(res);
        return res.data;
      })
      .then((data) => {
        console.log(data);
        setBook(data);
        setCharacter(true);
      })
      .catch((error) => {
        console.error("Error during API call:", error);
      });
  };

  useEffect(() => {
    const actualPage = book.filter((item) => item.page === actual);
    return setallPage(actualPage);
  }, [actual]);

  useEffect(() => {
    if (typeof allPage[0] !== "undefined") {
      const actualReduces = allPage[0].reduces;
      return setReduces(actualReduces);
    }
  }, [allPage]);

  useEffect(() => {
    if (typeof allPage[0] !== "undefined") {
      const actualEnemy = allPage[0].enemy;
      return setEnemy(actualEnemy);
    }
  }, [allPage]);

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

  const pageList = allPage.map((item) => (
    <Page
      page={item.page}
      text={item.text}
      key={item._id}
      routes={item.routes}
      reduces={item.reduces}
      enemy={item.enemy}
      handleTurn={handleTurn}
    />
  ));

  return (
    <div className="bg-stone-800 text-white text-center min-h-screen">
      <header>
        <div className={coverField}>
          <h1 className="text-5xl font-bold uppercase tracking-wider p-4">
            Planet of the Spiders
          </h1>
          <button onClick={apiCall}>
            <img
              className="max-h-[75vh] px-10"
              src={cover}
              alt="Planet of the Spiders"
            />
          </button>
          <div className="text-lg font-bold uppercase tracking-wider p-4">
            Click on the picture to start your journey
          </div>
        </div>
        <div className={characterField}>
          <Player
            reduces={reduces}
            enemy={enemy}
            handleStart={handleStart}
            start={start}
            newGame={handleNewGame}
            handleDead={handleDead}
          />
        </div>
        <div className={pageField}>{pageList}</div>
      </header>
    </div>
  );
}

export default App;
