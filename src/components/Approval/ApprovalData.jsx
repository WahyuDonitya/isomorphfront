import { Button, Dialog, DialogActions, DialogContent, DialogTitle, createTheme, ThemeProvider } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
import { Delete, DoneOutline, Visibility } from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#673AB7', 
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
});

const ApprovalData = () => {
  const loaderData = useLoaderData()

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState();
  const [data, setdata] = useState([])

  useEffect(() => {
    panggil();
  }, [])

  let columns = [
    { field: "_id", headerName: "ID", flex: 1 },
    { field: "teamName", headerName: "Team Name", flex: 1 },
    { field: "teamleader", headerName: "Team Leader", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
        // {
    //     field: "roles",
    //     headerName: "Roles",
    //     flex: 1,
    //     valueGetter: (params) => {
    //         if (params.row.roles && Array.isArray(params.row.roles)) {
    //             return params.row.roles.join(", ");
    //           }
    //     },
    // },
    {
      field: "detail",
      headerName: "Detail",
      flex: 1,
      renderCell: (params) => {
        return (
          <Visibility
            color="primary"
            value={params.row._id}
            name="test"
            onClick={() => handleDetail(params.row._id)}
            style={{ cursor: "pointer" }}
          />
        );
      },
    },
    {
      field: "approve",
      headerName: "Approved",
      flex: 1,
      renderCell: (params) => {
        return (
          <DoneOutline
            color="success"
            onClick={() => handleApprove(params.row._id)}
            style={{ cursor: "pointer" }}
          />
        );
      },
    },
  ];

  const panggil = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/team/getneedApprove");
      setdata(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDetail = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/team/get/${id}`);
      setSelectedTeam(response.data);
      setOpenDialog(true);
    } catch (error) {
      console.error("Error fetching team detail:", error);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.post(`http://localhost:3000/api/v1/team/approve/${id}`);
      console.log("Data berhasil diapprove");
      toast.success("Data berhasil Diapproved!");
    } catch (error) {
      console.error("Terjadi kesalahan saat menghapus data", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <h3>Teams need approval</h3>
        <DataGrid
          rows={data}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          components={{
            Toolbar: GridToolbar,
          }}
          getRowId={(row) => row._id}
          renderCell={(params) => {
            return (
              <Visibility
                color="primary"
                value={params.row._id}
                onClick={handleDetail}
                style={{ cursor: "pointer" }}
              />
            );
          }}
        />

        {selectedTeam && (
          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Team Detail</DialogTitle>
            <DialogContent>
              <p>Team Name: {selectedTeam.teamName}</p>
              <p>Team Leader: {selectedTeam.teamleader}</p>
              {selectedTeam.teamMembers.map((answer, i) => {
                return <p key={i}>Hero {i + 1}: {answer.value}</p>;
              })}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        )}

        <ToastContainer />
      </div>
    </ThemeProvider>
  );
};

export default ApprovalData;

export const Approvalloader = async () => {
  let result = "kamu di prank"
  return result;
};
