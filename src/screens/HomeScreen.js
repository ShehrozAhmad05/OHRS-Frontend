import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Room from '../components/Room';
import Loader from '../components/Loader';
import Error from '../components/Error';
import "antd/dist/reset.css";
import { DatePicker } from 'antd';
import moment from 'moment';
import { set } from 'mongoose';

const { RangePicker } = DatePicker;


function HomeScreen() {

    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [fromDate, setfromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [searchKey, setSearchKey] = useState('');
    const [roomType, setRoomType] = useState('all');

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const data = (await axios.get('http://localhost:5000/api/rooms/getallrooms')).data;

                setRooms(data);
                setFilteredRooms(data);
                setLoading(false);

            } catch (error) {
                setError(true);
                console.error(error);
                setLoading(false);
            }
        }

        fetchData();
    }, []);


    function filterByDate(dates) {
        const startDate = moment(dates[0].toDate(), 'DD-MM-YYYY');
        const endDate = moment(dates[1].toDate(), 'DD-MM-YYYY');
        setfromDate(startDate.format('DD-MM-YYYY'));
        setToDate(endDate.format('DD-MM-YYYY'));

        let tempRooms = [];
        let availabilty = false;

        for (const room of filteredRooms) {
            availabilty = true;

            if (room.currentBookings.length > 0) {
                for (const booking of room.currentBookings) {
                    const bookingStart = moment(booking.fromDate, 'DD-MM-YYYY');
                    const bookingEnd = moment(booking.toDate, 'DD-MM-YYYY');

                    if (
                        (startDate.isBefore(bookingEnd) && endDate.isAfter(bookingStart)) ||
                        (startDate.isSameOrAfter(bookingStart) && startDate.isBefore(bookingEnd)) ||
                        (endDate.isAfter(bookingStart) && endDate.isBefore(bookingEnd))
                    ) {
                        availabilty = false;
                        break;
                    }
                }
            }
            if (availabilty || room.currentBookings.length === 0) {
                tempRooms.push(room);
            }
        }
        setRooms(tempRooms);
    }

    function filterBySearch() {
        const tempRooms = filteredRooms.filter(room=>room.name.toLowerCase().includes(searchKey.toLowerCase()))
        setRooms(tempRooms);
    }

    function filterByType(e) {
        setRoomType(e);
        if (e === 'all') {
            setRooms(filteredRooms);
        } else {
            const tempRooms = filteredRooms.filter(room=>room.roomType.toLowerCase() === e.toLowerCase())
            setRooms(tempRooms);
        }
    }


    return (
        <div className="container custom-font">

            <div className="row mt-5 bs">
                <div className="col-md-4">
                    <RangePicker format='DD-MM-YYYY' onChange={filterByDate} />
                </div>

                <div className="col-md-5">
                    <input type="text" className="form-control" placeholder="Search by name" 
                        value={searchKey} onChange={(e) => {setSearchKey(e.target.value)}} onKeyUp={filterBySearch}
                    />
                </div>

                <div className="col-md-3">
                    <select className='form-control' aria-label="Default select example"
                        value={roomType} onChange={(e) => {filterByType(e.target.value)}}    
                        >
                        <option value="all">All</option>
                        <option value="simple">Simple</option>
                        <option value="vip">Vip</option>
                        <option value="luxury">Luxury</option>
                    </select>
                </div>

            </div>

            <div className="row justify-content-center mt-5">
                {loading ? (
                    <Loader />
                ) : (
                    rooms.map((room) => {
                        return <div key={room._id} className="col-md-9 mt-2">
                            <Room room={room} fromDate={fromDate} toDate={toDate} />
                        </div>;
                    })
                )
            }
            </div>
        </div>
    );
}

export default HomeScreen