import uniqid from 'uniqid';
import Library from './library';
import uiHelper from './uiHelper';
import Book from './book';

function saveLibrary(library) {
  localStorage.setItem('OdinLibrary', JSON.stringify(library.books));
}

function createLibrary(library) {
  // create ui and attach listeners

  const onToggleRead = (key) => {
    library.books[key].toggleRead();
    saveLibrary(library);
  };

  const onDeleteBook = (key) => {
    library.deleteBook(key);
    saveLibrary(library);
  };

  const onAddNewBook = (title, author, pages, isRead) => {
    const key = uniqid();
    const newBook = library.addNewBook(title, author, pages, isRead, key);
    saveLibrary(library);

    return { key, newBook };
  };

  uiHelper.uiCreateLibrary(library, onToggleRead, onDeleteBook, onAddNewBook);
}

function loadLocalLibrary() {
  const myLibrary = Library();
  const localLibrary = JSON.parse(localStorage.getItem('OdinLibrary'));
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

  console.log(myLibrary.books);

  return myLibrary;
}

export default { loadLocalLibrary, createLibrary };
