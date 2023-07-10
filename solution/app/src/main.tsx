import { SnackbarProvider } from "notistack";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <SnackbarProvider maxSnack={3}>
    <App />
  </SnackbarProvider>
);