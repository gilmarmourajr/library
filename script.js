function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.id = crypto.randomUUID();
    this.read  = false;
}

function addBookToLibrary(title, author, pages) {
    book = new Book(title, author, pages);
    bookArray.push(book);
}

function addBooksToDisplay() {
    clearDisplay();
    
    for (let book of bookArray) {
        const newDiv = document.createElement("div");
        newDiv.classList.add("book");

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
        statusBtn.textContent = "Not read";
        const editBtn = document.createElement("button");
        editBtn.classList.add("btn");
        editBtn.textContent = "Edit";
        const delBtn = document.createElement("button");
        delBtn.classList.add("btn");
        delBtn.textContent = "Delete";
        btnDiv.append(statusBtn, editBtn, delBtn);

        newDiv.append(dataDiv, btnDiv);
        bookDiv.appendChild(newDiv);
    }
}

function clearDisplay() {
    bookDiv.textContent = '';
}

const bookArray = [];
const bookDiv = document.getElementById("books");
// addBookToLibrary("Hobbit", "Tolkien", "295");
// addBookToLibrary("Bible", "God", "A lot");
// addBooksToDisplay();