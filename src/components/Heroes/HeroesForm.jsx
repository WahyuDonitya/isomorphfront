import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  createTheme,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import "./HeroesForm.css"
import { DataGrid } from "@mui/x-data-grid";

const HeroesForm = () => {
  const theme = createTheme();
  const loaderData = useLoaderData();
  console.log(loaderData);

  const [carryChecked, setCarryChecked] = useState(false);
  const [durableChecked, setDurableChecked] = useState(false);
  const [nukerChecked, setNukerChecked] = useState(false);

  const HandleSubmit = async (event) => {
    const roles = [];
    if (carryChecked) roles.push("carry");
    if (durableChecked) roles.push("durable");
    if (nukerChecked) roles.push("nuker");

    // Lakukan sesuatu dengan array roles
    console.log(roles);
  }


  return (
    <div>
      
      <Box component="form" onSubmit={HandleSubmit} sx={{ mt: 1 }}>
              <TextField
                label="Heros Name"
                variant="outlined"
                sx={{ my: 3 }}
                fullWidth
                helperText="Masukkan Nama Hero"
                name="heroname"
              ></TextField>


              <TextField
                label="Localized Name"
                variant="outlined"
                sx={{ my: 3 }}
                fullWidth
                helperText="Masukkan Localized name"
                name="localized_name"
              ></TextField>


              <TextField
                label="Primary Attribute"
                variant="outlined"
                sx={{ my: 3 }}
                fullWidth
                helperText="Masukkan Attribute"
                name="primary_attr"
              ></TextField>

              <TextField
                label="Attack Type"
                variant="outlined"
                sx={{ my: 3 }}
                fullWidth
                helperText="Attack Type"
                name="attack_type"
              ></TextField>
              
              <FormControlLabel
                control={
                  <Checkbox
                    checked={carryChecked}
                    onChange={(e) => setCarryChecked(e.target.checked)}
                    name="carry"
                  />
                }
                label="Carry"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={durableChecked}
                    onChange={(e) => setDurableChecked(e.target.checked)}
                    name="durable"
                  />
                }
                label="Durable"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={nukerChecked}
                    onChange={(e) => setNukerChecked(e.target.checked)}
                    name="nuker"
                  />
                }
                label="Nuker"
              />

              <TextField
                label="Legs"
                variant="outlined"
                sx={{ my: 3 }}
                fullWidth
                helperText="Legs input"
                name="legs"
              ></TextField>

              <Button
                type="submit"
                width="100%"
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: "primary" }}
              >
                INSERT DATA
              </Button>
            

            </Box>

      <hr /> <br />

      <h3>Heros Data</h3>
      <DataGrid
        rows={loaderData.rows}
        columns={loaderData.columns}
        initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
      />
    </div>
  );
};

export default HeroesForm;

export const Heroesloader = async () => {
    let data;
  await axios
    .get("http://localhost:3000/api/v1/heroes")
    .then((result) => {
      data = result.data;
    })
    .catch((error) => {
      if (axios.isCancel(error)) {
        console.log("Canceled");
      } else {
        console.log(error);
      }
    });

    let result = {}

    result.columns = [
        { field: "name", headerName: "Heroes name", flex: 1 },
        { field: "localized_name", headerName: "Localized Name", flex: 1 },
        { field: "primary_attr", headerName: "Primary Attribute", flex: 1 },
        { field: "attack_type", headerName: "Attack Type", flex: 1 },
        {
            field: "roles",
            headerName: "Roles",
            flex: 1,
            valueGetter: (params) => {
                if (params.row.roles && Array.isArray(params.row.roles)) {
                    return params.row.roles.join(", ");
                  }
            },
          },
        { field: "legs", headerName: "Legs", flex: 1 },
    ]

    result.rows = data
    return result
}
