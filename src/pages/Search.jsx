import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import BookCard from "../components/BookCard";
import { search } from "../BooksAPI";
import debounce from "../utils/debounce";

const DEBOUNCE_TIME = 400; // 400ms

function Search({ bookShelfMap = {}, onChangeShelf = () => {} }) {
  const [bookList, setBookList] = useState([]);
  const [keyword, setKeyword] = useState("");

  const handleSearchBook = async (keyword) => {
    try {
      const query = keyword.trim();
      const books = await search(query, 20);

      if (books.length > 0) {
        setBookList(books);
      } else {
        setBookList([]);
      }
    } catch (err) {
      setBookList([]);
      console.log("Can not search book");
    }
  };

  const debounceSearch = useMemo(
    () => debounce(handleSearchBook, DEBOUNCE_TIME),
    []
  );

  const handleChangeKeyword = (event) => {
    setKeyword(event.target.value);
    debounceSearch(event.target.value);
  };

  // add shelf
  const formatedSearchList = bookList.map((item) => ({
    ...item,
    shelf: bookShelfMap[item.id]?.shelf || "none",
  }));

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={keyword}
            onChange={handleChangeKeyword}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {formatedSearchList?.length > 0 &&
            formatedSearchList.map((book) => (
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
      </div>
    </div>
  );
}

Search.propTypes = {
  bookShelfMap: PropTypes.object.isRequired,
  onChangeShelf: PropTypes.func.isRequired,
};

export default Search;
