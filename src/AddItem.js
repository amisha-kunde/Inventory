import { useState } from "react";


function AddItem(props) {
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [type, setType] = useState("");
    const [brand, setBrand] = useState("");

    const addItemButtonPressed = () => {
        props.addItem({
            name: name,
            price: price,
            type: type,
            brand: brand 
        });
            setName("");
            setPrice(0);
            setType("");
            setBrand("");
    }


    return (
        <div className="container">
            <div className="row">
                <h2>Add an Item</h2>
            </div>
            <div className="row"><label htmlFor="name-field">Name:</label>
                <input
                    id="name-field"
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={ (e) => setName(e.target.value)}
                />
                <label for="price-field">Price:</label>
                <input
                    id="price-field"
                    type="number"
                    className="form-control"
                    value={price}
                    onChange={ (e) => setPrice(e.target.value)}/>
                <label for="type-field">Type:</label>
                <input
                    id="type-field"
                    type="text"
                    className="form-control"
                    value={type}
                    onChange={ (e) => setType(e.target.value)}/>
                <label for="brand-field">Brand:</label>
                <input
                    id="brand-field"
                    type="text"
                    className="form-control"
                    value={brand}
                    onChange={ (e) => setBrand(e.target.value)}/>
            </div>
            
            <div className="row mt-3">
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={addItemButtonPressed}
                >
                    Add Item
                </button>
            </div>                  
        </div>
    );
}

export default AddItem;