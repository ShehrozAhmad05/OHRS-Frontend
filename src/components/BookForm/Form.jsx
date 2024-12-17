import React, { useState } from 'react';
import './Form.css';

const Form = () => {
    const [selectedRoomType, setSelectedRoomType] = useState('');
    const [subcategories, setSubcategories] = useState([]);

    // Room subcategories based on type
    const roomOptions = {
        simple: ['Standard Room', 'Classic Room', 'Economy Room'],
        vip: ['Executive Room', 'Deluxe Room', 'Superior Room'],
        luxury: ['Presidential Suite', 'Royal Suite', 'Penthouse Suite'],
    };

    // Handle the type selection
    const handleTypeChange = (e) => {
        const selectedType = e.target.value;
        setSelectedRoomType(selectedType);
        setSubcategories(roomOptions[selectedType] || []);
    };

    return (
        <div className="form-container">
            <form>
                <div className="form-field">
                    <label>Check-in</label>
                    <input type="date" className="date-input" />
                </div>
                <div className="form-field">
                    <label>Check-out</label>
                    <input type="date" className="date-input" />
                </div>
                <div className="form-field">
                    <label>Type</label>
                    <select value={selectedRoomType} onChange={handleTypeChange}>
                        <option value="">Select Room Type</option>
                        <option value="simple">Simple Room</option>
                        <option value="vip">VIP Room</option>
                        <option value="luxury">Luxury Room</option>
                    </select>
                </div>
                {/* Subcategories dropdown */}
                {subcategories.length > 0 && (
                    <div className="form-field">
                        <label>
                            {`${selectedRoomType.charAt(0).toUpperCase() + selectedRoomType.slice(1)} Room`}
                        </label>

                        <select>
                            <option value="">Select a Room</option>
                            {subcategories.map((sub, index) => (
                                <option key={index} value={sub.toLowerCase()}>
                                    {sub}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
                <div className="form-field">
                    <label>Rooms</label>
                    <select>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </div>
                <div className="form-field">
                    <label>Guests</label>
                    <input type="number" placeholder="Number of guests" min="1" />
                </div>
                <button type="submit" className="submit-button">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Form;