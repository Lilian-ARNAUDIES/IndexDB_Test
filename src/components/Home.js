import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { openDB, STORE_NAME } from '../db';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');
  const fetchedBooks = [
    { id: 1, title: "L'Étranger", category: "Roman", description: "Un roman d'Albert Camus sur l'absurdité de la vie." },
    { id: 2, title: "À la recherche du temps perdu", category: "Roman", description: "L'œuvre majeure de Marcel Proust." },
    { id: 3, title: "Madame Bovary", category: "Roman", description: "Un chef-d'œuvre de Gustave Flaubert sur les désirs inassouvis." },
    { id: 4, title: "Les Misérables", category: "Roman historique", description: "L'épopée de Victor Hugo sur la justice et la rédemption." },
    { id: 5, title: "Le Petit Prince", category: "Conte philosophique", description: "Un conte touchant d'Antoine de Saint-Exupéry." },
    { id: 6, title: "Germinal", category: "Roman social", description: "Un roman d'Émile Zola sur la condition ouvrière." },
    { id: 7, title: "Voyage au bout de la nuit", category: "Roman", description: "L'œuvre majeure de Louis-Ferdinand Céline." },
    { id: 8, title: "La Peste", category: "Roman", description: "Un roman d'Albert Camus sur une épidémie à Oran." },
    { id: 9, title: "Les Fleurs du mal", category: "Poésie", description: "Un recueil de poèmes de Charles Baudelaire." },
    { id: 10, title: "Candide", category: "Conte philosophique", description: "Un conte satirique de Voltaire." },
    { id: 11, title: "Notre-Dame de Paris", category: "Roman historique", description: "Un roman de Victor Hugo sur le destin tragique d'Esmeralda." },
    { id: 12, title: "Bel-Ami", category: "Roman", description: "Un roman de Guy de Maupassant sur l'ascension sociale." },
    { id: 13, title: "Le Comte de Monte-Cristo", category: "Roman d'aventure", description: "Un roman d'Alexandre Dumas sur la vengeance." },
    { id: 14, title: "La Chute", category: "Roman", description: "Un roman d'Albert Camus sur la culpabilité et la chute morale." },
    { id: 15, title: "Thérèse Raquin", category: "Roman", description: "Un roman naturaliste d'Émile Zola." },
    { id: 16, title: "Les Trois Mousquetaires", category: "Roman d'aventure", description: "Un roman d'Alexandre Dumas sur l'amitié et l'aventure." },
    { id: 17, title: "Du côté de chez Swann", category: "Roman", description: "Le premier tome de l'œuvre de Marcel Proust." },
    { id: 18, title: "L'Assommoir", category: "Roman social", description: "Un roman d'Émile Zola sur la vie dans les quartiers populaires de Paris." },
    { id: 19, title: "Nana", category: "Roman", description: "Un roman d'Émile Zola sur la décadence de la société parisienne." },
    { id: 20, title: "Les Rougon-Macquart", category: "Série de romans", description: "Une série de romans d'Émile Zola dépeignant la société française sous le Second Empire." }
  ];

  useEffect(() => {
    openDB().then((db) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);

      fetchedBooks.forEach((book) => {
        store.add(book);
      });

      const getAllBooks = store.getAll();
      getAllBooks.onsuccess = () => {
        setBooks(getAllBooks.result);
      };
    });
  }, []);

  useEffect(() => {
    openDB().then((db) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const getAllBooks = store.getAll();
      getAllBooks.onsuccess = () => {
        setBooks(getAllBooks.result);
      };
    });
  }, []);

  const handleDelete = (id) => {
    openDB().then((db) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      store.delete(id);
      transaction.oncomplete = () => {
        setBooks(books.filter((book) => book.id !== id));
      };
    });
  };
  
  const handleEditBook = (book) => {
    setSelectedBook(book);
    setUpdatedTitle(book.title); 
    setUpdatedDescription(book.description); 
    setShowModal(true);
  };

  const handleUpdateBook = () => {
    if (selectedBook) {
      const updatedBook = { ...selectedBook };
      updatedBook.title = updatedTitle; 
      updatedBook.description = updatedDescription;

      const request = indexedDB.open('librayDB');

      request.onsuccess = (event) => {
        const db = event.target.result;

        const transaction = db.transaction('livres', 'readwrite');
        const store = transaction.objectStore('livres');

        const updateRequest = store.put(updatedBook);

        updateRequest.onsuccess = () => {
          setSelectedBook(null);
          setShowModal(false);
        };

        updateRequest.onerror = () => {
          console.error('Erreur lors de la mise à jour du livre');
        };
      };

      request.onerror = (event) => {
        console.error("Erreur lors de l'ouverture de la base de données", event.target.error);
      };
    }
  };

  return (
    <div>
      <div className="list-group mt-5">
        {books.map((book) => (
          <div key={book.id} className="list-group-item d-flex align-items-center justify-content-between">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-book" viewBox="0 0 16 16">
                <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
              </svg>            
            </div>
            <div>
              <h5 className="mb-1">{book.title}</h5>
              <p className="mb-1">{book.description}</p>
              <p><strong>Catégorie : </strong>{book.category}</p>
            </div>
            <div>
              <button className="btn btn-primary" onClick={() => handleEditBook(book)}>Modifier</button>
              <button className="btn btn-danger" onClick={() => handleDelete(book.id)}>Supprimer</button>
            </div>
          </div>
        ))}
      </div>


      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier le livre</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleUpdateBook}>
            <div>
              <div className="form-group">
                <label className="mb-2">Titre</label>
                <input
                  type="text"
                  value={updatedTitle}
                  className="form-control"
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                />
              </div>
              <div className="form-group mt-3">
                <label className="mb-2">Description</label>
                <input
                  type="text"
                  value={updatedDescription}
                  className="form-control"
                  onChange={(e) => setUpdatedDescription(e.target.value)}
                />
              </div>
            </div>
            <Button className="mt-3" type="submit">Enregistrer</Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Home;