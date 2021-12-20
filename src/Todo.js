import React, { useState, useEffect } from 'react';
import './App.css';

// to get data from local storage

const getLocalItem = () => {
    let list = localStorage.getItem("lists");
    if (list) {
        return JSON.parse(localStorage.getItem("lists"));
    } else {
        return [];
    }
}

const Todo = () => {
    const [inputData, setInputData] = useState('');
    const [items, setItems] = useState(getLocalItem());
    const [isSubmit, setIsSubmit] = useState(true);
    const [editItemId, setEditItemId] = useState(null);


    const addItem = () => {
        if (!inputData) {
            alert("Please fill the data.")
        } else if (inputData && !isSubmit) {
            setItems(
                items.map((elem) => {
                    if (elem.id === editItemId) {
                        return { ...elem, name: inputData }
                    }
                    return elem;
                })
            )
            setInputData("");
            setIsSubmit(true);
            setEditItemId(null);
        } else {
            const inputDataWithId = { id: new Date().getTime().toString(), name: inputData };
            setItems([...items, inputDataWithId]);
            setInputData("");
        }

    }


    const deleteItem = (id) => {

        const updatedItems = items.filter((elem) => {
            return elem.id !== id;
        });
        setItems(updatedItems);
    }

    const editItem = (id) => {
        let newEditItem = items.find((elem) => {
            return elem.id === id;
        });
        setIsSubmit(false);
        setInputData(newEditItem.name);
        setEditItemId(newEditItem.id);
    }

    const clearAll = () => {
        setItems([]);
    }


    //add data to local storage
    useEffect(() => {
        localStorage.setItem("lists", JSON.stringify(items));
    }, [items])


    return (
        <>
            <div className='main-div'>
                <div className='child-div'>
                    <figure>
                        <i class="fas fa-clipboard-list fa-3x"></i>
                        <figcaption>Add your Task Here</figcaption>
                    </figure>
                    <div className='showItems' style={{ margin: "30px" }}>
                        {
                            items.map((elem) => {
                                return (
                                    <div className='eachItem alert alert-dark' key={elem.id}>
                                        <h5 style={{ display: 'inline-block', margin: "5px 10px" }}>{elem.name}</h5>
                                        <i class="fas fa-edit fa-sm add-btn" title='Edit Item' style={{ display: 'inline-block', margin: "0 10px", cursor: "pointer" }} onClick={() => editItem(elem.id)} ></i>
                                        <i class="fas fa-trash-alt fa-sm add-btn" title='Delete Item' style={{ display: 'inline-block', margin: "0 10px", cursor: "pointer" }} onClick={() => deleteItem(elem.id)} ></i>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='addItems input-group mb-3'>
                        <input className='form-control' type="text" placeholder='Add Items..' value={inputData} onChange={(e) => setInputData(e.target.value)} style={{ margin: "20px" }} />
                        {
                            isSubmit ? <i className="fas fa-plus add-btn" title='Add Item' onClick={addItem} style={{ margin: "30px 10px", cursor: "pointer" }} ></i> : <i className="fas fa-edit add-btn" title='Update Item' onClick={addItem} style={{ margin: "30px 10px", cursor: "pointer" }} ></i>
                        }

                    </div>
                    <div className='showItems'>
                        <button className='btn effect04 btn btn-warning' style={{ margin: "20px", cursor: "pointer" }} onClick={clearAll}>
                            <span>Remove All</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo
