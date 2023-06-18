import React, { useEffect, useState } from 'react'
import HeroesForm from '../../../components/Heroes/HeroesForm'
import { Container, Typography } from '@mui/material'
import axios from 'axios'

const Heroes = () => {
  return (
    <Container maxWidth="xl" sx={{ my: 3 }}>
        <Typography variant="h4">Master Movie</Typography>
        <HeroesForm></HeroesForm>
    </Container>
  )
}

const ApprovalTeam = () => {
  const [approvalsTeam, setApprovalTeam] = useState([])
}

useEffect(() => {
  const fetchTeam = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/team");
      setApprovalTeam(response.data);
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };

  fetchData();
}, []);

return (
  <div>
    <h2>Daftar Persetujuan Team</h2>
    {approvals.map(approval => (
      <div key={approval._id}>
        <h3>{approval.name}</h3>
        <p>Teeam: {approval.value}</p>
        <p>Status: {approval.status}</p>
      </div>
    ))}
  </div>
);

export default Heroes