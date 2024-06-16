import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';

const LibrarySection = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/library/getall');
      setBooks(response.data.books);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleBorrowBook = (id) => {
    // Implement borrow book functionality here
    console.log(`Book with ID ${id} has been borrowed.`);
  };

  return (
    <div className="flex flex-col md:flex-row md:pl-[240px]">
      <div className="flex-shrink-0 w-full md:w-[250px]">
        <Sidebar />
      </div>
      <div className="flex-1 p-5">
        <h1 className="text-2xl mb-5">Library</h1>
        <ul className="list-none p-0">
          {books.map((book) => (
            <li key={book._id} className="mb-4">
              <div className="font-bold">{book.bookname}</div>
              <p>Author: {book.author}</p>
              <button
                onClick={() => handleBorrowBook(book._id)}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Borrow
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LibrarySection;
