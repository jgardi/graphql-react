import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    reservations: [Reservation]
    reservation(id: ID!): Reservation
  }
  extend type Mutation {
    createReservation(
      reservationInput: reservationInput!
    ): Reservation
  }

  input reservationInput {
    guestName: String
    hotelName: String
    arrivalDate: String
    departureDate: String
  }

  type Reservation {
    _id: ID
    guestName: String
    hotelName: String
    arrivalDate: Date
    departureDate: Date
  }
`
