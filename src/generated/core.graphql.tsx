import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type AddAvailabilityInput = {
  dayOfWeek: Scalars['Float'];
  doctorId: Scalars['Float'];
  endTimeUtc: Scalars['String'];
  startTimeUtc: Scalars['String'];
};

export type AddDoctorInput = {
  name: Scalars['String'];
};

export type AddItemInput = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type Appointment = {
  __typename?: 'Appointment';
  description?: Maybe<Scalars['String']>;
  doctor: Doctor;
  doctorId: Scalars['Int'];
  durationMinutes: Scalars['Float'];
  id: Scalars['Float'];
  patientname: Scalars['String'];
  startTime: Scalars['DateTime'];
};

export type Availability = {
  __typename?: 'Availability';
  dayOfWeek: Scalars['Float'];
  doctor: Doctor;
  doctorId: Scalars['Int'];
  endTimeUtc: Scalars['String'];
  id: Scalars['Float'];
  startTimeUtc: Scalars['String'];
};

export type BookAppointmentInput = {
  date: Scalars['DateTime'];
  description: Scalars['String'];
  patientName: Scalars['String'];
  slot: SlotArgs;
};

export type Doctor = {
  __typename?: 'Doctor';
  appoinments: Array<Appointment>;
  appointments?: Maybe<Array<Appointment>>;
  availability?: Maybe<Array<Availability>>;
  id: Scalars['Float'];
  name: Scalars['String'];
};

export type Item = {
  __typename?: 'Item';
  description?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addDoctor: Doctor;
  addDoctorAvailability: Availability;
  addItem: Item;
  bookAppointment: Appointment;
};


export type MutationAddDoctorArgs = {
  doctor: AddDoctorInput;
};


export type MutationAddDoctorAvailabilityArgs = {
  availability: AddAvailabilityInput;
};


export type MutationAddItemArgs = {
  item: AddItemInput;
};


export type MutationBookAppointmentArgs = {
  bookAppointmentInput: BookAppointmentInput;
};

export type Query = {
  __typename?: 'Query';
  appointments: Array<Appointment>;
  doctorAppointments: Array<Appointment>;
  doctors: Array<Doctor>;
  items: Array<Item>;
  slots: Array<Slot>;
};


export type QueryDoctorAppointmentsArgs = {
  slotInput: SlotInput;
};


export type QuerySlotsArgs = {
  slotInput: SlotInput;
};

export type Slot = {
  __typename?: 'Slot';
  doctorId: Scalars['Float'];
  end: Scalars['String'];
  start: Scalars['String'];
};

export type SlotArgs = {
  doctorId: Scalars['Float'];
  end: Scalars['String'];
  start: Scalars['String'];
};

export type SlotInput = {
  date: Scalars['DateTime'];
  doctorId: Scalars['Float'];
};

export type BookAppointmentMutationVariables = Exact<{
  bookAppointmentInput: BookAppointmentInput;
}>;


export type BookAppointmentMutation = { __typename?: 'Mutation', bookAppointment: { __typename?: 'Appointment', patientname: string, doctorId: number, startTime: any, durationMinutes: number, description?: string | null } };

export type AddItemMutationVariables = Exact<{
  item: AddItemInput;
}>;


export type AddItemMutation = { __typename?: 'Mutation', addItem: { __typename?: 'Item', id: number, name: string, description?: string | null } };

export type DoctorAppointmentsQueryVariables = Exact<{
  slotInput: SlotInput;
}>;


export type DoctorAppointmentsQuery = { __typename?: 'Query', doctorAppointments: Array<{ __typename?: 'Appointment', startTime: any, durationMinutes: number, patientname: string, description?: string | null }> };

export type DoctorsQueryVariables = Exact<{ [key: string]: never; }>;


export type DoctorsQuery = { __typename?: 'Query', doctors: Array<{ __typename?: 'Doctor', id: number, name: string, availability?: Array<{ __typename?: 'Availability', startTimeUtc: string, endTimeUtc: string, dayOfWeek: number }> | null }> };

export type ItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type ItemsQuery = { __typename?: 'Query', items: Array<{ __typename?: 'Item', id: number, name: string, description?: string | null }> };


export const BookAppointmentDocument = gql`
    mutation bookAppointment($bookAppointmentInput: BookAppointmentInput!) {
  bookAppointment(bookAppointmentInput: $bookAppointmentInput) {
    patientname
    doctorId
    startTime
    durationMinutes
    description
  }
}
    `;
export type BookAppointmentMutationFn = Apollo.MutationFunction<BookAppointmentMutation, BookAppointmentMutationVariables>;

/**
 * __useBookAppointmentMutation__
 *
 * To run a mutation, you first call `useBookAppointmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBookAppointmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bookAppointmentMutation, { data, loading, error }] = useBookAppointmentMutation({
 *   variables: {
 *      bookAppointmentInput: // value for 'bookAppointmentInput'
 *   },
 * });
 */
