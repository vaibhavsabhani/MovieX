import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { FaPlayCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import {
  useGetMovieVideoQuery,
  useGetTVVideoQuery,
} from "../store/Slices/ApiSlice";

const PlayButton = () => {
  const { type, id } = useParams();
  const [open, setOpen] = React.useState(false);
  const ytBaseUrl = "https://www.youtube.com/embed/";

  const getVideo =
    type === "movie" ? useGetMovieVideoQuery(id) : useGetTVVideoQuery(id);
  const { data } = getVideo;

  const Trailer = data?.results?.find((video) => video?.type === "Trailer");
  console.log(Trailer);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button onClick={handleClickOpen}>
        <FaPlayCircle className="text-6xl" />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Box
            noValidate
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              m: "auto",
              width: "fit-content",
              height: "fit-content",
            }}
          >
            {Trailer?.key ? (
            <iframe
              src={`${ytBaseUrl}${Trailer.key}`}
              allowFullScreen
              className="bg-black h-full"
            ></iframe>
          ) : (
            <p className="text-white text-center">No Trailer Available</p>
          )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default PlayButton;
