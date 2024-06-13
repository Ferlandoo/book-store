import { useParams, useNavigate } from "react-router-dom";
import { useGetListsQuery } from "../slices/BooksSlices";
import { FallingLines } from "react-loader-spinner";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import BookCarousel from "../components/BookCarousel";
import { addToCart } from "../slices/cartSlices"

const BookPage = () => {
  const { id: bookId } = useParams();
  const { data: lists, isError, isLoading } = useGetListsQuery();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Filter book by isbn
  let bookByIsbn;
  if (lists) {
    lists.some(list => {
      bookByIsbn = list.books.find(book => book.primary_isbn10 === bookId);
      return bookByIsbn;
    });
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...bookByIsbn, qty: 1 }));
    toast.success('Book added to cart.');
    navigate('/cart');
  };

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center w-screen h-52">
          <FallingLines color='#DC524B' />
        </div>
      ) : isError ? (
        toast.error('An error occurred. Please try again later.')
      ) : (
        <div className="flex items-center justify-center flex-col">
          <div className="w-screen sm:max-w-screen-xl sm:flex sm:py-12 bg-white item-center">
            <div className="w-screen sm:w-2/6 flex justify-end mb-4 p-4 sm:p-0 sm:mb-0">
              <img src={bookByIsbn.book_image} alt={bookByIsbn.title} className="rounded-lg w-full h-full object-cover" />
            </div>
            <div className="sm:w-3/6 sm:px-8 px-4 sm:p-0">
              <h2 className="text-2xl font-bold mb-2">{bookByIsbn.title}</h2>
              <p className="text-gray-700 font-bold mb-2">{bookByIsbn.author}</p>
              <p className="text-gray-500 mb-4">{bookByIsbn.publisher}</p>
              <p className="mb-4">{bookByIsbn.description}</p>
              <p className="text-lg font-bold italic">Price: {bookByIsbn.price}</p>
              <div className="justify-between items-center my-4">
                <p className="text-sm text-gray-600 italic">Buy Links:</p>
                {bookByIsbn.buy_links && bookByIsbn.buy_links.length > 0 ? (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {bookByIsbn.buy_links.map((link, index) => (
                      <a key={index} href={link.url} target="_blank" rel="noreferrer" className="text-sm text-white bg-red-500 text-center py-1 px-2 font-semibold line-clamp-1">{link.name}</a>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-white bg-red-500 rounded-lg py-1 px-2 w-fit my-2">Please check back later for buying options.</p>
                )}
              </div>
              <p className="text-sm text-gray-500">ISBN-10: {bookByIsbn.primary_isbn10}</p>
              <p className="text-sm text-gray-500">ISBN-13: {bookByIsbn.primary_isbn13}</p>
              <p className="text-sm text-gray-500">Rank: {bookByIsbn.rank}</p>
              <p className="text-sm text-gray-500">Last Week's Rank: {bookByIsbn.rank_last_week}</p>
              <button className="bg-red-500 text-white text-lg py-2 px-4 mt-4 font-bold" onClick={addToCartHandler}>Add To cart</button>
            </div>
            <aside className="flex items-center justify-center w-full sm:w-1/6 text-white p-4 bg-[#2F4F95] my-4 sm:my-0 sm:rounded-lg">
              <div className='sm:transform sm:-rotate-90 origin-center flex flex-col items-center text-white'>
                <h2 className="text-xl sm:text-5xl font-bold w-max italic">Refer to a friend...</h2>
                <p className='text-base w-fit text-center sm:text-xl sm:w-max'>Get 100 credits for every friend that get registered.</p>
              </div>
            </aside>
          </div>
          <div className="w-screen sm:max-w-screen-xl mb-6">
            <h1 className='pb-3 text-2xl font-bold text-left'>Other Books</h1>
            <BookCarousel />
          </div>
        </div >
      )}
    </>
  )
}

export default BookPage
