import { createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../api/api.slice';


const customerAdapter = createEntityAdapter();
const initialState = customerAdapter.getInitialState()
const customerBackend: string = '/admin/customer'



export const customerSlice = apiSlice.injectEndpoints({
    endpoints: (builder: any) => ({
        getCustomers: builder.query({
            query: (data: any) => ({
                url: customerBackend + '/getCustomers',
                method: 'GET',
                params: data,

            }),
            // transformResponse: (responseData: any, state: any) => {
            //     console.log(responseData)
            //     customerAdapter.setAll(initialState, responseData.users)
            // },
            providesTags : ['Customer']
            // providesTags: (result: any, error: any, arg: any, obj: any) => {
                // console.log(result)
                // return [
                //     { type: 'Customer', id: "LIST" },
                //     ...result.map((_id: any) => ({ type: 'Customer', id: _id }))
                // ]
            // }

        }),

        addCustomer: builder.mutation({
            query: (data: any) => ({
                url: customerBackend + '/addCustomer',
                method: 'POST',
                body: {
                    ...data,
                    // memberShipFee: Number(memberShiptFee)
                }
            }),
            invalidatesTags: ['Customer']
        }),

        checkIfUserNameOrPhoneExists: builder.mutation({
            query: (data: any) => ({
                url: customerBackend + '/checkIfEmailOrPhoneExists',
                method: 'POST',
                body: data,

            }),
            invalidatesTags: [
                { type: 'Customer', id: "LIST" }
            ]

        }),
    }),
});

export const {
    useGetCustomersQuery,
    useAddCustomerMutation,
    useCheckIfUserNameOrPhoneExistsMutation,
} = customerSlice;