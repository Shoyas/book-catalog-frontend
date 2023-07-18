/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Link } from "react-router-dom";

const Card = (props: any) => {
  const book = props.book;
  // console.log(item);
  const { id, title, author, genre, publication_date } = book;
  // console.log("Book card: ",id);

  return (
    <>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="p-5">
          <Link to="#">
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {title}
            </h2>
          </Link>
        </div>

        <div className="p-5">
          <h4 className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Author: {author}
          </h4>
          <h6 className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Genre: {genre}
          </h6>
          <h6 className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Publication Year: {publication_date}
          </h6>

          <Link
            to={`/book-details/${id}`}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Read more
            <svg
              className="w-3.5 h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Card;
