import { Container, Typography } from "@mui/material";
import React from "react";
import MovieData from "../../../components/Movie/MovieData";
import MovieForm from "../../../components/Movie/MovieForm";

const Movie = () => {
  return (
    <div>
      <Container maxWidth="xl" sx={{ my: 3 }}>
        <Typography variant="h4">Master Movie</Typography>
        <MovieForm></MovieForm>
        <hr />
        <MovieData></MovieData>
      </Container>
    </div>
  );
};

export default Movie;
