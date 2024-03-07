import { photoSizes } from "../App";
import "./Cat.css";

interface CatProps {
  id: string;
  size: photoSizes;
}

const Cat = ({ id, size }: CatProps) => {
  return (
    <div className='cat'>
      <img src={`https://cataas.com/cat/${id}?type=${size}`} alt='cat' />
    </div>
  );
};

export default Cat;
