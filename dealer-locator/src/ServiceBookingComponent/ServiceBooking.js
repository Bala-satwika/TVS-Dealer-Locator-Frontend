import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { TextField, Button, Select, MenuItem, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, Alert } from '@mui/material';
import './ServiceBooking.css';  // Assuming you're using a dedicated CSS file

const ServiceBooking = () => {
    const { dealerId, dealerName } = useParams(); 
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [vehicleName, setVehicleName] = useState('');
    const [serviceType, setServiceType] = useState('');
    const [currentSlide, setCurrentSlide] = useState(0);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    
    const serviceOptions = [
        "Regular Maintenance & Servicing",
        "Engine Diagnostics & Repair",
        "Brake & Clutch Services",
        "Suspension & Shock Absorber Check",
        "Battery Inspection & Replacement",
        "Tyre Replacement & Wheel Alignment",
        "Electrical System Check",
        "Accidental Damage Repair",
        "Vehicle Health Check-Up",
        "Spare Parts Replacement",
        "Emission Testing"
    ];

    const vehiclesImages = [
        { name: 'TVS Apache', img: 'https://bd.gaadicdn.com/processedimages/tvs/tvs-apache/source/tvs-apache664831fa05402.jpg' },
        { name: 'TVS Jupiter', img: 'https://bd.gaadicdn.com/processedimages/tvs/tvs-jupiter/494X300/tvs-jupiter66c714371574b.jpg' },
        { name: 'TVS Raider', img: 'https://bd.gaadicdn.com/processedimages/tvs/raider/640X309/raider64d5f652b3dc3.jpg' },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % vehiclesImages.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [vehiclesImages.length]);

    const handleSubmit = async () => {
        const bookingData = {
            name,
            phone,
            email,
            date: selectedDate,
            dealerId, 
            vehicleName, 
            serviceType,
        };

        try {
            const response = await axios.post('http://localhost:8009/api/service/bookings/create', bookingData);

            setSnackbarMessage('Booking successful!');
            setName("");
            setPhone("");
            setEmail("");
            setSelectedDate("");
            setVehicleName("");
            setServiceType("");

            setSnackbarSeverity('success');
            setSnackbarOpen(true);
        } catch (error) {
            setSnackbarMessage('Booking failed. Please try again.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
        setDialogOpen(false);
    };

    // Enhanced form validation logic
    const validateForm = () => {
        if (!name) {
            setSnackbarMessage('Name is required.');
            return false;
        }
        if (!/^\d{10}$/.test(phone)) {
            setSnackbarMessage('Enter a valid 10-digit phone number.');
            return false;
        }
        if (email && !/\S+@\S+\.\S+/.test(email)) {
            setSnackbarMessage('Enter a valid email address.');
            return false;
        }
        if (!selectedDate) {
            setSnackbarMessage('Please select a date.');
            return false;
        }
        if (!vehicleName) {
            setSnackbarMessage('Please enter a vehicle name.');
            return false;
        }
        if (!serviceType) {
            setSnackbarMessage('Please select a service type.');
            return false;
        }
        return true;
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) {
            setSnackbarSeverity('warning');
            setSnackbarOpen(true);
            return;
        }
        setDialogOpen(true);
    };

    return (
        <>
            <nav className="navbar">
                <h1>Service Booking</h1>
                <ul>
                    <li><a href="/tvs-dealer-locator">Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </nav>

            <div className="container my-5">
                <div id="serviceBookingFormContainer" >
                    <h2>Book a Service at {dealerName}</h2>
                    <form onSubmit={handleFormSubmit}>
                        <TextField
                            label="Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            id="name-field"
                        />
                        <TextField
                            label="Phone Number"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            error={phone && !/^\d{10}$/.test(phone)}
                            helperText={phone && !/^\d{10}$/.test(phone) ? "Enter a valid 10-digit phone number" : ""}
                            id="phone-field"
                        />
                        <TextField
                            label="Email (optional)"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={email && !/\S+@\S+\.\S+/.test(email)}
                            helperText={email && !/\S+@\S+\.\S+/.test(email) ? "Enter a valid email address" : ""}
                            id="email-field"
                        />
                        <TextField
                            label="Select Date"
                            variant="outlined"
                            type="date"
                            fullWidth
                            margin="normal"
                            required
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            InputLabelProps={{ shrink: true }}
                            id="date-field"
                        />
                        <TextField
                            label="Vehicle Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            required
                            value={vehicleName}
                            onChange={(e) => setVehicleName(e.target.value)}
                            id="vehicle-field"
                        />
                        <Select
                            value={serviceType}
                            onChange={(e) => setServiceType(e.target.value)}
                            displayEmpty
                            fullWidth
                            margin="normal"
                            id="service-type-select"
                        >
                            <MenuItem value="">
                                <em>Select a service</em>
                            </MenuItem>
                            {serviceOptions.map((service, index) => (
                                <MenuItem key={index} value={service}>
                                    {service}
                                </MenuItem>
                            ))}
                        </Select>

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            className="mt-3"
                        >
                            Book Service
                        </Button>
                    </form>
                </div>

                <div className="image-container" id="vehicle-images">
                    <div className="slideshow-container">
                        {vehiclesImages.map((vehicle, index) => (
                            <div
                                className={`mySlides ${index === currentSlide ? 'active' : ''}`}
                                key={vehicle.name}
                            >
                                <img src={vehicle.img} alt={vehicle.name} style={{ width: '100%' }} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Confirmation Dialog */}
                <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                    <DialogTitle>Booking Summary</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <strong>Name:</strong> {name}<br />
                            <strong>Phone Number:</strong> {phone}<br />
                            <strong>Email:</strong> {email}<br />
                            <strong>Service Date:</strong> {selectedDate}<br />
                            <strong>Dealership Name:</strong> {dealerName}<br />
                            <strong>Vehicle Name:</strong> {vehicleName}<br />
                            <strong>Service Type:</strong> {serviceType}<br />
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDialogOpen(false)} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} color="primary">
                            Confirm Booking
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Snackbar */}
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={() => setSnackbarOpen(false)}
                >
                    <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </div>
        </>
    );
};

export default ServiceBooking;
