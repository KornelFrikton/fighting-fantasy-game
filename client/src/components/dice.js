import React, { useEffect, useState } from "react";

import zero from "./pictures/zero.svg";
import one from "./pictures/one.svg";
import two from "./pictures/two.svg";
import three from "./pictures/three.svg";
import four from "./pictures/four.svg";
import five from "./pictures/five.svg";
import six from "./pictures/six.svg";

const svgMap = {
  0: zero,
  1: one,
  2: two,
  3: three,
  4: four,
  5: five,
  6: six,
  7: one,
  8: two,
  9: three,
  10: four,
  11: five,
  12: six,
};

function Dice({ spin }) {
  const [diceSide, setDiceSide] = useState();

  useEffect(() => {
    const newSide = svgMap[spin];
    setDiceSide(newSide);
  }, [spin]);

  return (
    <div>     
        <img className="h-14 rounded-lg" src={diceSide} alt={diceSide} />
    </div>
  );
}

export default Dice;
