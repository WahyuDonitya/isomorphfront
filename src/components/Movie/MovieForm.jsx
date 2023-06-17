import React from "react";
import { Form, useActionData, useLoaderData } from "react-router-dom";
import {
  TextField,
  Button,
  RadioGroup,
  Radio,
  FormControlLabel,
  MenuItem,
  Select,
  InputLabel,
  FormGroup,
  Checkbox,
  List,
  ListItem,
  Alert,
  AlertTitle,
} from "@mui/material";
import { deleteMovie, postMovie } from "../../api/movieApi";

const MovieForm = () => {
  // untuk mengambil data yang dimasukkan oleh user dari form yang kita buat
  const kembalian = useActionData();

  // untuk menggunakan data hasil kita load, biasanya dari api
  const loaderData = useLoaderData();

  let tahunTerbitOpts = [];
  for (let tahun = 2022; tahun > 2022 - 20; tahun--) {
    tahunTerbitOpts.push(tahun);
  }

  const tahunTerbitRender = tahunTerbitOpts.map((item, index) => {
    return (
      <MenuItem key={index} value={item}>
        {item}
      </MenuItem>
    );
  });

  const publisherOpts = [
    "Marvel Cinematic Universe",
    "DC Studios",
    "Satria Dewa Studio",
  ];

  const publisherRender = publisherOpts.map((item, index) => {
    return (
      <FormControlLabel
        key={index}
        value={item}
        control={<Radio />}
        label={item}
      />
    );
  });

  const releaseOpts = ["TV", "Manga", "Book", "Adaptation"];

  const releaseRender = releaseOpts.map((item, index) => {
    return (
      <ListItem key={index} alignItems="center">
        <FormControlLabel
          control={<Checkbox />}
          label={item}
          name="release.tipe"
          value={item}
        />
        <TextField fullWidth label="airing" name={`release.airing.${item}`} />
      </ListItem>
    );
  });

  const kategoriRender = loaderData.kategoriList.map((item, index) => {
    return (
      <MenuItem key={index} value={item._id}>
        {item.nama}
      </MenuItem>
    );
  });

  // let alertKembalian = "";
  // if (kembalian && kembalian.success) {
  //   alertKembalian = (
  //     <Alert severity="success">
  //       <AlertTitle>Sukses</AlertTitle>
  //       <strong>Berhasil!</strong>
  //       {kembalian.message}
  //     </Alert>
  //   );
  // }

  return (
    <div>
      {kembalian && kembalian.success && (
        <Alert severity="success">
          <AlertTitle>Sukses</AlertTitle>
          <strong>Berhasil!</strong>
          {kembalian.message}
        </Alert>
      )}
      {/* {alertKembalian} */}
      <Form method="post" action="/admin/movie">
        <TextField
          label="Nama Movie"
          variant="outlined"
          sx={{ my: 3 }}
          fullWidth
          helperText="Masukkan nama movie"
          name="nama"
        ></TextField>
        <div style={{ marginBottom: "10px", marginTop: "10px" }}>
          <div>
            <InputLabel id="select-tahunterbit-label">Tahun Terbit</InputLabel>
            <Select
              labelId="select-tahunterbit-label"
              id="select-tahunterbit"
              name="tahun_terbit"
              defaultValue="2022"
            >
              {tahunTerbitRender}
            </Select>
          </div>
        </div>
        <div>
          <label>Publisher</label>
          <RadioGroup name="publisher">{publisherRender}</RadioGroup>
        </div>
        <TextField
          label="Deskripsi"
          variant="outlined"
          sx={{ my: 3 }}
          fullWidth
          helperText="Masukkan deskripsi"
          name="deskripsi"
        ></TextField>
        <TextField
          label="Image URL"
          variant="outlined"
          sx={{ my: 3 }}
          fullWidth
          helperText="Masukkan URL Image"
          name="img"
        ></TextField>

        <FormGroup>
          <label>Release</label>
          <List>{releaseRender}</List>
        </FormGroup>

        <div style={{ marginBottom: "10px", marginTop: "10px" }}>
          <div>
            <InputLabel id="select-kategori-label">Kategori</InputLabel>
            <Select
              labelId="select-kategori-label"
              id="select-kategori"
              name="kategori"
              defaultValue="1"
            >
              {kategoriRender}
            </Select>
          </div>
        </div>

        <Button
          type="submit"
          color="success"
          variant="contained"
          sx={{ my: 3 }}
        >
          Insert
        </Button>
      </Form>
    </div>
  );
};

export default MovieForm;

export const MovieFormAction = async ({ request, params }) => {
  switch (request.method) {
    case "POST":
      const data = await request.formData();
      // ["TV","BOOK"]
      const releaseData = data.getAll("release.tipe").map((item) => {
        return {
          tipe: item,
          airing: data.get(`release.airing.${item}`),
        };
      });

      /**
       * [
       * {tipe:"TV", airing: 2002},
       * {tipe:"Book", airing : 2019}
       * ]
       */

      const input = {
        nama: data.get("nama"),
        tahun_terbit: data.get("tahun_terbit"),
        publisher: data.get("publisher"),
        deskripsi: data.get("deskripsi"),
        img: data.get("img"),
        kategori: data.get("kategori"),
        release: releaseData,
      };

      await postMovie(input);
      return { success: true, message: "Memasukkan data" };

      break;
    case "DELETE":
      const dataHapus = await request.formData();
      await deleteMovie(dataHapus.get("id"));
      return { success: true, message: "Menghapus data" };
      break;
    default:
      break;
  }
};
