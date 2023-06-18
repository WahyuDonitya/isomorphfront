import React, { useEffect, useState } from 'react'
import HeroesForm from '../../../components/Heroes/HeroesForm'
import { Container, Typography } from '@mui/material'
import axios from 'axios'

const Heroes = () => {
  return (
    <Container maxWidth="xl" sx={{ my: 3 }}>
        <Typography variant="h4">Master Hero</Typography>
        <HeroesForm></HeroesForm>
    </Container>
  )
}

export default Heroes