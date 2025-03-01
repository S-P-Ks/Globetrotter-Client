import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

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
            })
        })
    })
})

export const {
    useGetRandomCityQuery,
    useValidateOptionMutation
} = cityAPI