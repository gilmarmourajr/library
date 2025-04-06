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

const bookArray = [];

addBookToLibrary("Hobbit", "Tolkien", "295");
addBookToLibrary("Bible", "God", "A lot");
console.log(bookArray[0]);
console.log(bookArray[1]);