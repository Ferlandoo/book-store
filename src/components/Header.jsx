import { Link, useNavigate } from "react-router-dom";
import { FaCartShopping, FaUser, FaLocationDot, FaPhoneVolume, FaAlignJustify } from "react-icons/fa6";
import { useSelector } from "react-redux";
import logo from "../assets/images/logo.svg";
import logoOnly from "../assets/images/logo-only.svg";
import { useGetListsQuery } from "../slices/BooksSlices";
import { useState } from "react";

const Header = () => {
  const { data: lists } = useGetListsQuery();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useSelector(state => state.cart);
  const navigate = useNavigate();

  const onSearch = (e) => {
    const query = e.target.value.toUpperCase();
    setSearchQuery(query);

    const books = lists.map(list => list.books).flat().filter(book => book.title.toUpperCase().startsWith(query));

    const uniqueBooks = [];
    const isbnSet = new Set();
    for (const book of books) {
      if (!isbnSet.has(book.primary_isbn10)) {
        isbnSet.add(book.primary_isbn10);
        uniqueBooks.push(book);
      }
    }
    setFilteredBooks(uniqueBooks);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleBookClick = (isbn) => {
    setSearchQuery("");
    setFilteredBooks([]);
    navigate(`/book/${isbn}`);
  };

  return (
    <header className="bg-red-500 text-white border-b-2 border-gray-100">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="flex items-center w-1/5">
          <img src={logo} alt="Book Store Logo" className="w-40 hidden sm:block" />
          <img src={logoOnly} alt="Book Store Logo Only" className="w-10 sm:hidden" />

        </Link>
        <div className="flex items-center w-2/5 justify-center">
          <div className="text-black outline-none focus:outline-none w-full">
            <form className="relative flex">
              <input
                type="search"
                name="search"
                placeholder="Search for a book..."
                value={searchQuery}
                onChange={onSearch}
                className="bg-white h-10 flex px-5 w-full rounded-full text-sm focus:outline-none border-2 border-l-0 border-white"
                autoComplete="off"
                spellCheck="false"
                required
                step="any"
                autoCapitalize="none"
                autoFocus />
              {searchQuery && (
                <ul className="absolute bg-white border border-gray-200 mt-12 sm:w-full max-h-60 overflow-y-auto rounded-md shadow-lg z-10">
                  {filteredBooks.length > 0 ? (
                    filteredBooks.map((book, index) => (
                      <li
                        key={index}
                        className="px-4 py-2 hover:bg-gray-200 flex items-center cursor-pointer"
                        onClick={() => handleBookClick(book.primary_isbn10)}
                      >
                        <img src={book.book_image} alt={book.title} className="w-10 h-10 mr-4 object-cover" />
                        <div className="flex flex-col">
                          <span>{book.title}</span>
                          <span className="text-gray-500 text-xs italic">by {book.author}</span>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-2 text-gray-500">No books found</li>
                  )}
                </ul>
              )}
            </form>
          </div>
        </div>
        <div className="flex items-center justify-end w-1/5">
          <a href="/" className="hover:bg-white hover:text-red-500 hover:rounded-full p-2 mr-2 hidden sm:block">
            <FaUser />
          </a>
          <a href="/cart" className="flex items-center flex-row hover:bg-white hover:text-red-500 hover:rounded-full p-2">
            <FaCartShopping />
            {cartItems.length > 0 && (
              <span className="bg-white text-red-500 rounded-full text-xs px-[6px] py-[2px] ml-1">{cartItems.length}</span>
            )}
          </a>
          <button onClick={toggleMenu} className="sm:hidden hover:bg-white p-2 hover:text-red-500 rounded-full">
            <FaAlignJustify />
          </button>
          {isMenuOpen && (
            <nav className="absolute top-16 right-0 w-fit bg-white text-black text-lg z-10 flex flex-col text-center">
              <a href="/" className="hover:bg-red-500 hover:text-white py-2 px-8">Home</a>
              <a href="/" className="hover:bg-red-500 hover:text-white py-2 px-8">Shop</a>
              <a href="/" className="hover:bg-red-500 hover:text-white py-2 px-8">Pages</a>
              <a href="/" className="hover:bg-red-500 hover:text-white py-2 px-8">Blog</a>
              <a href="/" className="hover:bg-red-500 hover:text-white py-2 px-8">Contact</a>
            </nav>
          )}
        </div>
      </div>
      <div className="bg-white text-black p-2 hidden sm:block">
        <div className="container mx-auto flex justify-between items-center px-2">
          <div className="flex items-center justify-start w-1/5">
            <FaLocationDot />
            <a href="/" className="ml-2 hover:underline font-semibold hover:text-red-500">Find a Book Store</a>
          </div>
          <nav className="flex items-center justify-center space-x-8 w-3/5 font-semibold">
            <a href="/" className="hover:text-red-500">Home</a>
            <a href="/" className="hover:text-red-500">Shop</a>
            <a href="/" className="hover:text-red-500">Pages</a>
            <a href="/" className="hover:text-red-500">Blog</a>
            <a href="/" className="hover:text-red-500">Contact</a>
          </nav>
          <div className="flex items-center justify-end w-1/5">
            <FaPhoneVolume />
            <a href="tel:#" className="ml-2 hover:underline font-semibold hover:text-red-500">+355 69 27 66 725</a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
