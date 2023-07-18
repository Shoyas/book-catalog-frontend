import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Inputs } from "../../component/Book/BookDetails";
import { InputNewBook } from "../../component/Book/AddNewBook";
import { InputUpdateBook } from "../../component/Book/UpdateBook";

export type IUserRoles = "admin" | "author" | "buyer";

export type IUser = {
  email: string;
  password: string;
  role: IUserRoles;
  id?: string;
};

export type ILoginUser = {
  email: string;
  password: string;
};

export type ILoginUserResponse = {
  email?: string;
  role?: string;
};

export const api = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v1" }),
  tagTypes: ["comments", "PostBook"],
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/books",
    }),
    singleBook: builder.query({
      query: (id: string) => `/books/${id}`,
    }),
    postComment: builder.mutation({
      query: ({ id, data }: { id: string; data: Inputs }) => ({
        url: `/books/comment/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["comments"],
    }),
    getComment: builder.query({
      query: (id: string) => `/comment/${id}`,
      providesTags: ["comments"],
    }),

    postNewBook: builder.mutation({
      query: ({ data }: { data: InputNewBook }) => ({
        url: "/books/create-book",
        method: "POST",
        body: data,
        // headers: {
        //   "Content-Type": "application/json",
        // },
      }),
    }),
    updateBook: builder.mutation({
      query: ({ id, data }: { id: string; data: InputUpdateBook }) => ({
        url: `/books/edit-book/${id}`,
        method: "PUT",
        body: data,
      }),
    }),

    deleteBook: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id: string) => {
        return {
          url: `books/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, id) => [{ type: "PostBook", id }],
    }),

    postSignUp: builder.mutation<IUser, Partial<IUser>>({
      query: (data) => ({
        url: "/auth/signup",
        method: "POST",
        body: data,
      }),
    }),
    postSignIn: builder.mutation<ILoginUserResponse, ILoginUser>({
      query: (user) => ({
        url: "/auth/signin",
        method: "POST",
        body: user,
      }),
    }),
    logoutUser: builder.mutation<void, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
    getAllUsers: builder.query({
      query: () => "/auth",
    }),
  }),
});

export const {
  useGetBooksQuery,
  useSingleBookQuery,
  usePostCommentMutation,
  useGetCommentQuery,
  usePostNewBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,

  usePostSignUpMutation,
  usePostSignInMutation,
  useLogoutUserMutation,
  useGetAllUsersQuery,
} = api;
