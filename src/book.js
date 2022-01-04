let bookIndex = 0;

function Book(title, author, pages, isRead) {
  const index = bookIndex;
  bookIndex += 1;

  const obj = {
    title, author, pages, isRead, index,
  };

  obj.toggleRead = () => {
    obj.isRead = !obj.isRead;
    return obj.isRead;
  };
  return obj;
}

export default Book;
