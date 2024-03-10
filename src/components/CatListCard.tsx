import "./CatListCard.css";

interface CatListCardProps {
  id: string;
  tags: string[];
  idx: number;
}

const Tag = ({ tagString }: { tagString: string }) => {
  return <span className='tag'>{tagString.replace("_", " ")}</span>;
};

const CatListCard = ({ id, tags, idx }: CatListCardProps) => {
  return (
    <div className='catList'>
      <h2 className='name'>Small cat #{idx + 1}</h2>
      <div className='id'>ID: {id}</div>
      <div className='tags listTags'>
        {tags.map((tag) => (
          <Tag tagString={tag} />
        ))}
      </div>
      <img
        src={`https://cataas.com/cat/${id}?type=square`}
        className='listImg'
        alt='cat'
      />
    </div>
  );
};

export default CatListCard;
