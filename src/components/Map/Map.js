import React from "react";
import GoogleMapReact from "google-map-react";

import { useMediaQuery, Typography } from '@mui/material';

import { StyledPaper, MapContainer, MarkerContainer, Pointer } from './styles.js';
import mapStyles from './mapStyles.js';

import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';


function Map({ setCoordinates, setBounds, coordinates, places, setChildClicked }) {
    const isDesktop = useMediaQuery('(min-width:600px)');

    return (
        <MapContainer>
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles }}

                onChange={(e) => {
                    setCoordinates({ lat: e.center.lat, lng: e.center.lng });
                    setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
                }}
                onChildClick={(child) => setChildClicked(child)}>

                {places?.map((place, i) => (
                    
                    <MarkerContainer
                        lat={Number(place.latitude)}
                        lng={Number(place.longitude)}
                        key={i}>
                    
                    {
                        !isDesktop ? (
                            <LocationOnOutlinedIcon color="primary" fontSize="large" /> 
                        ) : (
                            <StyledPaper elevation={5}>
                                <Typography variant="subtitle2" gutterBottom style={{ fontWeight: 'bold', lineHeight: '16px' }}>{place.name}</Typography>
                                <Pointer
                                src={place.photo ? 
                                place.photo.images.large.url : 
                                'https://plus.unsplash.com/premium_photo-1686090448301-4c453ee74718?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                                alt={place.name} />
                            </StyledPaper>
                        )
                    }
                    </MarkerContainer>
                ))}

            </GoogleMapReact>
        </MapContainer>
    );
}

export default Map;
