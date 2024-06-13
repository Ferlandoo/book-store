import { useGetListsQuery } from '../slices/BooksSlices';
import { FallingLines } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import HomeSlider from '../components/HomeSlider';
import AboutIcons from '../components/AboutIcons';
import { useState } from 'react';
import { toast } from 'react-toastify';

const BookList = () => {
  const { data: lists, isError, isLoading } = useGetListsQuery();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const listsPerPage = 2;

  const indexOfLastList = currentPage * listsPerPage;
  const indexOfFirstList = indexOfLastList - listsPerPage;
  const currentLists = lists ? lists.slice(indexOfFirstList, indexOfLastList) : [];

  const totalPages = lists ? Math.ceil(lists.length / listsPerPage) : 1;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <HomeSlider />
      <AboutIcons />
      {isLoading ? (
        <div className="flex items-center justify-center w-screen h-52">
          <FallingLines color='#DC524B' />
        </div>
      ) : isError ? (
        toast.error('An error occurred. Please try again later.')
      ) : (
        <div className="flex font-poppins flex-col sm:flex-row sm:min-h-screen border-b-2">
          <aside className="flex items-center justify-center w-full sm:w-1/6 text-white p-4 bg-[#298553]">
            <div className='sm:transform sm:-rotate-90 flex flex-col items-center'>
              <h2 className="text-xl sm:text-5xl font-bold w-max italic">Get 10% Off Your Order!</h2>
              <p className='text-base w-fit text-center sm:text-xl sm:w-max'>Create an account and get discount for your first order.</p>
            </div>
          </aside>

          <div className="bg-white w-full lg:w-4/6 flex flex-col sm:border-x-2">
            <h1 className='text-white bg-red-500 py-3 text-2xl font-bold text-center'>Best Seller</h1>
            {currentLists.map((book, index) => (
              <div className="border-b-2 p-2" key={index}>
                <div className='flex justify-between items-center py-2'>
                  <div className=' bg-yellow-400 px-2 py-1 mr-4 rounded text-center'>{book.display_name}</div>
                  <div className='bg-green-200 px-2 py-1 ml-4 rounded text-center'>Updated: {book.updated}</div>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 sm:gap-3">
                  {book.books.map((innerBook, index) => (
                    <div key={index}>
                      <Link to={`/book/${innerBook.primary_isbn10}`}>
                        <img className='aspect-book object-cover rounded-lg w-full' src={innerBook.book_image} alt={innerBook.title} />
                        <div className="font-bold text-base text-center pt-1 line-clamp-1">{innerBook.title}</div>
                        <div className="text-sm text-center italic line-clamp-1">{innerBook.author}</div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between m-4">
              <div className='w-1/6'>
                {currentPage} of {totalPages}
              </div>
              <div className='w-5/6 text-right'>
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`sm:px-4 px-1 sm:py-2 mx-1 sm:border ${currentPage === index + 1 ? 'bg-red-500 text-white rounded-lg' : 'bg-white text-red-500 rounded-lg hover:bg-red-500 hover:text-white'}`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <aside className="flex items-center justify-center w-full sm:w-1/6 text-white p-4 bg-[#2F4F95]">
            <div className='sm:transform sm:-rotate-90 origin-center flex flex-col items-center text-white'>
              <h2 className="text-xl sm:text-5xl font-bold w-max italic">Refer to a friend...</h2>
              <p className='text-base w-fit text-center sm:text-xl sm:w-max'>Get 100 credits for every friend that get registered.</p>
            </div>
          </aside>
        </div>
      )}
      <div className="py-6 sm:py-10 px-4">
        <div className="mx-auto flex flex-col items-center justify-between gap-6 sm:flex-row max-w-screen-xl">
          <div className="sm:w-7/12">
            <div className="text-2xl sm:text-3xl font-bold">
              Subscribe to our
              <span className="bg-gradient-to-br from-red-500 to-red-400 bg-clip-text italic text-transparent"> OFFERS!</span>
            </div>
            <p className="mt-3 text-gray-800">
              Subscribe to receive exclusive offers, updates on new arrivals, and a curated monthly newsletter. Dive into the pages—your next favorite read awaits.
            </p>
          </div>
          <div className="w-full sm:w-5/12">
            <form
              className="flex rounded-full border-2 px-4 py-2 focus-within:ring-2 focus-within:ring-red-600 hover:ring-2 hover:ring-red-600">
              <input className="w-full appearance-none focus:outline-none" placeholder='Enter your email...' />
              <button className="ml-2 shrink-0 text-white rounded-full bg-gradient-to-br from-red-500 to-red-400 px-3 py-1 text-sm font-medium hover:from-red-700 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/50" type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookList;
