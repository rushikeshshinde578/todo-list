import React, { useEffect, useState } from 'react'
import "./style.css"


//get the localstorage data back
const getLocalData = () => {
  const list = localStorage.getItem("mytodolist");

  if (list) {
    return JSON.parse(list);  //get the data into the array format
  } else {
    return [];
  }
}

const Todo = () => {
  const [inputdata, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  //add items function
  const addItem = () => {
    if (!inputdata) {
      alert("Please fill the data");
    } else if(inputdata && toggleButton) {
      setItems(
        items.map((curElem) => {
          if(curElem.id === isEditItem) {
            return{...curElem, name: inputdata};
          }
          return curElem;
        })
      );
      setInputData("");
      setIsEditItem(null);
      setToggleButton(false);
    }
    else {
      const myNewInputData = {              //Add unique id 
        id: new Date().getTime().toString(),
        name: inputdata,
      };
      setItems([...items, myNewInputData]);
      setInputData("");    //Empty input box after adding item
    }
  };

  //Edit Items
  const editItem = (index) => {
    const item_todo_edited = items.find((curElem) => {
      return curElem.id === index;
    });
    setInputData(item_todo_edited.name);
    setIsEditItem(index);
    setToggleButton(true);
  };

  //Delete item
  const deleteItem = (index) => {
    const updatedItem = items.filter((curElem) => {
      return curElem.id !== index;
    });
    setItems(updatedItem);
  };

  //Remove all the elements
  const removeAll = () => {
    setItems([]);
  };

  //Add localstorage
  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items));
  }, [items]);

  return (
    <>
        <div className='main-div'>
          <div className='child-div'>
            <figure>
              <img src="./images/todo.jpeg" alt="todologo" />
              <figcaption>Add Your TODO List Here...</figcaption>
            </figure>
            <div className='addItems'>
              <input type="text" placeholder='✍️ Add Items' className='form-control' value={inputdata} onChange={(event) => setInputData(event.target.value)}/>
              {toggleButton ? (<i className="far fa-edit add-btn" onClick={addItem}></i>) : (<i className="fa fa-plus add-btn" onClick={addItem}></i>)}
            </div>
            {/* show our items */}
            <div className='showItems'>
              {items.map((curElem) => {
                return (
                  <div className='eachItem' key={curElem.id}>
                <h3>{curElem.name}</h3>
                <div className='todo-btn'>
                <i className="far fa-edit add-btn" onClick={() => editItem(curElem.id)}></i>
                <i className="far fa-trash-alt add-btn" onClick={() => deleteItem(curElem.id)}></i>
                </div>
              </div>
                )
              })}
            </div>

            {/* remove all button */}
            <div className='showItems'>
              <button className='btn effect04' data-sm-link-text="Remove All" onClick={removeAll}>
                <span>Check List</span>
              </button>
            </div>
          </div>
        </div>
    </>
  )
}

export default Todo