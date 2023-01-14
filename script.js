/* eslint-disable max-classes-per-file */

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

// handle storage
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removBook(title) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if (book.title === title) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// UI for UI tasks
class UI {
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => UI.addBook(book));
  }

  static addBook(book) {
    const list = document.querySelector('.table-body');

    const row = document.createElement('tr');

    row.innerHTML = `
              <td>${book.title}</td>
              <td>${book.author}</td>
              <td><a href="#" class="remove-btn">Remove</a></td>
          `;

    list.appendChild(row);
  }

  static deleteBook(el) {
    if (el.classList.contains('remove-btn')) {
      el.parentElement.parentElement.remove();
    }
  }

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
  }
}

// display books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// add a book
document.querySelector('.book-form').addEventListener('submit', (e) => {
  // prevent actual submit
  e.preventDefault();

  // gt the values of form
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;

  // instatiate book
  const book = new Book(title, author);

  // add book to the UI
  UI.addBook(book);

  // add book to store
  Store.addBook(book);

  // clear field
  UI.clearFields();
});

// remove book
document.querySelector('.table-body').addEventListener('click', (e) => {
  // remove book from UI
  UI.deleteBook(e.target);

  // remove book from store
  Store.removBook(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
});

// navigation
/* eslint-disable max-classes-per-file */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
/* eslint-disable no-alert */

const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const btnInput = document.getElementById('submit-btn');
const addedBooks = document.getElementById('added-book');

// Book class: represents a book
class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
    }
}
// store class: handles storage
class Store {
   static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

   static removeBook(author) {
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if (book.author === author) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}
// UI class: handle UI tasks

class UI {
    static displayBooks() {
        const storedBook = Store.getBooks();

        const books = storedBook;

        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#added-book');

        const row = document.createElement('tr');

        row.innerHTML = `
           <div class="book-container">
                <div class="book">
                    "${book.title}" by
                    ${book.author}
                </div>
                    <div class="delete-btn">
                    <a href="#" class="delete">remove</a>
                    </div>
            </div>`;
        list.appendChild(row);
    }

    static deleteBook(el) {
    if (el.classList.contains('delete')) {
        el.parentElement.parentElement.parentElement.remove();
    }
}

    static clearFields() {
    titleInput.value = '';
    authorInput.value = '';
    }

    static displayList() {
        const list = document.querySelector('#added-book');
        list.style.display = 'flex';
    }
}

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a Book
btnInput.addEventListener('click', (e) => {
    // Prevent actual submit
    e.preventDefault();

    // Get form values
    const title = titleInput.value;
    const author = authorInput.value;

    // Validate
    if (title === '' || author === '') {
        alert('Please fill in all fields');
    } else {
        // Instatiate book
        const book = new Book(title, author);
        // Add Book to store
        Store.addBook(book);
        // Add Book to UI
        UI.addBookToList(book);
        // clear fields
        UI.clearFields();
    }
});

// Event: Remove a Book
addedBooks.addEventListener('click', (e) => {
    e.preventDefault();

    // Remove book from UI
    UI.deleteBook(e.target);

     // Remove book from store
     Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
});

// Add date
const generateId = () => Date.now().toString(36) + Math.random().toString(36).substring(2);
document.getElementById('date').innerText = new Date();

//  single page
const book = document.getElementById('book');
const addBook = document.getElementById('addbook');
const contact = document.getElementById('contacts');

// addbook
addBook.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('added-book').style.display = 'none';
    document.getElementById('book-form').style.display = 'flex';
    document.getElementById('contact').style.display = 'none';
    document.querySelector('.booksawe').style.display = 'none';
    document.querySelector('.newbook').style.display = 'flex';
    addBook.classList.add('active');
    book.classList.remove('active');
    contact.classList.remove('active');
});
// show Book
book.addEventListener('click', (e) => {
    e.preventDefault();

    document.getElementById('added-book').style.display = 'flex';
    document.getElementById('book-form').style.display = 'none';
    document.getElementById('contact').style.display = 'none';
    document.querySelector('.booksawe').style.display = 'flex';
    document.querySelector('.newbook').style.display = 'none';
    book.classList.add('active');
    addBook.classList.remove('active');
    contact.classList.remove('active');
});

// Contact 170
contact.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('added-book').style.display = 'none';
    document.getElementById('book-form').style.display = 'none';
    document.getElementById('contact').style.display = 'flex';
    document.querySelector('.booksawe').style.display = 'none';
    document.querySelector('.newbook').style.display = 'none';
    contact.classList.add('active');
    book.classList.remove('active');
    addBook.classList.remove('active');
});


Dieum Akonkwa
  9:24 AM
const logo = document.querySelector('.logo');
const list = document.querySelector('.list-one');
const add = document.querySelector('.list-two');
const contact = document.querySelector('.list-three');
const showBooks = document.querySelector('.books');
const forms = document.querySelector('.forms');
const contactShow = document.querySelector('.contact');
logo.addEventListener('click', () => {
  showBooks.classList.remove('active');
  forms.classList.remove('active');
  contactShow.classList.remove('active');
});
list.addEventListener('click', () => {
  showBooks.classList.remove('active');
  forms.classList.remove('active');
  contactShow.classList.remove('active');
});
add.addEventListener('click', () => {
  showBooks.classList.add('active');
  forms.classList.add('active');
  contactShow.classList.remove('active');
});
contact.addEventListener('click', () => {
  showBooks.classList.add('active');
  forms.classList.remove('active');
  contactShow.classList.add('active');
});