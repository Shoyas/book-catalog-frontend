/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { IBook } from "../../AllTypes/globalTypes";
import { useGetBooksQuery } from "../../redux/api/apiSlice";
import Card from "./Card";

const Body = () => {
  const { data, isLoading, error } = useGetBooksQuery(undefined);
  console.log(isLoading)
  console.log(error)
  

  return (
    <div className="container mx-auto p-5 pb-5 bg-rose-600">
      <h1 className="text-3xl font-bold mb-4 text-white">The Top 10 Books</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {data &&
          data.data &&
          data.data.map((book: IBook) => <Card key={book.id} book={book} />)}
          {/* {helpFloor.map((item: IBook) => <Card key={item.id} itm={item} />)} */}
      </div>
    </div>
  );
};

export default Body;
