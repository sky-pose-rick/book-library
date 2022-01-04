import Book from './book';
import Library from './library';

const myLibrary = [];

function addBookToLibrary(entry) {
  myLibrary.push(entry);

  const newElem = document.createElement('div');
  newElem.setAttribute('data-index', entry.index);
  newElem.classList.add('book');
  addParagraph(newElem, 'book-title', 'Title', entry.title);
  addParagraph(newElem, 'book-author', 'Author', entry.author);
  addParagraph(newElem, 'book-pages', 'Pages', entry.pages);
  addParagraph(newElem, 'book-status', 'Status', entry.isRead ? 'Have Read' : 'Not Read Yet');

  const toggleButton = document.createElement('button');
  toggleButton.addEventListener('click', toggleRead);
  toggleButton.innerText = 'Toggle Status';
  newElem.appendChild(toggleButton);

  const delButton = document.createElement('button');
  delButton.addEventListener('click', deleteBook);
  delButton.innerText = 'Delete Book';
  newElem.appendChild(delButton);

  libraryElem.appendChild(newElem);
}

function addParagraph(parent, pClass, label, content) {
  const newElem = document.createElement('p');
  newElem.classList.add(pClass);
  newElem.innerText = `${label}: ${content}`;
  parent.appendChild(newElem);
}

function toggleRead() {
  // this function is called by a button click
  // searches for the book in library and changes isRead
  // updates html on page

  const parent = this.parentElement;
  const parentIndex = +parent.getAttribute('data-index');
  let result;
  myLibrary.forEach((book) => {
    if (book.index === parentIndex) {
      result = book;
    }
  });
  result.toggleStatus();
  parent.getElementsByClassName('book-status')[0].innerText = `Status: ${result.isRead ? 'Have Read' : 'Not Read Yet'}`;
  saveLibrary();
}

function deleteBook() {
  // this function is called by a button click
  // searches for the book in library and deletes it
  // deletes element from html
  const parent = this.parentElement;
  const parentIndex = +parent.getAttribute('data-index');
  let result;
  myLibrary.forEach((book) => {
    if (book.index === parentIndex) {
      result = book;
    }
  });
  result.isDeleted = true;
  parent.remove();
  saveLibrary();
}

function saveLibrary() {
  const libraryCopy = [];
  myLibrary.forEach((book) => {
    if (!book.isDeleted) { libraryCopy.push(book); }
  });
  localStorage.setItem('OdinLibrary', JSON.stringify(libraryCopy));
}

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

  const book = new Book(titleText.value, authorText.value, pagesText.value, isReadBox.checked);
  addBookToLibrary(book);
  saveLibrary();

  // prevent page reload
  event.preventDefault();
  return false;
});

const localLibrary = JSON.parse(localStorage.getItem('OdinLibrary'));
console.log(localLibrary);

if (!localLibrary || localLibrary.length === 0) {
  const qf = Book('The quick brown fox', 'a lazy dog', '5', false);
  addBookToLibrary(qf);
  saveLibrary();
} else {
  localLibrary.forEach((entry) => {
    const {
      title, author, pages, isRead,
    } = entry;
    addBookToLibrary(Book(title, author, pages, isRead));
  });
}
