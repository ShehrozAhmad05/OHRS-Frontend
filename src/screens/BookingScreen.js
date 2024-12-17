import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Loader from '../components/Loader'
import Error from '../components/Error'
import moment from 'moment'
import StripeCheckout from 'react-stripe-checkout';
import Swal from 'sweetalert2';


function BookingScreen() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [room, setRoom] = useState([null]);

    const { roomid } = useParams();
    const { fromDate } = useParams();
    const { toDate } = useParams();

    const startDate = moment(fromDate, 'DD-MM-YYYY');
    const endDate = moment(toDate, 'DD-MM-YYYY');

    const startDateISO = startDate.format('YYYY-MM-DD');
    const endDateISO = endDate.format('YYYY-MM-DD');


    const totalDays = (endDate.diff(startDate, 'days')) + 1;
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {

        if(!localStorage.getItem('currentUser')) {
            window.location.href = '/login';
        }

        async function fetchData() {
            try {
                setLoading(true);
                console.log("Room ID sent to API:", roomid);
                const data = (await axios.get('http://localhost:5000/api/rooms/getroombyid?roomid=' + roomid)).data;

                setTotalAmount(data.rentPerDay * totalDays);
                setRoom(data);
                setLoading(false);

            } catch (error) {
                setError(true);
                console.error("Error fetching the data:", error);
                setLoading(false);
            }
        }

        fetchData();
    }, [roomid]);

    

    async function onToken(token) {
        console.log(token);
        const bookingDetails = {
            room,
            userid: JSON.parse(localStorage.getItem('currentUser'))._id,
            fromDate: startDateISO,
            toDate: endDateISO,
            totalAmount,
            totalDays,
            token
        }

        try {
            setLoading(true);
            const data = (await axios.post('http://localhost:5000/api/bookings/bookroom', bookingDetails)).data;
            console.log("Booking Details sent to API:", data);
            setLoading(false);
            Swal.fire('Congratulations', 'Room Booked Successfully', 'success').then(result => {
                window.location.href = '/profile'; // Redirect to my bookings page
            });
        } catch (error) {
            setError(true);
            console.error("Error booking the room:", error);
            setLoading(false);
            Swal.fire('Oops', 'Something went wrong', 'error');
        }
    }

    return (
        <div className='m-5'>
            {loading ? (
                <Loader />
            ) : room ? (
                <div className="row justify-content-center mt-5 bs">
                    <div className="col-md-12 custom-font">
                        <div className="row">
                            <div className="col-md-6">
                                <h1>{room.name}</h1>
                                {room.imageUrls?.length > 0 ? (
                                    <img src={room.imageUrls[0]} className='bigimg' alt="Room" />
                                ) : (
                                    <p>Loading or no image available</p>
                                )}
                            </div>
                            <div className="col-md-6">
                                <div style={{ textAlign: 'right' }}>
                                    <h1>Booking Details</h1>
                                    <hr />
                                    <b>
                                        <p>Name: {JSON.parse(localStorage.getItem('currentUser')).name} </p>
                                        <p>From Date: {fromDate}</p>
                                        <p>To Date: {toDate}</p>
                                        <p>Number of Guests: {room.maxCount}</p>
                                    </b>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <b>
                                        <h1>Payment Details</h1>
                                        <hr />
                                        <p>Number of Days: {totalDays} </p>
                                        <p>Room Price Per Day: ${room.rentPerDay}</p>
                                        <p>Total Amount: ${totalAmount}</p>
                                    </b>
                                </div>
                                <div style={{ float: 'right' }}>


                                    <StripeCheckout
                                        amount={totalAmount * 100}
                                        token={onToken}
                                        currency='USD'
                                        stripeKey="pk_test_51QQaCqDwNW0jUCigy0UVrdM7I1IhiSldgy8nsQRwCGL4oJjbdFqCkr05JfG5qbipcA5sabcEcbq1HiFohEHTlmjV00gbXAD6Uo"
                                    >
                                        <button className="btn btn-primary">Pay Now</button>
                                    </StripeCheckout>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Error />
            )}
        </div>
    );

}

export default BookingScreen