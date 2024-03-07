import { useEffect, useState } from "react";
import "./App.css";
import Cat from "./components/Cat";

interface Cat {
  _id: string;
  mimetype: string;
  size: number;
  tags: string[];
}

export type photoSizes = "xsmall" | "small" | "medium";

function App() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [numberOfCats, setNumberOfCats] = useState(3);
  const [isOptionsOpen, setIsOptionsOpen] = useState(true);
  const [includeXSmall, setIncludeXSmall] = useState(false);
  const [includeSmall, setIncludeSmall] = useState(true);
  const [includeMedium, setIncludeMedium] = useState(false);

  useEffect(() => {
    fetch(`https://cataas.com/api/cats?tags=small&limit=${numberOfCats}`)
      .then((response) => response.json())
      .then((data) => setCats(data));
  }, [numberOfCats]);

  useEffect(() => {
    setCats((cats) => cats);
  }, [includeXSmall, includeSmall, includeMedium]);

  const pickSizeAtRandom = () => {
    const sizes: photoSizes[] = [];
    if (includeXSmall) sizes.push("xsmall");
    if (includeSmall) sizes.push("small");
    if (includeMedium) sizes.push("medium");
    return sizes[Math.floor(Math.random() * sizes.length)];
  };

  return (
    <>
      <aside className={isOptionsOpen ? "" : "closed"}>
        <button onClick={() => setIsOptionsOpen(!isOptionsOpen)}>◀︎</button>
        <div>
          <h2>Cat options</h2>
          <fieldset>
            <label htmlFor='numberOfCats'>Number of cats</label>
            <input
              type='number'
              id='numberOfCats'
              value={numberOfCats}
              onChange={(e) =>
                setNumberOfCats(Math.max(parseInt(e.target.value), 1))
              }
            />
          </fieldset>
          <fieldset>
            <label>Photo sizes</label>
            <label>
              <input
                type='checkbox'
                checked={includeXSmall}
                onChange={() => setIncludeXSmall(!includeXSmall)}
              />
              Extra small
            </label>
            <label>
              <input
                type='checkbox'
                checked={includeSmall}
                onChange={() => setIncludeSmall(!includeSmall)}
              />
              Small
            </label>
            <label>
              <input
                type='checkbox'
                checked={includeMedium}
                onChange={() => setIncludeMedium(!includeMedium)}
              />
              Medium
            </label>
          </fieldset>
        </div>
      </aside>
      <main>
        {cats &&
          cats.map((cat: Cat) => {
            return <Cat key={cat._id} id={cat._id} size={pickSizeAtRandom()} />;
          })}
      </main>
    </>
  );
}

export default App;
