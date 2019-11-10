import React, { useState } from 'react'
import {
  Dialog,
  Button,
  Grid,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
} from '@material-ui/core'
import { useMutation } from 'react-apollo'
import moment from 'moment'

import { CREATE_RESERVATION } from '../gql/mutations'
import { GET_RESERVATIONS } from '../gql/queries'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  textField: {
    //marginRight: '1rem',
    margin: '1rem',
    width: '200px',
  },
  button: {
    fontSize: '1rem',
  },
}))

const AddReservation = () => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [error, setError] = useState()
  const [formValues, setFormValues] = useState({
    hotelName: '',
    guestName: '',
    arrivalDate: moment(new Date()).format('MM DD YYYY'),
    departureDate: '',
  })
  const [createReservation] = useMutation(CREATE_RESERVATION, {
    refetchQueries: [
      {
        query: GET_RESERVATIONS,
      },
    ],
  })

  const updateFormField = e => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    })
  }

  const onSubmit = async e => {
    e.preventDefault()
    try {
      const { data } = await createReservation({
        variables: { reservationInput: formValues },
      })
      setOpen(false)
    } catch (errors) {
      console.log(errors)
      const { graphQLErrors, networkError } = errors
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) => {
          setError(message)
          setOpen(true)
        })

      if (networkError) {
        console.log('network', networkError)
        setError('Network server error', networkError)
        setOpen(true)
      }
    }
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Box display="flex" justifyContent="flex-end" m={1} p={1}>
        <Button
          className={classes.button}
          color="primary"
          variant="contained"
          onClick={() => setOpen(!open)}
        >
          Add Reservation
        </Button>
      </Box>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Add Reservation
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {error && <div>{error}</div>}
              <TextField
                name="guestName"
                label="Guest Name"
                className={classes.textField}
                InputLabelProps={{ shrink: true, required: true }}
                type="textarea"
                defaultValue={''}
                onChange={e => updateFormField(e)}
              />
              <TextField
                name="hotelName"
                label="Hotel Name"
                className={classes.textField}
                InputLabelProps={{ shrink: true, required: true }}
                type="textarea"
                defaultValue={''}
                onChange={e => updateFormField(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.textField}
                name="arrivalDate"
                label="Arrival Date"
                InputLabelProps={{ shrink: true, required: true }}
                type="date"
                defaultValue={formValues.arrivalDate}
                onChange={e => updateFormField(e)}
              />
              <TextField
                className={classes.textField}
                name="departureDate"
                label="Departure Date"
                InputLabelProps={{ shrink: true, required: true }}
                type="date"
                defaultValue={formValues.arrivalDate}
                onChange={e => updateFormField(e)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AddReservation
