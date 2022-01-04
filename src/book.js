let bookIndex = 0;

function Book(title, author, pages, isRead) {
  const index = bookIndex;
  bookIndex += 1;

  return {
    title, author, pages, isRead, index,
  };
}

Book.prototype.toggleStatus = function () {
  this.isRead = !this.isRead;
};

export default Book;
