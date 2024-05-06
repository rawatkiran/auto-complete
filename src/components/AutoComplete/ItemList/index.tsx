import React from "react";
interface ItemListProps {
  items: string[];
  query: string;
  onItemClick: (item: string) => any
}
const ItemList: React.FC<ItemListProps> = ({ items, query,onItemClick }) => {
  // Function to highlight matching text
  const highlightText = (value: string) => {
    const index = value.toLowerCase().indexOf(query.toLowerCase());
    if (index === -1) return value;
    const beforeMatch = value.slice(0, index);
    const match = value.slice(index, index + query.length);
    const afterMatch = value.slice(index + query.length);
    return (
      <span>
        {beforeMatch}
        <strong>{match}</strong>
        {afterMatch}
      </span>
    );
  };
  return (
    <ul className="item-container">
      {items?.map((item: any, index: number) => {
        return (
          <li key={index} className="list-item" onClick={()=>onItemClick(item.title)}>
            {highlightText(item.title)}
          </li>
        );
      })}
    </ul>
  );
};
export default ItemList;
