import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export default function BidsPage() {
  return (
    <Box
      component="main"
      sx={{
        flex: 1,
        py: 6,
        px: 4,
        bgcolor: "#eaeff1",
        backgroundImage:
          "url(https://en.vinex.market/skin/default/images/banners/home/new/banner-1180.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Paper sx={{ maxWidth: 936, margin: "auto", overflow: "hidden" }}>
        <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
          bids page
        </Typography>
      </Paper>
    </Box>
  );
}
