const DB_NAME = 'LibraryDB';
const STORE_NAME = 'books';

const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      resolve(db);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

export { openDB, STORE_NAME };