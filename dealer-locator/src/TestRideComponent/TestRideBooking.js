import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TestRideBooking.css';
import { useParams } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Snackbar, Alert } from '@mui/material';

const TestRideBooking = () => {
    const { dealerId, dealerName } = useParams();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [currentSlide, setCurrentSlide] = useState(0);
    const [vehicles, setVehicles] = useState([]);
    const [selectedVehicleId, setSelectedVehicleId] = useState('');
    const [selectedVehicleName, setSelectedVehicleName] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [phoneError, setPhoneError] = useState(''); // For phone validation

    const vehiclesimages = [
        { name: 'TVS Apache', img: 'https://bd.gaadicdn.com/processedimages/tvs/tvs-apache/source/tvs-apache664831fa05402.jpg' },
        { name: 'TVS Jupiter', img: 'https://bd.gaadicdn.com/processedimages/tvs/tvs-jupiter/494X300/tvs-jupiter66c714371574b.jpg' },
        { name: 'TVS Raider', img: 'https://bd.gaadicdn.com/processedimages/tvs/raider/640X309/raider64d5f652b3dc3.jpg' },
    ];

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await axios.get(`http://localhost:8008/api/testride/${dealerId}/vehicles`);
                setVehicles(response.data);
            } catch (error) {
                console.error('Error fetching vehicles:', error);
            }
        };
        fetchVehicles();
    }, [dealerId]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % vehiclesimages.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Phone validation
        if (!/^\d{10}$/.test(phone)) {
            setPhoneError('Please enter a valid 10-digit phone number');
            return;
        } else {
            setPhoneError('');
        }

        if (!name || !selectedDate || !selectedVehicleId) {
            alert('Please fill all required fields.');
            return;
        }

        const bookingData = {
            name,
            phone,
            email,
            date: selectedDate,
            dealerId,
            vehicleId: selectedVehicleId,
            vehiclename: selectedVehicleName,
        };

        try {
            await axios.post('http://localhost:8008/api/testride/bookings/create', bookingData);
            setDialogOpen(true); // Open booking history dialog
        } catch (error) {
            console.error('Error submitting booking:', error);
            alert('Booking failed. Please try again.');
        }
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setName(''); 
        setPhone('');
        setEmail('');
        setSelectedDate('');
        setSelectedVehicleId('');
        setSelectedVehicleName('');
        setOpenSnackbar(true); // Show Snackbar after closing the dialog
    };

    const handleCancelDialog = () => {
        setDialogOpen(false); // Close the dialog but retain form data
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false); // Close the Snackbar
    };

    return (
        <>
            <nav className="navbar">
                <h1>Test Ride Booking</h1>
                <ul>
                    <li><a href="/tvs-dealer-locator">Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </nav>

            <div className="container my-5">
                <div className="form-container">
                    <h2>Book a Test Ride at {dealerName}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Name<span>*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Phone Number<span>*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                maxLength="10"
                                required
                            />
                            {/* Phone validation error */}
                            {phoneError && (
                                <Typography color="error" variant="body2">
                                    {phoneError}
                                </Typography>
                            )}
                        </div>
                        <div className="form-group">
                            <label>Email (optional)</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Select Date<span>*</span></label>
                            <input
                                type="date"
                                className="form-control"
                                value={selectedDate}
                                min={new Date().toISOString().split('T')[0]}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Select Vehicle<span>*</span></label>
                            <select
                                className="form-control"
                                value={selectedVehicleId}
                                onChange={(e) => {
                                    const vehicle = vehicles.find(v => v.vehicleId === e.target.value);
                                    setSelectedVehicleId(e.target.value);
                                    setSelectedVehicleName(vehicle ? vehicle.name : '');
                                }}
                                required
                            >
                                <option value="">Select a vehicle</option>
                                {vehicles.map((vehicle) => (
                                    <option key={vehicle.vehicleId} value={vehicle.vehicleId}>
                                        {vehicle.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary mt-2">Book Test Ride</button>
                    </form>
                </div>
                <div className="image-container">
                    <div className="slideshow-container">
                        {vehiclesimages.map((vehicle, index) => (
                            <div
                                className={`mySlides ${index === currentSlide ? 'active' : ''}`}
                                key={vehicle.name}
                            >
                                <img src={vehicle.img} alt={vehicle.name} style={{ width: '100%' }} />
                               
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Dialog for booking history */}
            <Dialog open={dialogOpen} onClose={handleCancelDialog}>
                <DialogTitle>Booking History</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">
                        <strong>Name:</strong> {name}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Phone Number:</strong> {phone}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Email:</strong> {email}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Test Ride Date:</strong> {selectedDate}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Dealership Name:</strong> {dealerName}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Selected Vehicle:</strong> {selectedVehicleName}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} variant="contained" color="primary">
                        OK
                    </Button>
                    <Button onClick={handleCancelDialog} variant="contained" color="secondary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar for booking success */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    Booking successful! Your test ride has been scheduled.
                </Alert>
            </Snackbar>
        </>
    );
};

export default TestRideBooking;
