const newButton = document.getElementById('add-button');
const newForm = document.getElementById('add-form');
const libraryElem = document.getElementById('library');
const hideButton = document.getElementById('hide-button');
const formButton = document.getElementById('form-button');
const { children } = newForm;
const titleText = children[1];
const authorText = children[4];
const pagesText = children[7];
const isReadBox = children[10];
const formError = '';

function addParagraph(parent, pClass, label, content) {
  const newElem = document.createElement('p');
  newElem.classList.add(pClass);
  newElem.innerText = `${label}: ${content}`;
  parent.appendChild(newElem);
  return newElem;
}

function addBookToLibrary(key, book, onToggleRead, onDeleteBook) {
  const newElem = document.createElement('div');
  newElem.setAttribute('key', key);
  newElem.classList.add('book');
  addParagraph(newElem, 'book-title', 'Title', book.title);
  addParagraph(newElem, 'book-author', 'Author', book.author);
  addParagraph(newElem, 'book-pages', 'Pages', book.pages);
  const toggleElem = addParagraph(newElem, 'book-status', 'Status', book.isRead ? 'Have Read' : 'Not Read Yet');

  const toggleButton = document.createElement('button');
  const toggleEvent = () => {
    onToggleRead(key);
    // toggleElem.innerText = `Status: ${book.isRead ? 'Have Read' : 'Not Read Yet'}`;
  };

  toggleButton.addEventListener('click', toggleEvent);
  toggleButton.innerText = 'Toggle Status';
  newElem.appendChild(toggleButton);

  const deleteEvent = () => {
    onDeleteBook(key);
    // newElem.remove();
  };

  const delButton = document.createElement('button');
  delButton.addEventListener('click', deleteEvent);
  delButton.innerText = 'Delete Book';
  newElem.appendChild(delButton);

  libraryElem.appendChild(newElem);
}

newButton.addEventListener('click', () => {
  newForm.toggleAttribute('hidden');
  newButton.toggleAttribute('hidden');
  hideButton.toggleAttribute('hidden');
});

hideButton.addEventListener('click', () => {
  newForm.toggleAttribute('hidden');
  newButton.toggleAttribute('hidden');
  hideButton.toggleAttribute('hidden');
});

titleText.addEventListener('input', () => {
  titleText.checkValidity();
});

authorText.addEventListener('input', () => {
  authorText.checkValidity();
});

pagesText.addEventListener('input', () => {
  pagesText.checkValidity();
});

function uiCreateLibrary(library, onToggleRead, onDeleteBook, onAddNewBook) {
  Object.entries(library.books).forEach((entry) => {
    const [key, value] = entry;
    addBookToLibrary(key, value, onToggleRead, onDeleteBook);
  });

  // add listener to form
  formButton.addEventListener('click', (event) => {
    // as a click event, needs to check validity here
    if (!titleText.validity.valid) {
      console.log('title rejected');
      return false;
    }

    authorText.checkValidity();
    if (!authorText.validity.valid) {
      console.log('author rejected');
      return false;
    }

    pagesText.checkValidity();
    if (!pagesText.validity.valid) {
      console.log('pages rejected');
      return false;
    }
    console.log('book accepted');

    // use a promise to avoid holding up execution
    onAddNewBook(
      titleText.value,
      authorText.value,
      pagesText.value,
      isReadBox.checked,
    );
    // let library manager call the add book
    /* .then((result) => {
      const { key, newBook } = result;
      addBookToLibrary(key, newBook, onToggleRead, onDeleteBook);
    }); */

    // prevent page reload
    event.preventDefault();
    return false;
  });
}

function deleteByKey(key) {
  const childArray = Array.from(libraryElem.children);
  const toDelete = childArray.find((value) => {
    const bookKey = value.getAttribute('key');
    return bookKey === key;
  });
  if (toDelete) { toDelete.remove(); }
}

function changeByKey(key, book, onToggleRead, onDeleteBook) {
  const childArray = Array.from(libraryElem.children);
  const toDelete = childArray.find((value) => {
    const bookKey = value.getAttribute('key');
    return bookKey === key;
  });
  if (toDelete) { toDelete.remove(); }
  addBookToLibrary(key, book, onToggleRead, onDeleteBook);
}

export default {
  uiCreateLibrary, deleteByKey, changeByKey, addBookToLibrary,
};
