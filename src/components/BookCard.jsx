import React from "react";

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
            <option value="none" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            {shelfValue !== "none" && <option value="none">None</option>}
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

export default BookCard;
