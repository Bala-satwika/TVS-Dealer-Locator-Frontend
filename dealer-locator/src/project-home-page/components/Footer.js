import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="tvs-footer">
            <div className="tvs-footer-container">
                {/* Top section with links */}
                <div className="tvs-footer-top">
                    <div className="tvs-footer-column">
                        <h4>Motorcycles</h4>
                        <ul>
                            <li>TVS Apache</li>
                            <li>RTR 310</li>
                            <li>RR 310</li>
                            <li>RTR 200 4V</li>
                            <li>RTR 180</li>
                            <li>RTR 160 4V</li>
                            <li>Ronin</li>
                            <li>Raider</li>
                            <li>Radeon</li>
                            <li>Sport</li>
                            <li>Star City+</li>
                        </ul>
                    </div>
                    <div className="tvs-footer-column">
                        <h4>Electric Scooters</h4>
                        <ul>
                            <li>TVS iQube</li>
                            <li>iQube 2.2 kWh</li>
                            <li>iQube 3.4 kWh</li>
                            <li>iQube S 3.4 kWh</li>
                            <li>iQube ST 5.1 kWh</li>
                            <li>TVS X</li>
                        </ul>
                        <h4>Scooters</h4>
                        <ul>
                            <li>Jupiter 110</li>
                            <li>Jupiter 125</li>
                            <li>Ntorq</li>
                            <li>Zest 110</li>
                            <li>Scooty Pep+</li>
                        </ul>
                    </div>
                    <div className="tvs-footer-column">
                        <h4>Mopeds</h4>
                        <ul>
                            <li>XL 100</li>
                        </ul>
                        <h4>Three Wheelers</h4>
                        <ul>
                            <li>King Deluxe</li>
                            <li>King Duramax</li>
                            <li>King Duramax Plus</li>
                            <li>King Kargo</li>
                        </ul>
                    </div>
                    <div className="tvs-footer-column">
                        <h4>Rides & Events</h4>
                        <ul>
                            <li>TVS Racing</li>
                            <li>TVS Motosoul</li>
                            <li>Storm the Sands 2024</li>
                        </ul>
                        <h4>About Us</h4>
                        <ul>
                            <li>Overview</li>
                            <li>Company Vision</li>
                            <li>Achievements</li>
                            <li>Careers</li>
                            <li>Contact Us</li>
                        </ul>
                    </div>
                    <div className="tvs-footer-column">
                        <h4>TVS Dealer Locator</h4>
                        <ul>
                            <li>Two Wheeler Dealers</li>
                            <li>Three Wheeler Dealers</li>
                            <li>Electric Scooter Dealers</li>
                        </ul>
                        <h4>Shop</h4>
                        <ul>
                            <li>Accessories</li>
                            <li>Merchandise</li>
                            <li>Parts & Lubricants</li>
                        </ul>
                    </div>
                </div>

                {/* Contact Information and Social Icons */}
                <div className="tvs-footer-grid">
                    <div className="tvs-footer-item">
                        <h4>Contact</h4>
                        <p><a href="tel:18002587555">18002587555</a></p>
                    </div>
                    <div className="tvs-footer-item">
                        <h4>Email</h4>
                        <p><a href="mailto:customercare@tvsmotor.com">customercare@tvsmotor.com</a></p>
                    </div>
                    <div className="tvs-footer-item">
                        <h4>Need Roadside Assistance?</h4>
                        <p><a href="tel:18002587111">Dial 1800-258-7111 and Press “1”</a></p>
                    </div>
                    <div className="tvs-footer-item">
                        <h4>Follow Us</h4>
                        <div className="tvs-social-icons">
                            <a href="#"><i className="fab fa-facebook"></i></a>
                            <a href="#"><i className="fab fa-instagram"></i></a>
                            <a href="#"><i className="fab fa-youtube"></i></a>
                            <a href="#"><i className="fab fa-linkedin"></i></a>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="tvs-footer-bottom">
                    <p>© 2024 TVS Motor Company. All Rights Reserved</p>
                    <ul className="tvs-footer-legal">
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Disclaimer</a></li>
                        <li><a href="#">Cookie Policy</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
