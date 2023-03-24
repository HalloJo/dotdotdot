import { MouseEvent, useState } from "react";
import "./App.css";

type Dot = {
  x: number;
  y: number;
};

function App() {
  const [dots, setDots] = useState<Dot[]>([]);
  const [popped, setPopped] = useState<Dot[]>([]);

  const handlePlaceCircle = (event: MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = event;
    console.log(dots);

    setDots([
      ...dots,
      {
        x: clientX,
        y: clientY,
      },
    ]);
  };

  const handleUndo = () => {
    const newDots = [...dots];
    const poppedDots = newDots.pop();
    if (!poppedDots) return;

    setPopped([...popped, poppedDots]);
    setDots(newDots);
  };

  const handleRedo = () => {
    const newPopped = [...popped];
    const poppedDots = newPopped.pop();
    if (!poppedDots) return;
    setDots([...dots, poppedDots]);
    setPopped(newPopped);
  };

  return (
    <>
      <div className="buttons">
        <button disabled={dots.length === 0} onClick={handleUndo}>
          Undo
        </button>
        <button disabled={popped.length === 0} onClick={handleRedo}>
          Redo
        </button>
      </div>
      <div className="App" onClick={handlePlaceCircle}>
        <h1>Click somewhere for some dotdotdot.</h1>
        {dots.map((dot, idx) => (
          <div
            className="dot"
            key={idx}
            style={{ left: dot.x + "px", top: dot.y + "px" }}
          ></div>
        ))}
      </div>
    </>
  );
}

export default App;
