import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { Form, useLoaderData } from "react-router-dom";
import { getAllKategori, getAllMovie } from "../../api/movieApi";
import { Button } from "@mui/material";
import { Delete } from "@mui/icons-material";

const MovieData = () => {
  const loaderData = useLoaderData();
  return (
    <div style={{ height: 631, width: "100%" }}>
      <DataGrid
        rows={loaderData.rows}
        columns={loaderData.columns}
        pageSize={10}
        rowsPerPageOptions={[10, 25, 50, 100]}
        initialState={{
          sorting: {
            sortModel: [{ field: "id", sort: "desc" }],
          },
        }}
      />
    </div>
  );
};

export default MovieData;

export const loader = async () => {
  const query = await getAllMovie();

  let result = {};

  result.columns = [
    { field: "id", headerName: "ID", type: "number" },
    {
      field: "img",
      headerName: "Foto Movie",
      flex: 1,
      renderCell: (params) => {
        return (
          <img
            src={params.row.img}
            alt={params.row.nama}
            style={{ height: "100px", objectFit: "contain" }}
          />
        );
      },
    },
    { field: "nama", headerName: "Nama movie", flex: 1 },
    { field: "tahun_terbit", headerName: "Tahun Terbit Movie", flex: 1 },
    { field: "publisher", headerName: "Publisher Movie", flex: 1 },
    {
      field: "kategori",
      headerName: "Kategori Movie",
      flex: 1,
      valueGetter: (params) => {
        return params.row?.kategori?.nama;
      },
    },
    {
      field: "release",
      headerName: "Release details",
      flex: 1,
      valueGetter: (params) => {
        if (params.row.release) {
          return params.row.release.reduce((hasil, item) => {
            return hasil + item.tipe + " (" + item.airing + "),";
          }, "");
        }
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => {
        return (
          <Form method="delete" action="/admin/movie">
            <input type="hidden" name="id" value={params.id} />
            <Button
              type="submit"
              variant="contained"
              color="error"
              startIcon={<Delete />}
            >
              Hapus
            </Button>
          </Form>
        );
      },
    },
  ];
  result.rows = query;
  result.kategoriList = await getAllKategori();
  return result;
};
