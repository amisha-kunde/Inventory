import styles from './App.module.css';
import SearchBar from "./SearchBar"
import AddItem from "./AddItem";
import { useState } from "react";
import ItemsDisplay from "./ItemsDisplay";


function App() {
  const [filters, setFilters] = useState({});
  const [data, setData] = useState({items: [] });

  const updateFilters = (searchParams) => {
    setFilters(searchParams);
  };

  const addItemToData = (item) => {
    let items = data["items"];
    item.id = items.length;
    items.push(item);
    setData({ items: items});
    console.log(data);
  };

  const filterData = (data) => {
    // returns array with filtered data
    const filteredData = [];

    if (!filters.name) {
      return data;
    }

    for (const item of data) {

      // check filters, first check not equal to default value
      // check it applies to object we're on
      // then pushes the item to filtered data
      if (filters.name !== "" && item.name !== filters.name) {
        continue;
      }

      if (filters.price !== 0 && item.price > filters.price) {
        continue;
      }

      if (filters.type !== "" && item.type !== filters.type) {
        continue;
      }

      if (filters.brand !== "" && item.brand !== filters.brand) {
        continue;
      }

      filteredData.push(item);
    }

    return filteredData;
  }

  return (
    <div className="container">
      <div className="row mt-3">
        <ItemsDisplay items={filterData(data["items"])} />
      </div>
      <div className="row mt-3">
        <SearchBar updateSearchParams={updateFilters}/>
      </div>
      <div className="row mt-3">
        <AddItem addItem={addItemToData}/>
      </div>      
    </div>
  );
}


export default App;