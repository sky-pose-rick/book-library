function Book(title, author, pages, isRead) {
  const obj = {
    title, author, pages, isRead,
  };

  obj.toggleRead = () => {
    obj.isRead = !obj.isRead;
    return obj.isRead;
  };
  return obj;
}

export default Book;
