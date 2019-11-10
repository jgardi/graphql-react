export default {
  Reservation: {},
  Query: {
    reservations: async (parent, args, { models }) => {
      try {
        return await models.Reservation.find()
      } catch (error) {
        return error
      }
    },

    reservation: async (parent, { id }, { models }) => {
      try {
        return await models.Reservation.findById({ _id: id })
      } catch (error) {
        return error
      }
    },
  },

  Mutation: {
    createReservation: async (
      parent,
      { reservationInput },
      { models },
    ) => {
      const {
        guestName,
        hotelName,
        arrivalDate,
        departureDate,
      } = reservationInput
      if (!arrivalDate) throw new Error('Input a valid arrival date')
      if (!guestName) throw new Error('Input a valid guest name')
      if (!departureDate)
        throw new Error('Input a valid departure date')
      if (!hotelName) throw new Error('Input a valid hotel name')

      const update = {
        guestName,
        hotelName,
        arrivalDate: new Date(arrivalDate),
        departureDate: new Date(departureDate),
      }

      try {
        return await models.Reservation.create({ ...update })
      } catch (error) {
        return error
      }
    },
  },
}
