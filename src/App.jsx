import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Search from "./pages/Search";
import { useEffect, useState } from "react";
import { getAll, update } from "./BooksAPI";

function App() {
  const [bookShelfMap, setBookShelfMap] = useState({});

  const getAllBooks = async () => {
    try {
      const books = await getAll();
      if (books.length > 0) {
        setBookShelfMap(books);
        const bookMap = books.reduce(
          (acc, curr) => ({ ...acc, [curr.id]: curr }),
          {}
        );
        setBookShelfMap(bookMap);
      }
    } catch (err) {
      console.error("Can not get book list");
    }
  };

  const handleChangeShelf = async (book) => {
    try {
      await update(book, book.shelf);
      setBookShelfMap((value) => ({
        ...value,
        [book.id]: book,
      }));
    } catch (err) {
      console.log("Can not update book");
    }
  };

  useEffect(() => {
    getAllBooks();
  }, []);

  const bookShelfList = Object.values(bookShelfMap);

  return (
    <div className="app">
      <Routes>
        <Route
          index
          element={
            <Home bookList={bookShelfList} onChangeShelf={handleChangeShelf} />
          }
        />
        <Route
          path="/search"
          element={
            <Search
              bookShelfMap={bookShelfMap}
              onChangeShelf={handleChangeShelf}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
