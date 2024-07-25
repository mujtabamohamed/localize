import React, { useState, useEffect, createRef } from "react";
import { Autocomplete } from '@react-google-maps/api';

import { CircularProgress, Grid, Typography, InputLabel, MenuItem, Select, Box, Chip } from "@mui/material";
import { Search, SearchIconWrapper, StyledInputBase, StyledFormControl, Container, ListContainer, LoadingContainer } from './styles.js';

import PlaceDetails from '../PlaceDetails/PlaceDetails';
import SearchIcon from "@mui/icons-material/Search";


function List({ places, childClicked, isLoading, type, setType, rating, setRating, setCoordinates }) {

    const [elRefs, setElRefs] = useState([]);

    useEffect(() => {
        const refs = Array(places?.length).fill().map((_, i) => elRefs[i] || createRef());

        setElRefs(refs);
    },[places]);

    const [autocomplete, setAutocomplete] = useState(null);
    const onLoad = (autoC) => setAutocomplete(autoC);
    
    const onPlaceChanged = () => {
        if (autocomplete !== null) {
            const place = autocomplete.getPlace();
            if (place.geometry) {
                const lat = place.geometry.location.lat();
                const lng = place.geometry.location.lng();
                setCoordinates({ lat, lng });
            }
        }
    };

    const options = [
        { value: 'restaurants', label: 'Restaurants' },
        { value: 'hotels', label: 'Hotels' },
        { value: 'attractions', label: 'Attractions' }
    ];

    return(
        <Container>
             <Box display='flex' alignItems='center' marginBottom={2}>
                <img src="/Localize logo.png" alt="Localize Logo" style={{ width: '45px', marginLeft: '20px' }} />
                <Typography style={{ fontWeight: 'bold', marginLeft: '10px', color: '#303030', fontSize: '34px' }}>
                    LOCALIZE
                </Typography>
            </Box>
            
            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                <Search>
                    <SearchIconWrapper >
                        <SearchIcon color="disabled"/>
                    </SearchIconWrapper>
                    <StyledInputBase placeholder="Search..." />
                </Search>
            </Autocomplete>

            {isLoading ? (
                <LoadingContainer>
                    <CircularProgress size="2rem" color="primary" />
                </LoadingContainer>
            ) : (
                <>

            <Box marginTop='20px' marginBottom='20px' marginLeft='20px' display="flex" gap={1}>
            {options.map((option) => (
                <Chip
                    key={option.value}
                    label={option.label}
                    variant={type === option.value ? 'filled' : 'outlined'}
                    onClick={() => setType(option.value)}
                    sx={{
                        backgroundColor: type === option.value ? '#606060' : '#ffffff',
                        color: type === option.value ? '#FFF' : '#000',
                        '&:hover': {
                            backgroundColor: type === option.value ? '#303030' : '#BDBDBD'
                        }
                    }}
                />
            ))}

            <StyledFormControl display='flex'>

                {/* <InputLabel style={{ backgroundColor: '#ffffff', fontSize: '12px', fontWeight: 'semibold', 
                    color: '#000000', padding: '2px ' }}>
                    Rating
                </InputLabel> */}
                
                <Select value={rating} onChange={(e) => setRating(e.target.value)} 
                    style={{ height: '30px', borderRadius: '20px', fontSize: '14px', fontWeight: 'semibold', color: '#000000' }}>

                    <MenuItem value={0} style={{ fontSize: '16px', fontWeight: 'semibold', color: '#000000' }}>All</MenuItem>
                    <MenuItem value={3} style={{ fontSize: '16px', fontWeight: 'semibold', color: '#000000' }}>Above 3.0</MenuItem>
                    <MenuItem value={4} style={{ fontSize: '16px', fontWeight: 'semibold', color: '#000000' }}>Above 4.0</MenuItem>
                    <MenuItem value={4.5} style={{ fontSize: '16px', fontWeight: 'semibold', color: '#000000' }}>Above 4.5</MenuItem>

                </Select>

            </StyledFormControl>
            </Box>

            <hr style={{ backgroundColor: '#f2f2f2', height: '1px', border: 'none', marginBottom: '20px' }} />

            <ListContainer container spacing={3}>
                {places?.map((place, i) => (

                    <Grid ref={elRefs[i]} item key={i} xs={12}>
                        <PlaceDetails 
                            place={place}
                            selected={Number(childClicked) === i}
                            refProp={elRefs[i]} />
                    </Grid>
                ))}
            </ListContainer> 
            </>  
            )}
        </Container>
    );
}

export default List;