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

function addBookToLibrary(entry, onToggleRead, onDeleteBook) {
  const newElem = document.createElement('div');
  newElem.setAttribute('data-index', entry.index);
  newElem.classList.add('book');
  addParagraph(newElem, 'book-title', 'Title', entry.title);
  addParagraph(newElem, 'book-author', 'Author', entry.author);
  addParagraph(newElem, 'book-pages', 'Pages', entry.pages);
  const toggleElem = addParagraph(newElem, 'book-status', 'Status', entry.isRead ? 'Have Read' : 'Not Read Yet');

  const toggleButton = document.createElement('button');
  const toggleEvent = () => {
    onToggleRead(entry);
    toggleElem.innerText = `Status: ${entry.isRead ? 'Have Read' : 'Not Read Yet'}`;
  };

  toggleButton.addEventListener('click', toggleEvent);
  toggleButton.innerText = 'Toggle Status';
  newElem.appendChild(toggleButton);

  const deleteEvent = () => {
    onDeleteBook(entry);
    newElem.remove();
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
  library.books.forEach((book) => {
    addBookToLibrary(book, onToggleRead, onDeleteBook);
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

    onAddNewBook(
      titleText.value,
      authorText.value,
      pagesText.value,
      isReadBox.checked,
    );

    // prevent page reload
    event.preventDefault();
    return false;
  });
}

export default { uiCreateLibrary };
