import React from "react";
import PropTypes from "prop-types";

function BookCard({
  id,
  title,
  authors,
  imageLinks,
  shelf,
  onChangeShelf = () => {},
}) {
  const shelfValue = shelf || "none";
  const hasImage = !!imageLinks?.thumbnail;

  const handleChangeShelf = (event) => {
    onChangeShelf({
      id,
      shelf: event.target.value,
      title,
      authors,
      imageLinks,
    });
  };

  return (
    <div className="book">
      <div className="book-top">
        {hasImage && (
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${imageLinks.thumbnail}")`,
            }}
          ></div>
        )}
        <div className="book-shelf-changer">
          <select value={shelfValue} onChange={handleChangeShelf}>
            <option disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      {authors?.length > 0 && (
        <div className="book-authors">{authors.join(", ")}</div>
      )}
    </div>
  );
}

BookCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  authors: PropTypes.arrayOf(PropTypes.string),
  imageLinks: PropTypes.shape({
    thumbnail: PropTypes.string,
  }),
  shelf: PropTypes.string.isRequired,
  onChangeShelf: PropTypes.func.isRequired,
};

export default BookCard;
