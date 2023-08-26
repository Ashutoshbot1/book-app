// script.js
const searchInput = document.getElementById('searchInput');
const bookList = document.getElementById('bookList');
const bookDetails = document.getElementById('bookDetails');

async function fetchBooks(query) {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
    const data = await response.json();
    return data.items;
}

function displayBookList(books) {
    bookList.innerHTML = '';

    books.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.textContent = book.volumeInfo.title;
        
        bookCard.addEventListener('click', () => {
            displayBookDetails(book);
        });

        bookList.appendChild(bookCard);
    });
}

function displayBookDetails(book) {
    bookDetails.innerHTML = `
        <h2>${book.volumeInfo.title}</h2>
        <p>${book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author'}</p>
        <p>${book.volumeInfo.description ? book.volumeInfo.description : 'No description available.'}</p>
    `;
}

searchInput.addEventListener('keyup', async (event) => {
    const query = event.target.value;
    if (query.length >= 3) {
        const books = await fetchBooks(query);
        displayBookList(books);
    }
});

// Initial fetch and display
fetchBooks('harry potter')
    .then(books => displayBookList(books))
    .catch(error => console.error(error));
