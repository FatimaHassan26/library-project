 const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read.toLowerCase() === 'yes'; 
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`};
}

Book.prototype.toggleReadStatus = function() {
    this.read = !this.read;
};

function addBookToLibrary() {
    let title = document.getElementById('book_title').value;
    let author = document.getElementById('book_author').value;
    let pages = document.getElementById('num_pages').value;
    let read = document.getElementById('read').value;

    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBooks();
}

function displayBooks() {
    const bookList = document.getElementById('book-cards');

    bookList.innerHTML = '';

    for (let i = 0; i < myLibrary.length; i++) {
        const book = myLibrary[i];
        const card = document.createElement('div');
        card.classList.add('book-card');
        card.innerHTML = `
            <h2>${book.title}</h2>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Number of pages:</strong> ${book.pages}</p>
            <p><strong> Read:</strong> ${book.read}</p>
            <button class="toggle-read-btn" data-index="${i}">Read Status</button>
            <button class="remove-book-btn" data-index="${i}">Remove</button>
            
        `;
        bookList.appendChild(card);
        const removeBookBtn = card.querySelector('.remove-book-btn');
        removeBookBtn.addEventListener('click', () => {
            myLibrary.splice(i, 1);
            displayBooks();
        });
        const toggleReadBtn = card.querySelector('.toggle-read-btn');
        toggleReadBtn.addEventListener('click', () => {
            book.toggleReadStatus();
            displayBooks(); // Re-render the books to reflect the status change
        });
    };

}

const addBook = document.getElementById("addBook");
const submitBtn = document.getElementById("submitButton");
const newBookDialog = document.getElementById("newBookDialog");

addBook.addEventListener("click", () => {
    newBookDialog.showModal();
})

submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    addBookToLibrary();
    newBookDialog.close();
})
