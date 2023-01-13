import Store from './store.js';
// UI for UI tasks
export default class UI {
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