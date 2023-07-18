/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import Navigation from "../Home/Navigation";
import {
  useDeleteBookMutation,
  usePostCommentMutation,
  useSingleBookQuery,
} from "../../redux/api/apiSlice";
import { Link, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

export type Inputs = {
  reviews: string;
};

const BookDetails = () => {
  const { id } = useParams();
  console.log("UseParams: ", id);

  const { data: book, error } = useSingleBookQuery(id!);
  console.log("Data book details: ", book);
  console.log(error);

  // const {data} = useGetCommentQuery(id!);

  const [postComment, { isError, isLoading, isSuccess }] =
    usePostCommentMutation();
  console.log(isError);
  console.log(isLoading);
  console.log(isSuccess);

  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmitComment: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    try {
      const options = {
        id: id!,
        data: data,
      };
      await postComment(options);
      toast.success("Showing book details!");
    } catch (error) {
      toast.error("Failed to book details");
    }
  };

  const [deleteBook] = useDeleteBookMutation();

  const handleDeleteBookDetail = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    console.log("Clicked DELETE book");
    const id = event.currentTarget.id;
    await deleteBook(id);
  };

  return (
    <>
      <Navigation />
      <Toaster position="bottom-right" reverseOrder={false} />
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1>Book Details</h1>
              <h2 className="text-xl font-bold mb-2">
                Title: {book?.data?.title}
              </h2>
              <p>Author: {book?.data?.author}</p>
              <p>Genre: {book?.data?.genre}</p>
              <p>Publication Year: {book?.data?.publication_date}</p>

              <Link to={`/book-details/edit-book/${book?.data?.id}`}>
                <button
                  type="button"
                  className="w-full mt-3 text-white bg-sky-600 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Edit
                </button>
              </Link>
              <Link to="/">
                <button
                  onClick={handleDeleteBookDetail}
                  id={id} // Pass the book id as the id prop
                  type="button"
                  className="w-full mt-3 text-white bg-sky-600 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Delete
                </button>
              </Link>
            </div>

            <div className="flex justify-center ">
              <form onSubmit={handleSubmit(onSubmitComment)}>
                <input
                  type="text"
                  placeholder="Reviews in 300 letters"
                  {...register("reviews", { maxLength: 300 })}
                />

                <input type="submit" />
              </form>
            </div>
          </div>

          <p>Reviews: {book?.data?.reviews}</p>
        </div>
      </section>
    </>
  );
};

export default BookDetails;
