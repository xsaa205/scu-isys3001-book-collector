// Import storage.js functions (modular call as required by sample planning "Code Structure")
import { saveBooks, getBooks, deleteBookById } from './storage.js';

// 1. Add Book (with form validation)
export function addBook() {
    const title = document.getElementById('bookTitle').value.trim();
    const author = document.getElementById('bookAuthor').value.trim();
    const isbn = document.getElementById('bookIsbn').value.trim();
    const status = document.getElementById('bookStatus').value;

    // Validate required fields (required by assignment "Functional Completeness")
    if (!title) { alert('Book Title is required!'); return; }
    if (!author) { alert('Author is required!'); return; }

    // Prepare new book data
    const books = getBooks();
    const newBook = {
        id: Date.now(), // Timestamp as unique ID (non-repeating)
        title: title,
        author: author,
        isbn: isbn || 'Not Provided',
        status: status,
        collectDate: new Date().toLocaleDateString() // Auto-generate collection date
    };

    // Save and refresh list
    books.push(newBook);
    saveBooks(books);
    renderBookList();
    clearAddForm();
}

// 2. Search Books (Extended feature, assignment "Bonus Points")
export function searchBooks() {
    const keyword = document.getElementById('searchInput').value.trim().toLowerCase();
    const allBooks = getBooks();
    const filteredBooks = keyword 
        ? allBooks.filter(book => book.title.toLowerCase().includes(keyword)) 
        : allBooks;

    renderBookList(filteredBooks);
    // Display search result count
    const listTitle = document.querySelector('.text-xl.font-semibold');
    listTitle.textContent = keyword ? `Search Results (${filteredBooks.length})` : 'My Books';
}

// 3. Render Book List (supports search results)
export function renderBookList(customBooks) {
    const bookListEl = document.getElementById('bookList');
    const books = customBooks || getBooks();

    if (books.length === 0) {
        bookListEl.innerHTML = '<div class="p-3 text-center text-gray-500 border rounded">No books yet. Add a book to start!</div>';
        return;
    }

    // Generate book cards in loop
    bookListEl.innerHTML = books.map(book => `
        <div class="p-3 border rounded hover:shadow-md transition-shadow">
            <div class="flex justify-between items-start">
                <h3 class="font-semibold text-lg text-blue-600">${book.title}</h3>
                <button onclick="deleteBook(${book.id})" class="text-red-500 hover:text-red-700">Delete</button>
            </div>
            <p class="text-sm text-gray-600 mt-1">Author: ${book.author}</p>
            <p class="text-sm text-gray-600">ISBN: ${book.isbn}</p>
            <div class="flex justify-between text-sm text-gray-500 mt-2">
                <span>Collected: ${book.collectDate}</span>
                <span>Status: ${getStatusText(book.status)}</span>
            </div>
        </div>
    `).join('');
}

// Helper function: Convert status code to display text (optional, improves UX)
function getStatusText(status) {
    const statusMap = { unread: 'Unread', reading: 'Reading', read: 'Read' };
    return statusMap[status] || 'Uncategorized';
}

// Helper function: Clear form
function clearAddForm() {
    document.getElementById('bookTitle').value = '';
    document.getElementById('bookAuthor').value = '';
    document.getElementById('bookIsbn').value = '';
    document.getElementById('bookStatus').value = 'unread';
}

// Expose functions to global scope for HTML button calls (required, otherwise onclick won't work)
window.deleteBook = function(id) {
    if (confirm('Are you sure to delete this book?')) { // Secondary confirmation
        deleteBookById(id);
        renderBookList();
    }
};
window.addBook = addBook;
window.searchBooks = searchBooks;