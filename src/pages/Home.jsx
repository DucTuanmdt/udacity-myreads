import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import BookShelf from "../components/BookShelf";

const SHELF = {
  currentlyReading: "currentlyReading",
  wantToRead: "wantToRead",
  read: "read",
  none: "none",
};

const bookShelfList = [
  {
    title: "Currently Reading",
    shelf: SHELF.currentlyReading,
  },
  {
    title: "Want to Read",
    shelf: SHELF.wantToRead,
  },
  {
    title: "Read",
    shelf: SHELF.read,
  },
];

function Home({ bookList, onChangeShelf = () => {} }) {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {bookList?.length > 0 &&
            bookShelfList.map((bookShelf) => (
              <BookShelf
                key={bookShelf.shelf}
                title={bookShelf.title}
                shelf={bookShelf.shelf}
                items={bookList}
                onChangeShelf={onChangeShelf}
              />
            ))}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
}

Home.propTypes = {
  bookList: PropTypes.array.isRequired,
  onChangeShelf: PropTypes.func.isRequired,
};

export default Home;
