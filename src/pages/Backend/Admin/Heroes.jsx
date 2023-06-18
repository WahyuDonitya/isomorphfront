import React from 'react'
import HeroesForm from '../../../components/Heroes/HeroesForm'
import { Container, Typography } from '@mui/material'

const Heroes = () => {
  return (
    <Container maxWidth="xl" sx={{ my: 3 }}>
        <Typography variant="h4">Master Movie</Typography>
        <HeroesForm></HeroesForm>
    </Container>
  )
}

export default Heroes