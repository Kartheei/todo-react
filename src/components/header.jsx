import React, { useState, useEffect } from "react";
import '../assets/css/style.css';

const Header = () => {

    const [userDetails, setUserDetails] = useState({
        firstname: '',
        lastname: '',
    });

    useEffect(() => {
        const firstname = localStorage.getItem('firstname') || '';
        const lastname = localStorage.getItem('lastname') || '';
        setUserDetails({ firstname, lastname });
    }, []);

    return (
        <div className="header">
            <h2>To Do List Tracker</h2>
            <h3>Welcome {userDetails.firstname + " " + userDetails.lastname}</h3>
        </div>

    );
}
export default Header;