import SearchBar from "./SearchBar"
import AddItem from "./AddItem";
import { useState, useEffect } from "react";
import ItemsDisplay from "./ItemsDisplay";

function App() {
  const [filters, setFilters] = useState({});
  const [data, setData] = useState({items: [] });
  

  useEffect(() => {
    const savedItems = localStorage.getItem('items');
    if (savedItems) {
      setData({ items: JSON.parse(savedItems) });
    } else {
      // Initialize with empty array if no data exists
      localStorage.setItem('items', JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    if (data.items.length > 0) {
      localStorage.setItem('items', JSON.stringify(data.items));
    }
  }, [data.items]);

  const updateFilters = (searchParams) => {
    setFilters(searchParams);
  };

  const deleteItem = (item) => {
    const items = [...data["items"]];
    const filteredItems = items.filter(i => i.id !== item.id);
    setData({ items: filteredItems });
    localStorage.setItem('items', JSON.stringify(filteredItems));
  };

  const addItemToData = (item) => {
    // Generate a unique ID for the new item
    const newItem = {
      ...item,
      id: Date.now() // Using timestamp as a simple unique ID
    };
    const updatedItems = [...data.items, newItem];
    setData({ items: updatedItems });
    localStorage.setItem('items', JSON.stringify(updatedItems));
  };

  const clearLocalStorage = () => {
    localStorage.removeItem('items');
    setData({ items: [] });
  };

  const filterData = (data) => {
    const filteredData = [];

    if (!filters.name) {
      return data;
    }

    for (const item of data) {
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
        <ItemsDisplay
          deleteItem={deleteItem}
          items={filterData(data["items"])} 
        />
      </div>
      <div className="row mt-3">
        <SearchBar updateSearchParams={updateFilters}/>
      </div>
      <div className="row mt-3">
        <AddItem addItem={addItemToData}/>
      </div>
      
      <div className="row mt-3">
        <div className="col">
          <button 
            className="btn btn-warning" 
            onClick={clearLocalStorage}
          >
            Clear Local Data
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;