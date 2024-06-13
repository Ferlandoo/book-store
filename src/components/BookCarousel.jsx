import { useGetListsQuery } from "../slices/BooksSlices"
import { Link } from "react-router-dom"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const BookCarousel = () => {
  const { data: lists } = useGetListsQuery()

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const allBooks = lists.reduce((book, list) => {
    let arrayWithAll = book.concat(list.books);
    return shuffle(arrayWithAll);
  }, []);

  return (
    <Carousel
      autoPlaySpeed={1000}
      customTransition="all .5"
      focusOnSelect={false}
      infinite
      renderButtonGroupOutside={true}
      responsive={{
        desktop: {
          breakpoint: {
            max: 3000,
            min: 1024,
          },
          items: 7,
          partialVisibilityGutter: 40,
        },
        mobile: {
          breakpoint: {
            max: 464,
            min: 0,
          },
          items: 2,
          partialVisibilityGutter: 30,
        },
        tablet: {
          breakpoint: {
            max: 1024,
            min: 464,
          },
          items: 4,
          partialVisibilityGutter: 30,
        },
      }}
    >
      {allBooks.map((book, index) => (
        <Link to={`/book/${book.primary_isbn10}`} key={index}>
          <div className="px-3 py-2">
            <img className='aspect-book object-cover rounded-lg w-full' src={book.book_image} alt={book.title} />
            <div className="font-bold text-base text-center pt-1 line-clamp-1">{book.title}</div>
            <div className="text-sm text-center italic line-clamp-1">{book.author}</div>
          </div>
        </Link>
      ))
      }
    </Carousel >
  )
}

export default BookCarousel