export function useBookAppointmentMutation(baseOptions?: Apollo.MutationHookOptions<BookAppointmentMutation, BookAppointmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BookAppointmentMutation, BookAppointmentMutationVariables>(BookAppointmentDocument, options);
      }
export type BookAppointmentMutationHookResult = ReturnType<typeof useBookAppointmentMutation>;
export type BookAppointmentMutationResult = Apollo.MutationResult<BookAppointmentMutation>;
export type BookAppointmentMutationOptions = Apollo.BaseMutationOptions<BookAppointmentMutation, BookAppointmentMutationVariables>;
export const AddItemDocument = gql`
    mutation addItem($item: AddItemInput!) {
  addItem(item: $item) {
    id
    name
    description
  }
}
    `;
export type AddItemMutationFn = Apollo.MutationFunction<AddItemMutation, AddItemMutationVariables>;

/**
 * __useAddItemMutation__
 *
 * To run a mutation, you first call `useAddItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addItemMutation, { data, loading, error }] = useAddItemMutation({
 *   variables: {
 *      item: // value for 'item'
 *   },
 * });
 */
export function useAddItemMutation(baseOptions?: Apollo.MutationHookOptions<AddItemMutation, AddItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddItemMutation, AddItemMutationVariables>(AddItemDocument, options);
      }
export type AddItemMutationHookResult = ReturnType<typeof useAddItemMutation>;
export type AddItemMutationResult = Apollo.MutationResult<AddItemMutation>;
export type AddItemMutationOptions = Apollo.BaseMutationOptions<AddItemMutation, AddItemMutationVariables>;
export const DoctorAppointmentsDocument = gql`
    query doctorAppointments($slotInput: SlotInput!) {
  doctorAppointments(slotInput: $slotInput) {
    startTime
    durationMinutes
    patientname
    description
  }
}
    `;

/**
 * __useDoctorAppointmentsQuery__
 *
 * To run a query within a React component, call `useDoctorAppointmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDoctorAppointmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDoctorAppointmentsQuery({
 *   variables: {
 *      slotInput: // value for 'slotInput'
 *   },
 * });
 */
export function useDoctorAppointmentsQuery(baseOptions: Apollo.QueryHookOptions<DoctorAppointmentsQuery, DoctorAppointmentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DoctorAppointmentsQuery, DoctorAppointmentsQueryVariables>(DoctorAppointmentsDocument, options);
      }
export function useDoctorAppointmentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DoctorAppointmentsQuery, DoctorAppointmentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DoctorAppointmentsQuery, DoctorAppointmentsQueryVariables>(DoctorAppointmentsDocument, options);
        }
export type DoctorAppointmentsQueryHookResult = ReturnType<typeof useDoctorAppointmentsQuery>;
export type DoctorAppointmentsLazyQueryHookResult = ReturnType<typeof useDoctorAppointmentsLazyQuery>;
export type DoctorAppointmentsQueryResult = Apollo.QueryResult<DoctorAppointmentsQuery, DoctorAppointmentsQueryVariables>;
export const DoctorsDocument = gql`
    query doctors {
  doctors {
    id
    name
    availability {
      startTimeUtc
      endTimeUtc
      dayOfWeek
    }
  }
}
    `;

/**
 * __useDoctorsQuery__
 *
 * To run a query within a React component, call `useDoctorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDoctorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDoctorsQuery({
 *   variables: {
 *   },
 * });
 */
export function useDoctorsQuery(baseOptions?: Apollo.QueryHookOptions<DoctorsQuery, DoctorsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DoctorsQuery, DoctorsQueryVariables>(DoctorsDocument, options);
      }
export function useDoctorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DoctorsQuery, DoctorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DoctorsQuery, DoctorsQueryVariables>(DoctorsDocument, options);
        }
export type DoctorsQueryHookResult = ReturnType<typeof useDoctorsQuery>;
export type DoctorsLazyQueryHookResult = ReturnType<typeof useDoctorsLazyQuery>;
export type DoctorsQueryResult = Apollo.QueryResult<DoctorsQuery, DoctorsQueryVariables>;
export const ItemsDocument = gql`
    query items {
  items {
    id
    name
    description
  }
}
    `;

/**
 * __useItemsQuery__
 *
 * To run a query within a React component, call `useItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useItemsQuery({
 *   variables: {
 *   },
 * });
 */
export function useItemsQuery(baseOptions?: Apollo.QueryHookOptions<ItemsQuery, ItemsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ItemsQuery, ItemsQueryVariables>(ItemsDocument, options);
      }
export function useItemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ItemsQuery, ItemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ItemsQuery, ItemsQueryVariables>(ItemsDocument, options);
        }
export type ItemsQueryHookResult = ReturnType<typeof useItemsQuery>;
export type ItemsLazyQueryHookResult = ReturnType<typeof useItemsLazyQuery>;
export type ItemsQueryResult = Apollo.QueryResult<ItemsQuery, ItemsQueryVariables>;