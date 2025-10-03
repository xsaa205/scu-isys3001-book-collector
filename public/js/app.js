// Import functions from book.js (modular approach as required by sample planning "Code Structure")
import { addBook, renderBookList, searchBooks } from './book.js';

// Automatically display book list when page loads
window.onload = function() {
    renderBookList();
    // Trigger search on Enter key press (UX optimization)
    document.getElementById('searchInput').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') searchBooks();
    });
};

// Re-expose functions (ensure stable HTML invocation)
window.addBook = addBook;
window.searchBooks = searchBooks;