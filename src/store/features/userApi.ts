import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type ProgressEntry = {
    city: string;
    correct: boolean;
    _id: string;
};

type CurrentGame = {
    attempts: number;
    hintsUsed: string[];
};

type User = {
    _id: string;
    username: string;
    totalScore: number;
    completedAllCities: boolean;
    progress: ProgressEntry[];
    currentGame: CurrentGame;
    createdAt: string;
    __v: number;
};

type UserResponse = {
    correctScore: string;
    incorrectScore: string;
    user: User
}

export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        credentials: 'include'
    }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        getUser: builder.query<UserResponse, void>({
            query: () => '/user/me',
            providesTags: ['User']
        }),

        getUserByUsername: builder.query<UserResponse, string>({
            query: (username) => `/user/${username}`,
            providesTags: (result, error, username) =>
                [{ type: 'User', id: username }]
        }),
    }),
})

export const {
    useGetUserQuery,
    useGetUserByUsernameQuery
} = userAPI