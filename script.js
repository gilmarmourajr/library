class Book {
  id = crypto.randomUUID();
  read = false;

  constructor(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
  }

  updateReadStatus() {
    if(this.read === true) {
      this.read = false;
    } else {
      this.read = true;
    }
  }

  static addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages);
    if (read) {
      book.read = true;
      display.readCount++;
    } else {
      display.unreadCount++;
    }
    display.bookArray.push(book);
  }
}

class Display {
  readCount = 0;
  unreadCount = 0;
  bookArray = [];
  bookDiv = document.getElementById("books");

  clearDisplay() {
    this.bookDiv.textContent = "";
  }

  addBooksToDisplay() {
    this.clearDisplay();
  
    // cycle through book objects in bookArray
    for (let book of this.bookArray) {
      const newDiv = document.createElement("div");
      newDiv.classList.add("book");
      // set unique id to html, to ease removal process
      newDiv.setAttribute("data-id", book.id);
  
      const dataDiv = document.createElement("div");
      const pTitle = document.createElement("p");
      pTitle.textContent = `Title: ${book.title}`;
      const pAuthor = document.createElement("p");
      pAuthor.textContent = `Author: ${book.author}`;
      const pPages = document.createElement("p");
      pPages.textContent = `Pages: ${book.pages}`;
      dataDiv.append(pTitle, pAuthor, pPages);
  
      const btnDiv = document.createElement("div");
  
      btnDiv.classList.add("btns");
      const statusBtn = document.createElement("button");
      statusBtn.addEventListener("click", this.updateRead);
      statusBtn.classList.add("btn", "status");
      if (book.read) {
        statusBtn.textContent = "Read";
      } else {
        statusBtn.textContent = "Not read";
      }
  
      const delBtn = document.createElement("button");
      delBtn.classList.add("btn", "delete");
      delBtn.textContent = "Delete";
      delBtn.addEventListener("click", this.removeElement);
  
      btnDiv.append(statusBtn, delBtn);
  
      newDiv.append(dataDiv, btnDiv);
      this.bookDiv.appendChild(newDiv);
    }
  }

  updateRead(event) {
    const button = event.currentTarget;
  
    //locate book by id
    let updateId = event.target.parentNode.parentNode.dataset.id;
    for (book of this.bookArray) {
      if (book.id == updateId) {
        book.updateReadStatus();
        
        //update book count
        if (book.read) {
          button.textContent = "Read";
          this.readCount++;
          this.unreadCount--;
          break;
        } else {
          button.textContent = "Not read";
          this.unreadCount++;
          this.readCount--;
          break;
        }    
      }
    }
  
    updateStatus();
  }

  removeElement(event) {
    const button = event.currentTarget;
  
    //locate book to be removed by its id
    let removeId = event.target.parentNode.parentNode.dataset.id;
    for (book in this.bookArray) {
      if (this.bookArray[book].id == removeId) {
        // update book count on delete
        if (this.bookArray[book].read) {
          this.readCount--;
        } else {
          this.unreadCount--;
        }
  
        this.bookArray.splice(book, 1);
        updateStatus();
        break;
      }
    }
  
    //remove book element
    button.parentNode.parentNode.remove();
  
    // add placeholder if display is left empty
    if (!bookDiv.firstChild) addPlaceholderDisplay();
  }

  updateStatus() {
    document.getElementById(
      "totalBooks"
    ).textContent = `Total books: ${display.bookArray.length}`;
    document.getElementById("read").textContent = `Read: ${this.readCount}`;
    document.getElementById("unread").textContent = `Unread: ${this.unreadCount}`;
  }

  addPlaceholderDisplay() {
    const text = document.createElement("h1");
    text.textContent = "No books added!";
    this.bookDiv.appendChild(text);
  }
}

// function removeElement(event) {
//   const button = event.currentTarget;

//   //locate book to be removed by its id
//   let removeId = event.target.parentNode.parentNode.dataset.id;
//   for (book in bookArray) {
//     if (bookArray[book].id == removeId) {
//       // update book count on delete
//       if (bookArray[book].read) {
//         readCount--;
//       } else {
//         unreadCount--;
//       }

//       bookArray.splice(book, 1);
//       updateStatus();
//       break;
//     }
//   }

//   //remove book element
//   button.parentNode.parentNode.remove();

//   // add placeholder if display is left empty
//   if (!bookDiv.firstChild) addPlaceholderDisplay();
// }

// function updateRead(event) {
//   const button = event.currentTarget;

//   //locate book by id
//   let updateId = event.target.parentNode.parentNode.dataset.id;
//   for (book of bookArray) {
//     if (book.id == updateId) {
//       book.updateReadStatus();
      
//       //update book count
//       if (book.read) {
//         button.textContent = "Read";
//         readCount++;
//         unreadCount--;
//         break;
//       } else {
//         button.textContent = "Not read";
//         unreadCount++;
//         readCount--;
//         break;
//       }    
//     }
//   }

//   updateStatus();
// }

// function addPlaceholderDisplay() {
//   const text = document.createElement("h1");
//   text.textContent = "No books added!";
//   bookDiv.appendChild(text);
// }

// const bookArray = [];
// const bookDiv = document.getElementById("books");
const dialog = document.querySelector("dialog");
const openDialog = document.getElementById("addBtn");
const closeDialog = document.getElementById("closeDialog");
const submitBook = document.getElementById("submitBook");
const form = document.querySelector("form");

// let readCount = 0;
// let unreadCount = 0;

const display = new Display();

submitBook.addEventListener("click", (event) => {
  event.preventDefault();

  //prevent form send if it has errors
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;

  let read = false;
  if (document.getElementById("readCheck").checked) {
    read = true;
    console.log("a");
  }

  Book.addBookToLibrary(title, author, pages, read);
  display.addBooksToDisplay();
  display.updateStatus();

  form.reset();
});

openDialog.addEventListener("click", () => {
  dialog.showModal();
});

closeDialog.addEventListener("click", () => {
  dialog.close();
});
