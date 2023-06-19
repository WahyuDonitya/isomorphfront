import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Autocomplete, Button, Container, Grid, IconButton, TextField } from '@mui/material';
import { Delete } from '@mui/icons-material';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Visitor = () => {
  const auth = useSelector((state) => state.auth);
  const pengguna = auth.pengguna;

  const [formData, setFormData] = useState([{ name: '', value: null , teamleader : pengguna.nama}]);
  const [teamName, setTeamName] = useState('');

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newFormData = [...formData];
    newFormData[index][name] = value;
    setFormData(newFormData);
  };

  const handleTeamNameChange = (event) => {
    setTeamName(event.target.value);
  };

  const handleAddFields = () => {
    setFormData([...formData, { name: '', value: null , teamleader : pengguna.nama}]);
  };

  const handleRemoveFields = (index) => {
    const newFormData = [...formData];
    newFormData.splice(index, 1);
    setFormData(newFormData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const teamData = {
        teamName: teamName,
        teamleader: pengguna.nama,
        teamMembers: formData.map((data) => ({
          name: data.name,
          value: data.value,
          status: data.status
        })),
        status : 0
      };
  
      const response = await axios.post("http://localhost:3000/api/v1/team/add", teamData);
      console.log(response.data);
      toast.success('Data berhasil disimpan!');
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // https://api.opendota.com/api/heroes
        const response = await axios.get("https://api.opendota.com/api/heroes");
        // console.log(response.data);
        setOptions(response.data);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (index, newValue) => {
    const newFormData = [...formData];
    newFormData[index].value = newValue ? newValue.localized_name : null;
    setFormData(newFormData);
  };

  const handleClear = (index) => {
    const newFormData = [...formData];
    newFormData[index].value = null;
    setFormData(newFormData);
  };

  return (
    <>
      <h3>Add Teams</h3>
      <form onSubmit={handleSubmit}>
      <Grid container spacing={2} sx={{mb: 3}}>
          <Grid item xs={12}>
            <TextField
              label="Nama Team"
              name="teamName"
              value={teamName}
              onChange={handleTeamNameChange}
              fullWidth
            />
          </Grid>
        </Grid>
        <h4>Anggota Team</h4>
        {formData.map((field, index) => (
          <Grid container spacing={2} key={index}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Nama"
                name= "name"
                value={field.name}
                onChange={(event) => handleInputChange(index, event)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <Autocomplete
                value={field.localized_name}
                onChange={(event, newValue) => handleChange(index, newValue)}
                options={options}
                getOptionLabel={(option) => option.localized_name}
                renderInput={(params) => (
                  <TextField {...params} label="Pilih Hero" fullWidth />
                )}
              />
            </Grid>

            <Grid item xs={1}>
              <IconButton aria-label="hapus" onClick={() => handleRemoveFields(index)}>
                <Delete />
              </IconButton>
            </Grid>
            {index !== formData.length - 1 && (
              <Grid item xs={12}>
               
                <hr style={{ margin: '10px 0' }} />
              </Grid>
            )}
          </Grid>
        ))}
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddFields}
          sx={{ mt: 2, mr: 2 }}
        >
          Tambah Field
        </Button>
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Submit
        </Button>
      </form>
      <ToastContainer />
    </>
  );
};

export default Visitor;
