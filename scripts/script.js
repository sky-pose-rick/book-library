let myLibrary = [];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

function addBookToLibrary(entry) {
  myLibrary.push(entry);

  let newElem = document.createElement("div");
  newElem.classList.add("book");
  addParagraph(newElem, "Title", entry.title);
  addParagraph(newElem, "Author", entry.author);
  addParagraph(newElem, "Pages", entry.pages);
  addParagraph(newElem, "Status", entry.isRead ? "Have Read": "Not Read Yet");
  libraryElem.appendChild(newElem);
}

function addParagraph(parent, label, content)
{
  let newElem = document.createElement("p");
  newElem.innerText = `${label}: ${content}`;
  parent.appendChild(newElem);
}

const newButton = document.getElementById("add-button");
const newForm = document.getElementById("add-form");
const libraryElem = document.getElementById("library");

let qf = new Book("The quick brown fox", "Some guy", "5", false);
addBookToLibrary(qf);
addBookToLibrary(qf);