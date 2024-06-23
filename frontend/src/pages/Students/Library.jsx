import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import { FiSearch } from 'react-icons/fi';
import { ImSpinner2 } from 'react-icons/im';

const LibrarySection = () => {
  const [books, setBooks] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [query, setQuery] = useState('programming');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    fetchBooks();
  }, [query]);

  const fetchBooks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
        params: {
          q: query,
        },
      });
      setBooks(response.data.items);
    } catch (error) {
      setError('Error fetching books. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleReadBook = (webReaderLink) => {
    window.open(webReaderLink, '_blank');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBooks();
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 p-8 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-20'}`}>
        <h1 className="text-2xl font-semibold mb-5">Library</h1>
        <form onSubmit={handleSearch} className="mb-5 flex items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for books..."
            className="p-2 border rounded-l-md w-full"
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 flex items-center"
          >
            <FiSearch size={20} />
          </button>
        </form>
        {loading ? (
          <div className="flex justify-center items-center">
            <ImSpinner2 className="animate-spin text-blue-500" size={50} />
          </div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <ul className="list-none p-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.map((book) => (
              <li key={book.id} className="bg-white p-5 rounded-lg shadow-md">
                <div className="font-bold text-lg">{book.volumeInfo.title}</div>
                <p className="text-gray-700">Author: {book.volumeInfo.authors?.join(', ')}</p>
                {book.accessInfo.epub.isAvailable ? (
                  <button
                    onClick={() => handleReadBook(book.accessInfo.webReaderLink)}
                    className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Read Ebook
                  </button>
                ) : (
                  <p className="mt-2 text-red-500">Ebook not available</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default LibrarySection;
