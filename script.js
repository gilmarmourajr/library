function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.id = crypto.randomUUID();
    this.read  = false;
}

function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages);
    if(read) {
        book.read = true;
        readCount++;
    } else {
        unreadCount++;
    }
    bookArray.push(book);
}

function addBooksToDisplay() {
    clearDisplay();
    
    for (let book of bookArray) {
        const newDiv = document.createElement("div");
        newDiv.classList.add("book");
        newDiv.setAttribute("data-id", book.id);

        const dataDiv = document.createElement("div");
        const pTitle = document.createElement("p");
        pTitle.textContent = `Title: ${book.title}`
        const pAuthor = document.createElement("p");
        pAuthor.textContent = `Author: ${book.author}`;
        const pPages = document.createElement("p");
        pPages.textContent = `Pages: ${book.pages}`;
        dataDiv.append(pTitle, pAuthor, pPages);

        const btnDiv = document.createElement("div");

        btnDiv.classList.add("btns");
        const statusBtn = document.createElement("button");
        statusBtn.classList.add("btn", "status");
        if(book.read) {
            statusBtn.textContent = "Read";
        } else {
            statusBtn.textContent = "Not read";
        }

        const delBtn = document.createElement("button");
        delBtn.classList.add("btn", "delete");
        delBtn.textContent = "Delete";
        btnDiv.append(statusBtn, delBtn);

        newDiv.append(dataDiv, btnDiv);
        bookDiv.appendChild(newDiv);
    }
}

function clearDisplay() {
    bookDiv.textContent = '';
}

function updateStatus() {
    document.getElementById("totalBooks").textContent = `Total books: ${bookArray.length}`;
    document.getElementById("read").textContent = `Read: ${readCount}`
    document.getElementById("unread").textContent = `Unread: ${unreadCount}`
}

const bookArray = [];
const bookDiv = document.getElementById("books");
const dialog = document.querySelector("dialog");
const openDialog = document.getElementById("addBtn");
const closeDialog = document.getElementById("closeDialog");
const submitBook = document.getElementById("submitBook");
const form = document.querySelector("form");

let readCount = 0;
let unreadCount = 0;

submitBook.addEventListener("click", (event) => {
    event.preventDefault();
    
    if(!form.checkValidity()){
        form.reportValidity();
        return;
    }
    
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    
    let read = false;
    if(document.getElementById("readCheck").checked) {
        read = true;
        console.log("a")
    }
    
    addBookToLibrary(title, author, pages, read);
    addBooksToDisplay();
    updateStatus();

    form.reset();
})

openDialog.addEventListener("click", () => {
    dialog.showModal();
})

closeDialog.addEventListener("click", () => {
    dialog.close();
})