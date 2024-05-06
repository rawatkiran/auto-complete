import React from "react";
import "./App.css";
import AutoComplete from "./components/AutoComplete/AutoComplete";
import ItemList from "./components/AutoComplete/ItemList";

type Product = {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string[];
  title: string;
};
const maxItems = 5;

function App() {
  const apiPromise = async (query: string) =>
    await fetch(`https://dummyjson.com/products/search?q=${query}`);

  const filterData = (data: { products?: Product[] }) => {
    return data?.products?.slice(0, maxItems) ?? [];
  };
  return (
    <div className="container">
      {/* Passing all the necessary props to Autocomplete component to make it more dynamic */}
      <AutoComplete
        id="autocomplete"
        label="Autocomplete"
        placeholder="Please Search"
        autoComplete={true}
        debounceDelay={400}
        promise={apiPromise}
        dataToBeDisplayed={filterData}
        itemList={(items, query,onItemClick) => <ItemList items={items} query={query} onItemClick={onItemClick} />}
        errMsg={() => <div>Something went wrong</div>}
        noDataPresent={() => (
          <div className="pad-10">Data is not present! Please try again!</div>
        )}
      />
    </div>
  );
}

export default App;
