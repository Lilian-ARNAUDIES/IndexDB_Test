import React, { useState } from 'react';
import { openDB, STORE_NAME } from '../db';

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');

  const handleAddBook = () => {
    openDB().then((db) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const newBook = {
        title,
        description,
        category,
        image,
      };
      store.add(newBook);
      transaction.oncomplete = () => {
        setTitle('');
        setDescription('');
        setCategory('');
        setImage('');
      };
    });
  };

  return (
    <div className="d-flex justify-content-center">
      <form className="col-6">
        <div className="form-group mb-2">
          <label className='mb-2'>Titre</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group mb-2">
          <label className='mb-2'>Description</label>
          <input
            type="text"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group mb-2">
          <label className='mb-2'>Catégorie</label>
          <select
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value=""></option>
            <option value="Romance">Romance</option>
            <option value="Science-fiction">Science-fiction</option>
            <option value="Histoire">Histoire</option>
            <option value="Biographie">Biographie</option>
            <option value="Poésie">Poésie</option>
            <option value="Roman">Roman</option>
            <option value="Roman historique">Roman historique</option>
            <option value="Conte philosophique">Conte philosophique</option>
            <option value="Série de romans">Série de romans</option>
          </select>
        </div>
        <div className="form-group mb-2">
          <label className='mb-2'>Image</label>
          <input
            type="text"
            className="form-control"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary mt-3"
          onClick={handleAddBook}
        >
          Ajouter un livre
        </button>
      </form>
    </div>
  );
};

export default AddBook;