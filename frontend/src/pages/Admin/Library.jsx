import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';

const Library = () => {
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

  const addBook = async (book) => {
    try {
      const response = await axios.post('http://localhost:4000/api/v1/library', {
        bookname: book.title,
        author: book.author,
      });
      setBooks([...books, response.data]);
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const handleBookPick = async (bookId, studentId) => {
    // Implement logic to record when a student picks a book
  };

  const handleBookReturn = async (bookId, studentId) => {
    // Implement logic to mark when a student returns a book
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-5 ml-64">
        <h1 className="text-2xl mb-5">Library Management</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const book = {
              id: Math.random().toString(36).substr(2, 9),
              title: e.target.title.value,
              author: e.target.author.value,
            };
            addBook(book);
            e.target.reset();
          }}
          className="mb-5"
        >
          <h2 className="text-lg mb-2">Add New Book</h2>
          <div className="mb-3">
            <label htmlFor="title" className="block mb-1">
              Title:
              <input
                type="text"
                id="title"
                required
                className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </label>
          </div>
          <div className="mb-3">
            <label htmlFor="author" className="block mb-1">
              Author:
              <input
                type="text"
                id="author"
                required
                className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </label>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          >
            Add Book
          </button>
        </form>
        <h2 className="text-lg mb-3">Books</h2>
        <ul className="divide-y divide-gray-200">
          {books.map((book) => (
            <li key={book._id} className="py-2 flex items-center justify-between">
              <div>
                <span className="font-bold">{book.bookname}</span>
                <span className="ml-2">by {book.author}</span>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleBookPick(book._id, 'student123')}
                  className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded-md focus:outline-none focus:ring focus:ring-green-200 focus:ring-opacity-50"
                >
                  Pick
                </button>
                <button
                  onClick={() => handleBookReturn(book._id, 'student123')}
                  className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50"
                >
                  Return
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Library;
