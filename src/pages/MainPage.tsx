import React, { FC, useEffect, useState } from 'react'
import { Box, Grid, Typography, Backdrop, CircularProgress } from '@mui/material'
import { AddNewCityBtn, CityCard, ErrorAlertDialog } from 'components'
import { useAppDispatch, useAppSelector } from 'hooks'
import { allCitiesSelector } from 'store/citiesSelector/citiesSelector'
import { cancelError, fetchCity } from 'store/citiesSlice/citiesSlice'
import { getCitiesFromLocalStorage } from 'utils'

const MainPage: FC = () => {
  const [showErrorMsg, setShowErrorMsg] = useState(false)

  const dispatch = useAppDispatch()

  const { cities, status, error } = useAppSelector(allCitiesSelector) // get all cities from redux

  useEffect(() =>{
    const existingCitiesNames = getCitiesFromLocalStorage('Cities')
    console.log(existingCitiesNames)
    const newArr = [...existingCitiesNames]
    newArr.forEach(
      item => {
        console.log(item)
        // dispatch(fetchCity({ cityName: item })) // todo ??????????
      },

    )

  }, [])


  useEffect(() => {
    if (error) {
      setShowErrorMsg(true)
    }
  }, [error])

  const handleCloseErrorMsg = () => {
    setShowErrorMsg(false)
    dispatch(cancelError({ id: '007' }))
  }

  return (
    <Box component='main' sx={{ p: 3 }}>
      {cities.length === 0 && (
        <Typography
          sx={{ textAlign: 'center', mt: '2rem' }}
          variant={'h5'}
          component={'h3'}
          color={'grey'}
        >
          Add cities to track the weather
        </Typography>
      )}

      {error && (
        <ErrorAlertDialog
          message={'City not found or an error occurred!'}
          isOpen={showErrorMsg}
          handleClose={handleCloseErrorMsg}
        />
      )}

      {status === 'pending' && (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
          <CircularProgress color='inherit' />
        </Backdrop>
      )}

      <Grid container spacing={2}>
        {cities?.map((item) => {
          return <CityCard key={item.id} data={item} />
        })}
      </Grid>

      <Grid
        container
        sx={{ height: '6rem', mt: '2rem', justifyContent: 'center', alignItems: 'center' }}
      >
        <AddNewCityBtn />
      </Grid>
    </Box>
  )
}

export default MainPage
