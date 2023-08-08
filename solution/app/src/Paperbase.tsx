import { createTheme, ThemeProvider } from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as React from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Header from "./Header";
import MintPage from "./MintPage";
import Navigator, { PagesPaths } from "./Navigator";
import OffersPage from "./OffersPage";
import WineCataloguePage from "./WineCataloguePage";

let theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: "#D8464E",
    },
    background: {
      default: "#1C1D22",
      paper: "#1C1D22",
    },
    text: {
      primary: "#ffffff",
      secondary: "#A0A0A0",
    },
  },
  typography: {
    fontFamily: [
      "Roboto Mono",
      "monospace",
      "Helvetica Neue",
      "Arial",
      "sans-serif",
    ].join(","),
  },
});

theme = {
  ...theme,
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#2B2A2E",
          borderRight: "none",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        body1: {
          color: theme.palette.primary.main,
        },
        body2: {
          color: theme.palette.text.secondary,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.primary.main,
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          borderRadius: "0",
          padding: 0,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          padding: 0,
          color: theme.palette.text.secondary,
          "&.Mui-disabled": {
            color: theme.palette.secondary.main,
            WebkitTextFillColor: theme.palette.secondary.main,
          },
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        input: {
          color: theme.palette.text.secondary,
          "&.Mui-disabled": {
            color: theme.palette.secondary.main,
            WebkitTextFillColor: theme.palette.secondary.main,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.Mui-disabled": {
            color: theme.palette.secondary.main,
            WebkitTextFillColor: theme.palette.secondary.main,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.primary.main,
          padding: 0,
          boxShadow: "none",
          borderRadius: "0",
          "&:active": {
            boxShadow: "none",
          },
          "&:hover": {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.secondary.main,
            boxShadow: "none",
          },
        },
      },
    },

    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: theme.palette.text.primary,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.background.default,
          color: theme.palette.primary.main,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRight: "none",
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          "&.Mui-selected": { backgroundColor: theme.palette.secondary.main },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderColor: theme.palette.text.secondary,
          borderWidth: 1,
          borderStyle: "solid",
          borderRadius: "0",
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: theme.palette.primary.main,
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          height: "4em",
        },
      },
    },

    MuiSvgIcon: {
      styleOverrides: {
        root: {
          height: "auto",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderColor: theme.palette.text.secondary,
          color: theme.palette.text.secondary,
          borderWidth: 2,
          borderStyle: "solid",
          borderRadius: "0",
        },
      },
    },
  },
};

const drawerWidth = 256;

export default function Paperbase() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <Header onDrawerToggle={handleDrawerToggle} />

                {isSmUp ? null : (
                  <Navigator
                    PaperProps={{ style: { width: drawerWidth } }}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                  />
                )}

                <Navigator
                  sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                      width: drawerWidth,
                      boxSizing: "border-box",
                    },
                    display: {
                      sm: "block",
                      xs: "none",
                    },
                  }}
                />

                <Box component="main">
                  <Toolbar />
                  <Box
                    sx={{
                      minWidth: "calc(100vw - " + drawerWidth + "px)",
                      borderColor: "text.secondary",
                      borderStyle: "solid",
                      borderWidth: "1px",
                      p: 6,
                      minHeight: "calc(100vh - 64px)",
                      justifyContent: "center",
                      display: "flex",
                    }}
                  >
                    <Outlet />
                  </Box>
                </Box>
              </Box>
            }
          >
            <Route index element={<WineCataloguePage />} />
            <Route path={PagesPaths.OFFERS} element={<OffersPage />} />
            <Route path={PagesPaths.MINT} element={<MintPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
