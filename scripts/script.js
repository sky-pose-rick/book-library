let myLibrary = [];
let bookIndex = 0;

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.index = bookIndex++;
}

function addBookToLibrary(entry) {
  myLibrary.push(entry);

  let newElem = document.createElement("div");
  newElem.setAttribute("data-index", entry.index);
  newElem.classList.add("book");
  addParagraph(newElem, "book-title", "Title", entry.title);
  addParagraph(newElem, "book-author", "Author", entry.author);
  addParagraph(newElem, "book-pages", "Pages", entry.pages);
  addParagraph(newElem, "book-status", "Status", entry.isRead ? "Have Read": "Not Read Yet");

  let toggleButton = document.createElement("button");
  toggleButton.addEventListener("click", toggleRead);
  toggleButton.innerText = "Toggle Status";
  newElem.appendChild(toggleButton);

  let delButton = document.createElement("button");
  delButton.addEventListener("click", deleteBook);
  delButton.innerText = "Delete Book";
  newElem.appendChild(delButton);

  libraryElem.appendChild(newElem);
}

function addParagraph(parent, pClass, label, content)
{
  let newElem = document.createElement("p");
  newElem.classList.add(pClass);
  newElem.innerText = `${label}: ${content}`;
  parent.appendChild(newElem);
}

Book.prototype.toggleStatus = function(){
  this.isRead = !this.isRead;
};

function toggleRead()
{
  //this function is called by a button click
  //searches for the book in library and changes isRead
  //updates html on page
  
  let parent = this.parentElement;
  let parentIndex = +parent.getAttribute("data-index");
  let result;
  myLibrary.forEach(book =>{
    if(book.index === parentIndex)
    {
      result = book;
    }
  });
  result.toggleStatus();
  parent.getElementsByClassName("book-status")[0].innerText = `Status: ${result.isRead ? "Have Read": "Not Read Yet"}`;
  saveLibrary();
}

function deleteBook()
{
  //this function is called by a button click
  //searches for the book in library and deletes it
  //deletes element from html
  let parent = this.parentElement;
  let parentIndex = +parent.getAttribute("data-index");
  let result;
  myLibrary.forEach(book =>{
    if(book.index === parentIndex)
    {
      result = book;
    }
  });
  result.isDeleted = true;
  parent.remove();
  saveLibrary();
}

function saveLibrary()
{
  let libraryCopy = [];
  myLibrary.forEach(book =>{
    if(!book.isDeleted)
      libraryCopy.push(book);
  });
  localStorage.setItem('OdinLibrary', JSON.stringify(libraryCopy));
}

const newButton = document.getElementById("add-button");
const newForm = document.getElementById("add-form");
const libraryElem = document.getElementById("library");
const hideButton = document.getElementById("hide-button");
const formButton = document.getElementById("form-button");

newButton.addEventListener("click", ()=>{
  newForm.toggleAttribute("hidden");
  newButton.toggleAttribute("hidden");
  hideButton.toggleAttribute("hidden");
});

hideButton.addEventListener("click", ()=>{
  newForm.toggleAttribute("hidden");
  newButton.toggleAttribute("hidden");
  hideButton.toggleAttribute("hidden");
});

formButton.addEventListener("click", (event)=>{
  let children = newForm.children;
  const title = children[1];
  const author = children[4];
  const pages = children[7];
  const isRead = children[10];

  title.checkValidity();
  if(!title.validity.valid){
    console.log('title rejected');
    return false;
  }

  author.checkValidity();
  if(!author.validity.valid){
    console.log('author rejected');
    return false;
  }

  pages.checkValidity();
  if(!pages.validity.valid){
    console.log('pages rejected');
    return false;
  }
  console.log('book accepted');

  const book = new Book(title.value, author.value, pages.value, isRead.checked);
  addBookToLibrary(book);
  saveLibrary();
});

const localLibrary = JSON.parse(localStorage.getItem("OdinLibrary"));

if(!localLibrary || localLibrary.length === 0)
{
  let qf = new Book("The quick brown fox", "a lazy dog", "5", false);
  addBookToLibrary(qf);
  saveLibrary();
}
else
{
  for(let prop in localLibrary)
  {
    const book = localLibrary[prop];
    book.index = bookIndex++;
    addBookToLibrary(new Book(book.title, book.author, book.pages, book.isRead));
  }
}