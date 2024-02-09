import "./App.css";
import { useState } from "react";
import Tilt from "react-parallax-tilt";
import Card from "./components/Card/Card";
import { FilterProvider } from "./context/FilterContext";
import { ScreenProvider } from "./context/ScreenContext";

function App() {
  // CardIconコンポーネントへ
  const [isTilt, setIsTilt] = useState(false);

  return (
    <>
      <Tilt
        tiltEnable={isTilt}
        tiltMaxAngleX={20}
        tiltMaxAngleY={20}
        transitionSpeed={1500}
        className={isTilt ? "" : "tilt"}
      >
        <FilterProvider>
          <ScreenProvider>
            <Card tiltState={[isTilt, setIsTilt]} />
          </ScreenProvider>
        </FilterProvider>
      </Tilt>
    </>
  );
}

export default App;
