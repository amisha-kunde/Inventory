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
  
      fetch("http://localhost:3000/items")
        .then((response) => response.json())
        .then((fetchedData) => {
          setData({ items: fetchedData });
          
          localStorage.setItem('items', JSON.stringify(fetchedData));
        })
        .catch((error) => {
          console.error('Error fetching items:', error);
        });
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
    const requestOptions = {
      method: "DELETE"
    }
    
    fetch(`http://localhost:3000/items/${item.id}`, requestOptions).then(
      (response) => {
        if (response.ok) {
          const filteredItems = items.filter(i => i.id !== item.id);
          setData({ items: filteredItems });
         
        }
      }
    ).catch((error) => {
      console.error('Error deleting item:', error);
    });
  };

  const addItemToData = (item) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item)
    };
    
    fetch("http://localhost:3000/items", requestOptions)
      .then((response) => response.json())
      .then((newItem) => {
        const updatedItems = [...data.items, newItem];
        setData({ items: updatedItems });
        
      })
      .catch((error) => {
        console.error('Error adding item:', error);
        
      });    
  };

  const clearLocalStorage = () => {
    localStorage.removeItem('items');
    setData({ items: [] });
  };

  
  const syncWithServer = () => {
    fetch("http://localhost:3000/items")
      .then((response) => response.json())
      .then((fetchedData) => {
        setData({ items: fetchedData });
        localStorage.setItem('items', JSON.stringify(fetchedData));
      })
      .catch((error) => {
        console.error('Error syncing with server:', error);
      });
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
            className="btn btn-secondary me-2" 
            onClick={syncWithServer}
          >
            Sync with Server
          </button>
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