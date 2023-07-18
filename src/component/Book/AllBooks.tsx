/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { IBook } from "../../AllTypes/globalTypes";
import { useGetBooksQuery } from "../../redux/api/apiSlice";
import {
  setGenre,
  setPublicationYear,
  setSearchTerm,
} from "../../redux/features/book/bookFilterSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import Card from "../Home/Card";
import Navigation from "../Home/Navigation";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
  genre: string;
  publication_date: string;
  searchTerm: string;
}

const AllBooks = () => {
  const { data, isLoading, error } = useGetBooksQuery(undefined);
  console.log(isLoading);
  console.log(error);

  const { genre, publication_date, searchTerm } = useAppSelector(
    (state) => state.filterBooks
  );
  const dispatch = useAppDispatch();

  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmitSearch: SubmitHandler<IFormInput> = (data) => {
    console.log(data);

    dispatch(setGenre(data.genre));
    dispatch(setPublicationYear(data.publication_date));
    dispatch(setSearchTerm(data.searchTerm));
  };

  let filteredData = data?.data || [];

  /*
  // Filter
  if (genre !== "null" && publication_date === "null" && searchTerm === "") {
    filteredData = filteredData.filter(
      (item: { genre: string }) => item.genre === genre
    );
  }else if (publication_date !== "null" && genre === "null" && searchTerm === "") {
    filteredData = filteredData.filter(
      (item: { publication_date: string }) =>
        item.publication_date === publication_date
    );
  }else if (searchTerm !== "" && genre === "null" && publication_date === "null" ) {
    filteredData = filteredData.filter(
      (item: { title: string; author: string }) =>
        item.title.toLowerCase().includes(searchTerm!.toLowerCase()) ||
        item.author.toLowerCase().includes(searchTerm!.toLowerCase())
    );
  }

  */

  if (genre !== "null" && publication_date === "null" && searchTerm === "") {
    filteredData = filteredData.filter(
      (item: { genre: string }) => item.genre === genre
    );
  } else if (
    publication_date !== "null" &&
    genre === "null" &&
    searchTerm === ""
  ) {
    filteredData = filteredData.filter(
      (item: { publication_date: string }) =>
        item.publication_date === publication_date
    );
  } else if (
    searchTerm !== "" &&
    genre === "null" &&
    publication_date === "null"
  ) {
    filteredData = filteredData.filter(
      (item: { title: string; author: string }) =>
        item.title.toLowerCase().includes(searchTerm!.toLowerCase()) ||
        item.author.toLowerCase().includes(searchTerm!.toLowerCase())
    );
  } else if (
    genre !== "null" &&
    publication_date !== "null" &&
    searchTerm === ""
  ) {
    filteredData = filteredData.filter(
      (item: { genre: string; publication_date: string }) =>
        item.genre === genre && item.publication_date === publication_date
    );
  } else if (
    genre !== "null" &&
    publication_date === "null" &&
    searchTerm !== ""
  ) {
    filteredData = filteredData.filter(
      (item: { genre: string; title: string; author: string }) =>
        item.genre === genre &&
        (item.title.toLowerCase().includes(searchTerm!.toLowerCase()) ||
          item.author.toLowerCase().includes(searchTerm!.toLowerCase()))
    );
  } else if (
    genre === "null" &&
    publication_date !== "null" &&
    searchTerm !== ""
  ) {
    filteredData = filteredData.filter(
      (item: { publication_date: string; title: string; author: string }) =>
        item.publication_date === publication_date &&
        (item.title.toLowerCase().includes(searchTerm!.toLowerCase()) ||
          item.author.toLowerCase().includes(searchTerm!.toLowerCase()))
    );
  }
  return (
    <>
      <Navigation />
      <div className="container mx-auto p-5 pb-5 bg-rose-600">
        <form
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleSubmit(onSubmitSearch)}
          className="flex flex-col md:flex-row gap-3 "
        >
          <select
            {...register("genre")}
            className="w-full h-10 border-2 border-sky-500 focus:outline-none focus:border-sky-500 text-sky-500 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider"
          >
            <option value="null" selected>
              Genre
            </option>
            <option value="horror">Horror</option>
            <option value="history">History</option>
            <option value="self development">Self Development</option>
            <option value="adventure">Adventure</option>
          </select>
          <select
            {...register("publication_date")}
            className="w-full h-10 border-2 border-sky-500 focus:outline-none focus:border-sky-500 text-sky-500 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider"
          >
            <option value="null" selected>
              Publication Date
            </option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
            <option value="2018">2018</option>
          </select>

          <div className="flex">
            <input
              type="text"
              {...register("searchTerm")}
              placeholder="Search for the tool you like"
              defaultValue=""
              className="w-full md:w-80 px-3 h-10 rounded-l border-2 border-sky-500 focus:outline-none focus:border-sky-500"
            />
            <button
              type="submit"
              className="bg-sky-500 text-white rounded-r px-2 md:px-3 py-0 md:py-1 "
            >
              Search
            </button>
          </div>
        </form>

        <div className="pt-5 pb-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {/* {filteredData?.map((book: IBook) => (
            <Card key={book.id} book={book} />
          ))}

          {data &&
            data.data &&
            data.data.map((book: IBook) => <Card key={book.id} book={book} />)} */}

          {filteredData.length > 0 ? (
            filteredData.map((book: IBook) => (
              <Card key={book.id} book={book} />
            ))
          ) : data?.data?.length > 0 ? (
            data?.data?.map((book: IBook) => <Card key={book.id} book={book} />)
          ) : (
            <h1>Sorry Vai.... jinis nai</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default AllBooks;

/*
import { useState } from "react";
// import { useGetBooksQuery, useGetBookFilterQuery } from "./path/to/api";
// import Card from "../Home/Card";

const AllBooks = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, isLoading, error } = useGetBooksQuery(undefined);
  console.log(data);
  const [searchTerm, setSearchTerm] = useState("");
  const [genreFilter, setGenreFilter] = useState("null");
  const [publicationFilter, setPublicationFilter] = useState("null");

  
  
  const handleFiltersData = () => {
    const filters = {
      searchTerm: searchTerm,
      genre: genreFilter,
      publicationDate: publicationFilter,
    };
    console.log("Filters: ",filters);
    return filters;
    // Make the filtered query request with the filters object
  };

  // const { data: filteredData } = useGetBookFilterQuery(handleFiltersData!);

  return (
    <>
      <Navigation />
      <form
        className="flex flex-col md:flex-row gap-3"
        onSubmit={handleFiltersData}
      >
        <div className="flex">
          <input
            type="text"
            placeholder="Search for the tool you like"
            className="w-full md:w-80 px-3 h-10 rounded-l border-2 border-sky-500 focus:outline-none focus:border-sky-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="bg-sky-500 text-white rounded-r px-2 md:px-3 py-0 md:py-1"
          >
            Search
          </button>
        </div>
        <select
          id="filter-genre"
          name="filter-genre"
          className="w-full h-10 border-2 border-sky-500 focus:outline-none focus:border-sky-500 text-sky-500 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider"
          value={genreFilter}
          onChange={(e) => setGenreFilter(e.target.value)}
        >
          <option value="null" selected>
              Genre
            </option>
            <option value="horror">Horror</option>
            <option value="history">History</option>
            <option value="self-development">Self Development</option>
            <option value="adventure">Adventure</option>
        </select>
        <select
          id="filter-publication"
          name="filter-publication"
          className="w-full h-10 border-2 border-sky-500 focus:outline-none focus:border-sky-500 text-sky-500 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider"
          value={publicationFilter}
          onChange={(e) => setPublicationFilter(e.target.value)}
        >
          <option value="null" selected>
              Publication Date
            </option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
            <option value="2018">2018</option>
        </select>
      </form>
      <div className="pt-5 pb-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <div className="pt-5 pb-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {data &&
          data.data &&
          data.data.map((book: IBook) => <Card key={book.id} book={book} />)}
        </div>
      </div>
      
    </>
  );
};

export default AllBooks;

*/
