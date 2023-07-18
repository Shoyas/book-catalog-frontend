/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useForm, SubmitHandler } from "react-hook-form";

import toast, { Toaster } from "react-hot-toast";
import Navigation from "../Home/Navigation";

import { useParams } from "react-router-dom";
import {
  useSingleBookQuery,
  useUpdateBookMutation,
} from "../../redux/api/apiSlice";

export type InputUpdateBook = {
    title: string;
    author: string;
    genre: string;
    publication_date: string;
  };

const UpdateBook = () => {
  const { id } = useParams();
  console.log("UseParams: ", id);

  const { data: book, error } = useSingleBookQuery(id!);
  console.log("Data book details: ", book);
  console.log(error);

  const { register, handleSubmit } = useForm<InputUpdateBook>();
  const [updateBook, { isError, isSuccess }] = useUpdateBookMutation();
  console.log(isError);
  console.log(isSuccess);

  const onSubmitUpdateBook: SubmitHandler<InputUpdateBook> = async (data) => {
    try {
      console.log("Update handler", data);
      const options = {
        id: id!,
        data: data,
      };
      await updateBook(options);
      toast.success("Update book successfully!");
    } catch (error) {
      toast.error("Failed to update book.");
    }
  };
  return (
    <div>
      <Navigation />
      <Toaster position="bottom-right" reverseOrder={false} />
      <h1 className="text-3xl mt-3 font-bold mb-4 text-center">
        Update The Book
      </h1>
      <form
        className="container mx-auto mt-10 p-6"
        onClick={handleSubmit(onSubmitUpdateBook)}
      >
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              id="floating_book_title"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:border-blue-600 peer"
              placeholder=" "
              defaultValue={book?.data?.title}
              required
              {...register("title")}
            />
            <label
              htmlFor="floating_book_title"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Book Title
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              id="floating_author"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:border-blue-600 peer"
              placeholder=" "
              defaultValue={book?.data?.author}
              required
              {...register("author")}
            />
            <label
              htmlFor="floating_author"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Author
            </label>
          </div>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            id="floating_genre"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:border-blue-600 peer"
            placeholder=" "
            defaultValue={book?.data?.genre}
            required
            {...register("genre")}
          />
          <label
            htmlFor="floating_genre"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Genre
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            id="floating_publication_date"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:border-blue-600 peer"
            placeholder=" "
            defaultValue={book?.data?.publication_date}
            required
            {...register("publication_date")}
          />
          <label
            htmlFor="floating_publication_date"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Publication Year: YYYY
          </label>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Update Book
        </button>
      </form>
    </div>
  );
};

export default UpdateBook;
