import { useEffect, useState } from "react";
import "./App.css";
import CatGalleryCard from "./components/CatGalleryCard";
import CatListCard from "./components/CatListCard";
import { ResizableBox } from "react-resizable";

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
  const [includeXSmall, setIncludeXSmall] = useState(false);
  const [includeSmall, setIncludeSmall] = useState(true);
  const [includeMedium, setIncludeMedium] = useState(false);
  const [isGallery, setIsGallery] = useState(false);

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
      <ResizableBox
        width={275}
        axis="x"
        handle={<span className="draggable">↔</span>}
        className={"options"}
        minConstraints={[275, 1000]}
      >
        <>
          <div>
            <h2>Options</h2>
            <fieldset>
              <label htmlFor="numberOfCats">Number of cats</label>
              <input
                type="number"
                id="numberOfCats"
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
                  type="checkbox"
                  checked={includeXSmall}
                  onChange={() => setIncludeXSmall(!includeXSmall)}
                />
                Extra small
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={includeSmall}
                  onChange={() => setIncludeSmall(!includeSmall)}
                />
                Small
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={includeMedium}
                  onChange={() => setIncludeMedium(!includeMedium)}
                />
                Medium
              </label>
            </fieldset>
            <fieldset>
              {/* radio buttons go here */}
              <label>View mode</label>
              <label>
                <input
                  type="radio"
                  name="gallery"
                  checked={!isGallery}
                  onChange={() => setIsGallery(false)}
                />
                List
              </label>
              <label>
                <input
                  type="radio"
                  name="gallery"
                  checked={isGallery}
                  onChange={() => setIsGallery(true)}
                />
                Gallery
              </label>
            </fieldset>
          </div>
          <div className="expander"></div>
          <div className="navigation">
            <a href="enterprise">Enterprise cat solutions →</a>
            <a href="caas">About →</a>
          </div>
        </>
      </ResizableBox>
      <main>
        {cats && isGallery && (
          <div className="catContent galleryView">
            {cats.map((cat: Cat) => {
              return (
                <CatGalleryCard
                  key={cat._id}
                  id={cat._id}
                  size={pickSizeAtRandom()}
                  tags={cat.tags}
                />
              );
            })}
          </div>
        )}
        {cats && !isGallery && (
          <div className="catContent listView">
            {cats.map((cat: Cat, idx) => {
              return (
                <CatListCard
                  key={cat._id}
                  id={cat._id}
                  tags={cat.tags}
                  idx={idx}
                />
              );
            })}
          </div>
        )}
      </main>
    </>
  );
}

export default App;
