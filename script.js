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
