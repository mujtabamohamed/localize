import React, { useState, useEffect } from "react";
import { CssBaseline, Grid } from "@mui/material";

import List from "./components/List/List";
import Map from "./components/Map/Map";

import { getPlacesData } from "./api";

function App() {
  
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  const [childClicked, setChildClicked] = useState(null);

  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState(0);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude });
    });
  }, []);

  useEffect(() => {
    if (places && places.length > 0) {
      const filteredPlaces = places.filter((place) => place.rating > rating);
      setFilteredPlaces(filteredPlaces);
    }
  }, [rating, places]);

  useEffect(() => {
    if(bounds.sw && bounds.ne) {
      setIsLoading(true);
      getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
        if (data && Array.isArray(data)) {
          setPlaces(data.filter((place) => place.name && place.num_reviews > 0));
          setFilteredPlaces([]);
        }
        setIsLoading(false);
      }).catch((error) => {
        console.error("Error fetching places data:", error);  
        setIsLoading(false);
      });
    }
  }, [type, bounds]);

  return (
    <>
      <CssBaseline />
      <Grid container spacing={0} style={{ width: "100%" }}>
        <Grid item xs={12} md={3}>
          <List 
            places={filteredPlaces.length ? filteredPlaces : places} 
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
            setCoordinates={setCoordinates}
          />
        </Grid>

        <Grid item xs={12} md={9}>
          <Map 
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces.length ? filteredPlaces : places}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
