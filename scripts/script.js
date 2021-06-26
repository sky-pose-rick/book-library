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
  addParagraph(newElem, "Title", entry.title);
  addParagraph(newElem, "Author", entry.author);
  addParagraph(newElem, "Pages", entry.pages);
  addParagraph(newElem, "Status", entry.isRead ? "Have Read": "Not Read Yet");

  let toggleButton = document.createElement("button");
  toggleButton.addEventListener("click", toggleRead);
  toggleButton.innerText = "Toggle Status";
  newElem.appendChild(toggleButton);

  let delButton = document.createElement("button");
  delButton.addEventListener("click", toggleRead);
  delButton.innerText = "Delete Book";
  newElem.appendChild(delButton);
  
  libraryElem.appendChild(newElem);
}

function addParagraph(parent, label, content)
{
  let newElem = document.createElement("p");
  newElem.innerText = `${label}: ${content}`;
  parent.appendChild(newElem);
}

function toggleRead()
{
  //this function is called by a button click
  //searches for the book in library and changes isRead
  //updates html on page
}

function deleteBook()
{
  //this function is called by a button click
  //searches for the book in library and deletes it
  //deletes element from html
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
  formButton.toggleAttribute("hidden");
});

hideButton.addEventListener("click", ()=>{
  newForm.toggleAttribute("hidden");
  newButton.toggleAttribute("hidden");
  hideButton.toggleAttribute("hidden");
  formButton.toggleAttribute("hidden");
});

formButton.addEventListener("click", ()=>{
  let children = newForm.children;
  const title = children[1].value;
  const author = children[4].value;
  const pages = children[7].value;
  const isRead = children[10].checked;

  if(title === null || author === null || Number.isNaN(+pages))
  {
    return;
  }

  const book = new Book(title, author, pages, isRead);
  addBookToLibrary(book);
  localStorage.setItem('OdinLibrary', JSON.stringify(myLibrary));
});

const localLibrary = JSON.parse(localStorage.getItem("OdinLibrary"));

if(!localLibrary)
{
  let qf = new Book("The quick brown fox", "Some guy", "5", false);
  addBookToLibrary(qf);
  localStorage.setItem('OdinLibrary', JSON.stringify(myLibrary));
}
else
{
  for(let prop in localLibrary)
  {
    addBookToLibrary(localLibrary[prop]);
  }
}