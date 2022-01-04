import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import Library from './library';
import uiHelper from './uiHelper';

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: 'AIzaSyA0xngi3EiPEO9lacm1gwDeOOJdti-PIGw',
  authDomain: 'booklibrary-80465.firebaseapp.com',
  projectId: 'booklibrary-80465',
  storageBucket: 'booklibrary-80465.appspot.com',
  messagingSenderId: '24974076749',
  appId: '1:24974076749:web:474eb99bd92860c5792504',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

// Saves a new message to Cloud Firestore.
async function fireAddBook(book) {
  // Add a new message entry to the Firebase database.
  console.log('try add firestore book');
  try {
    await addDoc(collection(db, 'books'), {
      title: book.title,
      author: book.author,
      pages: book.pages,
      isRead: book.isRead,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error writing new message to Firebase Database', error);
  }
  console.log('firebase book accepted');
}

function saveLibrary(library) {
  const bookList = [];
  library.books.forEach((book) => {
    if (!book.isDeleted) { bookList.push(book); }
  });
  localStorage.setItem('OdinLibrary', JSON.stringify(bookList));
}

function createLibrary(library) {
  // create ui and attach listeners

  const onToggleRead = (book) => {
    book.toggleRead();
    saveLibrary(library);
  };

  const onDeleteBook = (book) => {
    book.isDeleted = true;
    saveLibrary(library);
  };

  const onAddNewBook = (title, author, pages, isRead) => {
    const newBook = library.addBook(title, author, pages, isRead);
    fireAddBook(newBook);
    return newBook;
  };

  uiHelper.uiCreateLibrary(library, onToggleRead, onDeleteBook, onAddNewBook);
}

function loadLocalLibrary() {
  const myLibrary = Library();
  const localLibrary = JSON.parse(localStorage.getItem('OdinLibrary'));
  console.log(localLibrary);

  if (!localLibrary || localLibrary.length === 0) {
    myLibrary.addBook('The quick brown fox', 'a lazy dog', '5', false);
    saveLibrary(myLibrary);
  } else {
    localLibrary.forEach((entry) => {
      const {
        title, author, pages, isRead,
      } = entry;
      myLibrary.addBook(title, author, pages, isRead);
    });
  }

  return myLibrary;
}

export default { loadLocalLibrary, createLibrary };
