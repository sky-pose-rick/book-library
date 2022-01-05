import Book from './book';

function Library() {
  const books = {};

  const addNewBook = (title, author, pages, isRead, key) => {
    const newBook = Book(title, author, pages, isRead);
    books[key] = newBook;

    return newBook;
  };

  const addBook = (oldBook, key) => {
    books[key] = oldBook;
  };

  const deleteBook = (key) => {
    delete books[key];
  };

  return {
    books, addNewBook, addBook, deleteBook,
  };
}

export default Library;
