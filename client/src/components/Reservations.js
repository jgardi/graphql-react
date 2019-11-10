import React, { useState } from 'react'
import {
  Box,
  Grid,
  CircularProgress,
  Typography,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useQuery } from 'react-apollo'

import AddReservation from './AddReservation'
import Reservation from './Reservation'
import Search from './Search'

import { GET_RESERVATIONS } from '../gql/queries'

const useStyles = makeStyles(theme => ({
  title: {
    padding: '1rem',
    fontWeight: '700',
  },
}))

const Reservations = props => {
  const classes = useStyles()
  const [searchId, setSearchId] = useState()
  const { loading, error, data } = useQuery(GET_RESERVATIONS)

  if (loading)
    return (
      <Box display="flex" justify="center" alignItems="center">
        <CircularProgress disableShrink />
      </Box>
    )
  if (error) return <p>Error :(</p>

  const { reservations } = data || []
  let i = 1
  return (
    <Grid container spacing={5} justify="center" alignItems="center">
      <Grid item xs={12} lg={8}>
        <AddReservation />
      </Grid>
      <Grid item xs={12} lg={8}>
        <Search
          searchTerm={searchId}
          placeholder={'enter reservation id'}
          setSearch={setSearchId}
        />
      </Grid>
      {searchId && (
        <Grid item xs={12} lg={8}>
          <Paper>
            <Typography className={classes.title}>
              Search Results
            </Typography>

            <Reservation reservationId={searchId} />
          </Paper>
        </Grid>
      )}
      <Grid item xs={12} lg={8}>
        {reservations.length <= 0 && (
          <Paper>
            <Typography className={classes.title}>
              There are no existing reservations
            </Typography>
          </Paper>
        )}
      </Grid>

      <Grid item xs={12} lg={8}>
        <Paper>
          <Typography className={classes.title}>
            All Reservations
          </Typography>
          <Paper>
            <Table size="small" aria-label="Reservations">
              <TableHead>
                <TableRow>
                  <TableCell>Reservation Id</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reservations &&
                  reservations.map(row => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row._id}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Paper>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default Reservations
