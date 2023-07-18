import { createBrowserRouter } from "react-router-dom";
import Home from "../component/Home/Home";
import SignOut from "../component/Auth/SignOut";
import SignIn from "../component/Auth/SignIn";
import SignUp from "../component/Auth/SignUp";
import AllBooks from "../component/Book/AllBooks";
import NotFound from "../component/NotFound/NotFound";
import AddNewBook from "../component/Book/AddNewBook";
import BookDetails from "../component/Book/BookDetails";
import UpdateBook from "../component/Book/UpdateBook";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/all-books",
    element: <AllBooks />,
  },
  {
    path: "/book-details/:id",
    element: <BookDetails />,
  },
  {
    path: "/book-details/edit-book/:id",
    element: <UpdateBook />,
  },
  {
    path: "/add-new-book",
    element: <AddNewBook />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signout",
    element: <SignOut />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
