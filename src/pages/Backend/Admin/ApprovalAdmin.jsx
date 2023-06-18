import { Container, Typography } from '@mui/material'
import React from 'react'
import ApprovalData from '../../../components/Approval/ApprovalData'

const ApprovalAdmin = () => {
  return (
    <Container maxWidth="xl" sx={{ my: 3 }}>
        <Typography variant="h4">Approval Page</Typography>
        <ApprovalData></ApprovalData>
    </Container>
  )
}

export default ApprovalAdmin