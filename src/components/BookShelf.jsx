import React from "react";
import BookCard from "./BookCard";

function BookShelf({ title, items, shelf, onChangeShelf = () => {} }) {
  const renderBookList = () => {
    const bookList = items.filter((book) => book.shelf === shelf);
    if (bookList.length > 0) {
      return (
        <ol className="books-grid">
          {bookList.map((book) => (
            <li key={book.id}>
              <BookCard
                id={book.id}
                title={book.title}
                authors={book.authors}
                imageLinks={book.imageLinks}
                shelf={book.shelf}
                onChangeShelf={onChangeShelf}
              />
            </li>
          ))}
        </ol>
      );
    }

    return null;
  };
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">{renderBookList()}</div>
    </div>
  );
}

export default BookShelf;
