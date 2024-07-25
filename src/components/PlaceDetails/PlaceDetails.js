import React from "react";

import PhoneIcon from '@mui/icons-material/Phone';
import NearMeIcon from '@mui/icons-material/NearMe';
import LanguageIcon from '@mui/icons-material/Language';

import Rating from '@mui/lab/Rating';
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions } from '@mui/material';


function PlaceDetails({ place, selected, refProp }) {
    if(selected) refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });

    const handleGetDirections = () => {
        const { latitude, longitude } = place.location || {};
        if (latitude && longitude) {
            window.open(`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`, '_blank');
        } else if (place.address) {
            window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(place.address)}`, '_blank');
        } else {
            alert('Location information is not available.');
        }
    };

    const handleCopyPhoneNumber = () => {
        navigator.clipboard.writeText(place.phone).then(() => {
            console.log('Phone number copied to clipboard:', place.phone);
        }).catch((err) => {
            console.error('Failed to copy the phone number:', err);
        });
    };

    return (
        <Card>
            <Box display="flex" justifyContent="space-between">

                <CardContent style={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" style={{ fontWeight: 'bold', lineHeight: '24px' }}>{place.name}</Typography>

                    <Box display="flex" alignItems="center">
                        {place?.cuisine?.slice(0, 2).map((cuisine, index) => (
                            <React.Fragment key={cuisine.name}>
                                <Typography style={{ fontWeight: 'semibold'}}>{cuisine.name}</Typography>

                                {index < place.cuisine.slice(0, 2).length - 1 && (
                                    <Typography style={{ margin: '0 4px', fontWeight: 'heavy' }}>•</Typography>
                                )}

                            </React.Fragment>
                        ))}
                    </Box>

                    <Box display="flex"  alignItems='center' justifyItems='center' >

                        <Rating name="read-only" value={Number(place.rating)}  precision={0.5} readOnly  
                            style={{ fontSize: "18px", lineHeight: '28px', marginTop: '-8px', marginRight: '8px' }}/>
                        
                        <Typography gutterBottom variant="subtitle1" 
                            style={{ color: '#808080', marginRight: '8px', lineHeight: '28px' }}>
                            ({place.num_reviews})
                        </Typography>

                    </Box>

                    <Box display="flex">

                    <Typography gutterBottom variant="subtitle1" 
                        style={{ color: '#808080', marginTop: '-8px',  }}>
                        {place.price_level}
                    </Typography>
                    
                    </Box>

                    <CardActions>

                        <Button
                            startIcon={<NearMeIcon style={{ fontSize: 16 }} />}
                            color="primary"
                            onClick={handleGetDirections}
                            style={{
                                backgroundColor: '#007AFF',
                                color: 'white',
                                borderRadius: '25px',
                                textTransform: 'none',
                                paddingLeft: '10px',
                                paddingRight: '10px',
                                margin: '-10px',
                                display: 'flex', 
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            Directions
                        </Button>

                        <Button
                            onClick={handleCopyPhoneNumber}
                            style={{
                                color: '#007AFF',
                                textTransform: 'none',
                                width: 36,  
                                height: 36, 
                                padding: 0,  
                                marginLeft: '0px',
                                display: 'flex', 
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <PhoneIcon />
                        </Button>

                        <Button
                            onClick={() => window.open(place?.website, '_blank')}
                            style={{
                                color: '#007AFF',
                                padding: '10px',
                                margin: '-25px',
                                width: 36,  
                                height: 36, 
                                display: 'flex', 
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <LanguageIcon />
                        </Button>

                    </CardActions>
                </CardContent>

                <CardMedia 
                    style={{ height: 150, width: "100%", margin:15, borderRadius: 25 }}
                    image={place.photo ? place.photo.images.large.url : 'https://plus.unsplash.com/premium_photo-1686090448301-4c453ee74718?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                    title={place.name}
                />
            </Box>
        </Card>
    );
}

export default PlaceDetails;
