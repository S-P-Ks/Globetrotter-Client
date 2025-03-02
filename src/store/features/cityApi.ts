import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { userAPI } from './userApi';

type CityData = {
    _id: string;
    clues: string[];
};

type Option = {
    _id: string;
    name: string;
};

type CityQuestion = {
    data: CityData;
    options: Option[];
};

type ValidateProps = {
    cityId: string;
    guess: string;
}

type ValidatePropsAns = {
    correct: boolean;
    actualCity: string;
    facts: string[]
}

export const cityAPI = createApi({
    reducerPath: 'cityAPI',
    keepUnusedDataFor: 0,
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        credentials: 'include'
    }),
    tagTypes: ["City"],
    endpoints: (builder) => ({
        getRandomCity: builder.query<CityQuestion, void>({
            query: () => '/city/randomCity',
            keepUnusedDataFor: 0
        }),

        validateOption: builder.mutation<ValidatePropsAns, ValidateProps>({
            query: ({ cityId, guess }) => ({
                url: '/city/validate',
                method: 'POST',
                body: {
                    cityId,
                    guess
                }
            }),
            onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
                try {
                    await queryFulfilled;
                    dispatch(userAPI.util.invalidateTags(['User']));
                } catch (error) {
                }
            },
        })
    })
})

export const {
    useGetRandomCityQuery,
    useValidateOptionMutation
} = cityAPI