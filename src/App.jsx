import React, { useState } from 'react';
import './App.css';

const App = () => {
  const storage = JSON.parse(localStorage.getItem('images'));
  const [tempStorage, setTempStorage] = useState(storage);
  const [onDelete, setOnDelete] = useState(0);

  function loadButtonClick(event) {
    const reader = new FileReader();
    const selectedItem = event.target.files[0];
    const selectedItemName = selectedItem.name;

    event.target.value = '';

    reader.onload = (event) => {
      const image = {
        id: Math.random(),
        name: selectedItemName.slice(0, -4),
        src: event.target.result,
      };

      setTempStorage(state => {
        state = [...state, image];
        localStorage.setItem('images', JSON.stringify(state));

        return state
      });
    };
  
    reader.readAsDataURL(selectedItem);
  }
  
  function onBtnDeleteClick(id) {
    setOnDelete(id)

    setTimeout(() => {
      const newStorage = tempStorage.filter((element) => element.id !== +id);
      setTempStorage(newStorage);
  
      localStorage.setItem('images', JSON.stringify(newStorage));
    }, 400)
  }

  return (
    <div className="container">
      {console.log(onDelete)}
      <label htmlFor="load-button" className="image-loader">
        Press or drag to load image:
        <input
          type="file"
          id="load-button"
          className="hidden"
          accept="image/*"
          onChange={loadButtonClick}
        />
      </label>
      
      <div
        className="image-block"
      >
        {tempStorage.map((image) => {
          const isDeleted = onDelete === image.id;
          return (
            <div key={image.id} className="image-container">
              <img
                src={image.src}
                alt="something"
                className='image'
              />
              <span className={`image-name ${isDeleted && 'deleted'}`}>
                {image.name}
              </span>
              <button
                className='delete-button'
                onClick={() => onBtnDeleteClick(image.id)}
              >
                Delete
              </button>
            </div>
            )
          }
        )}
      </div>
    </div>
  );
}

export default App;

