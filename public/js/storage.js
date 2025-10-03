// Store books in LocalStorage (data persists after closing the webpage)
export function saveBooks(books) {
    localStorage.setItem('scu_isys3001_books', JSON.stringify(books)); // Add project prefix to key name to avoid conflicts
}

// Retrieve books from LocalStorage
export function getBooks() {
    const booksStr = localStorage.getItem('scu_isys3001_books');
    return booksStr ? JSON.parse(booksStr) : []; // Return empty array if no data exists
}

// Delete book by ID
export function deleteBookById(id) {
    const books = getBooks();
    const filteredBooks = books.filter(book => book.id !== id);
    saveBooks(filteredBooks);
    return filteredBooks;
}