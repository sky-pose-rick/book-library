import Library from './library';
import uiHelper from './uiHelper';

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
    library.addBook(title, author, pages, isRead);
    saveLibrary(library);
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
