import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useMemo, useState } from "react";
import "./App.css";
import Home from "./home/home";
import { ISite } from "./interfaces";
import { SnackbarProvider } from "notistack";
import { useResponsive } from "./common/use-responsive";

function App() {
  const [searchString, setSearchString] = useState("");
  const [searchResults, setSearchResults] = useState<Array<ISite>>([]);
  const [siteSelected, setSiteSelected] = useState<ISite | null>(null);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    address: "",
    city: "",
    postcode: "",
  });
  const [step, setStep] = useState(0);

  const defaultProps = {
    center: {
      lat: -37.8340428,
      lng: 144.9368477,
    },
    zoom: 11,
  };

  return (
    <div
      style={{
        overflow: "hidden",
      }}>
      <SnackbarProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Home></Home>
        </LocalizationProvider>
      </SnackbarProvider>
    </div>
  );
}

export default App;
