import { photoSizes } from "../App";
import "./CatGalleryCard.css";

interface CatGalleryCardProps {
  id: string;
  size: photoSizes;
  tags: string[];
}

const convertToPixels = (size: photoSizes) => {
  switch (size) {
    case "xsmall":
      return 200;
    case "small":
      return 250;
    case "medium":
      return 300;
  }
};

const Tag = ({ tagString }: { tagString: string }) => {
  return <span className='tag'>{tagString.replace("_", " ")}</span>;
};

const CatGalleryCard = ({ id, size, tags }: CatGalleryCardProps) => {
  return (
    <div className='cat'>
      <img
        src={`https://cataas.com/cat/${id}?width=${convertToPixels(size)}`}
        alt='cat'
      />
      <div className='tags'>
        {tags.map((tag) => (
          <Tag tagString={tag} />
        ))}
      </div>
    </div>
  );
};

export default CatGalleryCard;
