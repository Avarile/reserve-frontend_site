import React, { useMemo, useState } from "react";
import "./App.css";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { ISite } from "./interfaces";
import Home from "./home/home";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
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


  // const onLoad = (map: any) => {
  //   const bounds = new google.maps.LatLngBounds();
  //   if (markers && markers.length > 0) {
  //     for (let item of markers) {
  //       bounds.extend(item);
  //     }
  //   }
  //   map.fitBounds(bounds);
  // };

  const center = useMemo(() => ({ lat: -25.363, lng: 131.044 }), []);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Home></Home>
      </LocalizationProvider>
    </>
  );
}

export default App;
