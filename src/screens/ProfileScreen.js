import React, { useEffect, useState } from 'react'
import { Tabs } from "antd";
import axios from 'axios'
import Loader from '../components/Loader'
import Error from '../components/Error'
import Swal from 'sweetalert2'

function ProfileScreen() {

    const user = JSON.parse(localStorage.getItem('currentUser'))

    useEffect(() => {
        if (!user) {
            window.location.href = '/login'
        }
    }, [])

    const items = [
        {
            key: '1',
            label: 'Profile',
            children: (
                <div className="container mt-4">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <h1 className="text-center mb-4 custom-font" style={{ color: "#343a40" }}>Profile</h1>
                            <div
                                className="card shadow-sm custom-font"
                                style={{ borderRadius: "10px", border: "1px solid #ddd", padding: "20px" }}
                            >
                                <div className="card-body">
                                    <h3 className="card-title" style={{ color: "#007bff" }}>User Details</h3>
                                    <hr />
                                    <p className="mb-2"><b>Name:</b> {user.name}</p>
                                    <p className="mb-2"><b>Email:</b> {user.email}</p>
                                    <p className="mb-2"><b>Admin Access:</b> {user.isAdmin ? 'Yes' : 'No'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            key: '2',
            label: 'Bookings',
            children: <MyBookings />,
        },

    ];


    return (
        <div className='ms-4 mt-3'>
            <Tabs defaultActiveKey="1" items={items} />
        </div>
    )
}

export default ProfileScreen

export function MyBookings() {

    const user = JSON.parse(localStorage.getItem('currentUser'))
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                setLoading(true)
                const data = (await axios.post('http://localhost:5000/api/bookings/getBookingsByUserId', { userid: user._id })).data
                console.log(data)
                setBookings(data)
                setLoading(false)
            }
            catch (error) {
                console.log(error)
                setLoading(false)
                setError(true)
            }
        };
        fetchBookings();

    }, [user._id])

    async function cancelBooking(bookingid, roomid) {
        try {
            setLoading(true)
            const data = (await axios.post('http://localhost:5000/api/bookings/cancelbooking', { bookingid, roomid })).data
            console.log(data)
            setLoading(false)
            Swal.fire('Booking Cancelled', 'Your booking has been cancelled', 'success').then(result => {
                window.location.reload()    
            })
            
        } catch (error) {
            console.log(error)
            setLoading(false)
            Swal.fire('Failed', 'Failed to cancel booking', 'error')
        }
    }


    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <h1 className="text-center mb-4 custom-font" style={{ color: "#343a40" }}>My Bookings</h1>
                    {loading && <Loader />}

                    {bookings && bookings.map(booking => (
                        <div
                            className="card mb-3 shadow-sm custom-font"
                            style={{ borderRadius: "10px", border: "1px solid #ddd" }}
                            key={booking._id}
                        >
                            <div className="card-body">
                                <h3 className="card-title" style={{ color: "#007bff" }}>{booking.room}</h3>
                                <hr />
                                <p className="mb-1"><b>Booking ID:</b> {booking._id}</p>
                                <p className="mb-1"><b>Check-In:</b> {booking.fromDate}</p>
                                <p className="mb-1"><b>Check-Out:</b> {booking.toDate}</p>
                                <p className="mb-1"><b>Total Amount:</b> ${booking.totalAmount}</p>

                                <div className="d-flex justify-content-between align-items-center">

                                    <p className="mb-0">
                                        <b>Status:</b>{" "}
                                        <span
                                            className={`badge ${booking.status === 'booked' ? 'bg-success' : 'bg-danger'}`}
                                            style={{ fontSize: "0.9rem" }}
                                        >
                                            {booking.status === 'booked' ? 'Confirmed' : 'Cancelled'}
                                        </span>
                                    </p>
                                    {booking.status === 'booked' && (

                                        <button
                                            className="btn btn-danger btn-sm"
                                            style={{ marginLeft: "auto" }}
                                            onClick={() => { cancelBooking(booking._id, booking.roomid) }}
                                        >
                                            Cancel Booking
                                        </button>

                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

}