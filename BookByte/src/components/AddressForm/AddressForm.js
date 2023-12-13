import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import './AddressForm.css';

const AddressForm = () => {
    const [address, setAddress] = useState('');
    const navigate = useNavigate();
    const { user } = useUser();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/add-address', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ address })
            });

            if (response.ok) {
                console.log('Address saved successfully');
                navigate('/cart');
            } else {
                const errorText = await response.text();
                console.error('Failed to save address:', errorText);
            }
        } catch (error) {
            console.error('Error submitting address:', error);
        }
    };

    return (
        <div className="address-form-container">
            <h2>Add Address</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="address">Address:</label>
                <textarea
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
                <button type="submit">Save Address</button>
            </form>
        </div>
    );
};

export default AddressForm;
