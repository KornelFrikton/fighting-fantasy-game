import React, { useEffect, useState } from "react";

import book from "./pictures/book-cover.svg";
import direction from "./pictures/direction-signs.svg";
import flask from "./pictures/fizzing-flask.svg";

function Page({ page, text, routes, handleTurn, reduces }) {
  const [actualRoute, setactualRoute] = useState([]);
  const [isReduces, setIsReduces] = useState(false);

  const effectField = isReduces
    ? "bg-gradient-to-r from-amber-900 border-4 rounded m-4 p-2 flex justify-center items-center text-xl font-bold uppercase tracking-wider"
    : "hidden";

  useEffect(() => {
    if (typeof routes === "undefined") {
      setactualRoute([]);
    } else {
      setactualRoute(routes);
    }
  }, [routes]);

  useEffect(() => {
    for (let key in reduces) {
      if (reduces[key] !== 0) {
        return setIsReduces(true);
      }
    }
  }, [reduces]);

  const effect = Object.entries(reduces)
    .filter(([key, value]) => value !== 0)
    .map(([key, value]) => (
      <div key={key}>
        Effect: {key}: {-value}
      </div>
    ));

  return (
    <div>
      <div className="mx-4 flex items-center justify-center rounded border-4 bg-gradient-to-tr from-sky-900 to-lime-900 p-2 text-xl font-bold uppercase tracking-wider">
        <img className="mr-2 h-8 rounded-md" src={book} alt="Page" />
        Page: {page}
      </div>
      <div className="mx-4 rounded border-4 bg-gradient-to-br from-sky-900 to-lime-900 p-2 text-left text-lg first-letter:float-left first-letter:mr-2 first-letter:text-7xl first-letter:font-bold first-letter:text-white first-line:uppercase first-line:tracking-widest">
        {text}
      </div>
      <div className={effectField}>
        <img className="mr-2 h-8 rounded-md" src={flask} alt="Effect" />
        {effect}
      </div>

      <div className="mx-4 rounded border-4 bg-gradient-to-tr from-sky-900 to-lime-900 p-2 text-left text-xl">
        <div className="flex items-center justify-center text-center text-xl font-bold uppercase tracking-wider">
          <img className="mr-2 h-8 rounded-md" src={direction} alt="Routes" />
          Routes:
        </div>
        {actualRoute.map((item) => (
          <div className="py-4" key={item._id}>
            {item.routeText} page
            <button
              className="w-1/8 mx-2 rounded border-2 px-2 text-xl font-bold uppercase tracking-wider hover:scale-110"
              onClick={handleTurn}
              value={item.nextPage}
            >
              {item.nextPage}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Page;
