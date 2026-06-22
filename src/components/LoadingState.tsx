import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function LoadingState() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 4,
      }}
    >
      <CircularProgress
        size={40}
        thickness={4}
        color="success"
        aria-label="Loading…"
      />
    </Box>
  );
}

export default LoadingState;
