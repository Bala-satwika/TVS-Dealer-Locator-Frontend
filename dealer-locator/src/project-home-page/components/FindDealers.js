import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Navbar from './Navbar';
import { Box, Typography, Card, CardContent, IconButton, useTheme, Slide } from '@mui/material';

const FindDealers = () => {
    const [dealerCount, setDealerCount] = useState(0);
    const dealersRef = useRef(null);
    const [isInView, setIsInView] = useState(false);
    const [showB2C, setShowB2C] = useState(false);
    const [showB2B, setShowB2B] = useState(false);
    const navigate = useNavigate();
    const theme = useTheme();

    const handleb2ccardclick = () => {
        navigate('/tvs-dealer-locator');
    };

    const handleb2bcardclick = () => {
        navigate('/login');
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                } else {
                    setIsInView(false);
                }
            },
            { threshold: 0.5 }
        );

        if (dealersRef.current) {
            observer.observe(dealersRef.current);
        }

        return () => {
            if (dealersRef.current) {
                observer.unobserve(dealersRef.current);
            }
        };
    }, []);

    useEffect(() => {
        let start = 0;
        const end = 4000;
        const duration = 3000;
        const incrementTime = Math.abs(Math.floor(duration / end));

        if (isInView) {
            const timer = setInterval(() => {
                if (start < end) {
                    start += 10;
                    setDealerCount(start);
                } else {
                    clearInterval(timer);
                }
            }, incrementTime);

            return () => clearInterval(timer);
        } else {
            setDealerCount(0);
        }
    }, [isInView]);

    useEffect(() => {
        setShowB2C(true);
        setTimeout(() => setShowB2B(true), 200);
    }, []);

    return (
        <Box
            sx={{
                backgroundImage: 'url(https://www.tvsmotor.com/am/-/media/Feature/IB/UAE/PartnerWithUs/business-together-background.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              
                padding: '20px',
                textAlign: 'center',
            }}
        >
            <Navbar />
            <Typography
                variant="h3"
                component="h1"
                sx={{
                    margin: '20px 0',
                    fontWeight: 'bold',
                    color: '#fff',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
                }}
            >
                Find Your Nearby TVS Dealers
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, marginTop: 3 }}>
                {/* B2C Dealer Locator Card */}
                <Slide direction="up" in={showB2C} mountOnEnter unmountOnExit>
                    <Card
                        sx={{
                            width: 350, // Modify the width here
                            height: 250, // Modify the height here
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            backgroundImage:
                                'url(https://bufferwall.com/download/B20190923T000000374_1200x600.jpg)', // Updated background image for B2C card
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            transition: 'transform 0.3s',
                            '&:hover': { transform: 'scale(1.05)' },
                            cursor: 'pointer',
                        }}
                        onClick={handleb2ccardclick}
                    >
                        <CardContent>
                            <Typography
                                variant="h5"
                                component="div"
                                gutterBottom
                                sx={{ color: '#fff', textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}
                            >
                                B2C Dealer Locator
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ color: '#fff', textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}
                            >
                                Find your nearest TVS dealer
                            </Typography>
                        </CardContent>
                    </Card>
                </Slide>
                
                {/* B2B Login Card */}
                <Slide direction="up" in={showB2B} mountOnEnter unmountOnExit>
                    <Card
                        sx={{
                            width: 350, // Modify the width here
                            height: 250, // Modify the height here
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            backgroundImage:
                                'url(https://www.tvsmotor.com/three-wheelers/-/media/Feature/tvs-three-wheeler/Enquiry-Form/become-dealer-mobile1.jpg?la=en&h=1280&w=720&hash=D44AB2454BAAE198ABFED29A5802EBB5)', // Updated background image for B2B card
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            transition: 'transform 0.3s',
                            '&:hover': { transform: 'scale(1.05)' },
                            cursor: 'pointer',
                        }}
                        onClick={handleb2bcardclick}
                    >
                        <CardContent>
                            <Typography
                                variant="h5"
                                component="div"
                                gutterBottom
                                sx={{ color: '#fff', textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}
                            >
                                B2B Login
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ color: '#fff', textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}
                            >
                                Access your partner portal
                            </Typography>
                        </CardContent>
                    </Card>
                </Slide>
            </Box>
            <Box ref={dealersRef} sx={{ marginTop: 4 }}>
                <Typography
                    variant="h4"
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}
                >
                    <IconButton sx={{ color: '#1976D2' }}>
                        <LocationOnIcon fontSize="large" />
                    </IconButton>
                    {dealerCount}+ Dealers Found
                </Typography>
            </Box>
        </Box>
    );
};

export default FindDealers;
