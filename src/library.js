import Book from './book';

function Library() {
  const books = [];

  const addBook = (title, author, pages, isRead) => {
    const newBook = Book(title, author, pages, isRead);
    books.push(newBook);

    return newBook;
  };

  return { books, addBook };
}

export default Library;
