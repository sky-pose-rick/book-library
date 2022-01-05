import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  query,
  onSnapshot,
  updateDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import uniqid from 'uniqid';
import Library from './library';
import uiHelper from './uiHelper';
import Book from './book';
import getFirebaseConfig from './firebaseConfig';

// Initialize Firebase
const firebaseApp = initializeApp(getFirebaseConfig());
const db = getFirestore(firebaseApp);

function saveLibrary(library) {
  localStorage.setItem('OdinLibrary', JSON.stringify(library.books));
}

async function createLibrary(library) {
  // create ui and attach listeners

  const onToggleRead = async (key) => {
    library.books[key].toggleRead();
    // saveLibrary(library);
    const {
      title, author, pages, isRead,
    } = library.books[key];

    try {
      const docRef = await updateDoc(doc(db, 'books', key), {
        title, author, pages, isRead,
      });
    } catch (e) {
      console.error('Error changing book: ', e);
    }
  };

  const onDeleteBook = async (key) => {
    try {
      const docRef = await deleteDoc(doc(db, 'books', key));
    } catch (e) {
      console.error('Error deleting book: ', e);
    }
    // saveLibrary(library);
  };

  const onAddNewBook = async (title, author, pages, isRead) => {
    // snapshot handles updating the library object
    /* const key = uniqid();
    const newBook = library.addNewBook(title, author, pages, isRead, key);
    saveLibrary(library); */
    try {
      const docRef = await addDoc(collection(db, 'books'), {
        title, author, pages, isRead,
      });
    } catch (e) {
      console.error('Error adding book: ', e);
    }
  };

  // pass an empty library to initialize the form's event handlers
  uiHelper.uiCreateLibrary(library, onToggleRead, onDeleteBook, onAddNewBook);

  // begin tracking changes to database
  const q = query(collection(db, 'books'));
  const unsub = onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === 'added') {
        const key = change.doc.id;
        const {
          title, author, pages, isRead,
        } = change.doc.data();
        const newBook = library.addNewBook(title, author, pages, isRead, key);
        uiHelper.addBookToLibrary(key, newBook, onToggleRead, onDeleteBook);
      }
      if (change.type === 'modified') {
        const key = change.doc.id;
        console.log('change requested', key);
        const {
          title, author, pages, isRead,
        } = change.doc.data();
        const newBook = Book(title, author, pages, isRead);
        uiHelper.changeByKey(key, newBook, onToggleRead, onDeleteBook);
      }
      if (change.type === 'removed') {
        const key = change.doc.id;
        console.log('delete requested', key);
        uiHelper.deleteByKey(key);
      }
    });
  });
}

function loadLocalLibrary() {
  // no local data when using firebase
  const myLibrary = Library();
  /* const localLibrary = JSON.parse(localStorage.getItem('OdinLibrary'));
  console.log(localLibrary);

  if (!localLibrary || localLibrary.length === 0) {
    myLibrary.addNewBook('The quick brown fox', 'a lazy dog', '5', false, uniqid());
    saveLibrary(myLibrary);
  } else {
    Object.entries(localLibrary).forEach((entry) => {
      const [key, value] = entry;
      const {
        title, author, pages, isRead,
      } = value;
      myLibrary.addNewBook(title, author, pages, isRead, key);
      console.log(value);
    });
  }

  console.log(myLibrary.books); */
  return myLibrary;
}

export default { loadLocalLibrary, createLibrary };
