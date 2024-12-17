import React, { useState, useEffect } from 'react'
import { Tabs } from 'antd';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Swal from 'sweetalert2';

function AdminScreen() {


    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser || !currentUser.isAdmin) {

            window.location.href = '/';
        }
    }, []);

    const items = [
        {
            key: '1',
            label: 'Bookings',
            children: <Bookings />,
        },
        {
            key: '2',
            label: 'Rooms',
            children: <Rooms />,
        },
        {
            key: '3',
            label: 'Add Rooms',
            children: <AddRooms />,
        },
        {
            key: '4',
            label: 'Users',
            children: <Users />
        },
    ];




    return (
        <div className='ms-3 mt-3 '>
            <h1 className="text-center mb-4 custom-font" style={{ color: "#343a40" }}>Admin Panel</h1>
            <Tabs defaultActiveKey="1" items={items} />
        </div>
    )
}

export default AdminScreen

//To display the bookings
export function Bookings() {

    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                setLoading(true)
                const data = (await axios.get('http://localhost:5000/api/bookings/getAllBookings')).data
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
    }
        , []);

    return (
        <div className='row'>
            <div className='col-md-10'>
                <h1 className="text-center mb-4 custom-font" style={{ color: "#343a40" }}>Bookings</h1>
                {loading && (<Loader />)}

                <table className='table table-bordered table-responsive-sm table-dark'>
                    <thead>
                        <tr>
                            <th>Booking ID</th>
                            <th>User ID</th>
                            <th>Room</th>
                            <th>From Date</th>
                            <th>To Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings && bookings.map(booking => {
                            return (
                                <tr>
                                    <td>{booking._id}</td>
                                    <td>{booking.userid}</td>
                                    <td>{booking.room}</td>
                                    <td>{booking.fromDate}</td>
                                    <td>{booking.toDate}</td>
                                    <td>{booking.status}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}



//To display the Rooms
export function Rooms() {

    const [rooms, setRooms] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                setLoading(true)
                const data = (await axios.get('http://localhost:5000/api/rooms/getallrooms')).data
                console.log(data)
                setRooms(data)
                setLoading(false)
            }
            catch (error) {
                console.log(error)
                setLoading(false)
                setError(true)
            }
        };
        fetchRooms();
    }
        , []);

    return (
        <div className='row'>
            <div className='col-md-10'>
                <h1 className="text-center mb-4 custom-font" style={{ color: "#343a40" }}>Rooms</h1>
                {loading && (<Loader />)}

                <table className='table table-bordered table-responsive-sm table-dark'>
                    <thead>
                        <tr>
                            <th>Room ID</th>
                            <th>Room name</th>
                            <th>Room Type</th>
                            <th>Rent Per Day</th>
                            <th>Guest Capacity</th>

                        </tr>
                    </thead>
                    <tbody>
                        {rooms && rooms.map(rooms => {
                            return (
                                <tr>
                                    <td>{rooms._id}</td>
                                    <td>{rooms.name}</td>
                                    <td>{rooms.roomType}</td>
                                    <td>${rooms.rentPerDay}</td>
                                    <td>{rooms.maxCount}</td>

                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

//To display the Users
export function Users() {

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true)
                const data = (await axios.get('http://localhost:5000/api/users/getallusers')).data
                console.log(data)
                setUsers(data)
                setLoading(false)
            }
            catch (error) {
                console.log(error)
                setLoading(false)
                setError(true)
            }
        };
        fetchUsers();
    }, []);

    return (
        <div className='row'>
            <div className='col-md-10'>
                <h1 className="text-center mb-4 custom-font" style={{ color: "#343a40" }}>Users</h1>
                {loading && (<Loader />)}

                <table className='table table-bordered table-responsive-sm table-dark'>
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && users.map(user => {
                            return (
                                <tr>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>

    )
}

//Add Rooms
export function AddRooms() {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [name, setName] = useState('')
    const [rentPerDay, setRentPerDay] = useState('')
    const [maxCount, setMaxCount] = useState('')
    const [description, setDescription] = useState('')
    const [roomType, setRoomType] = useState('')
    const [imageUrl1, setImageUrl1] = useState('')
    const [imageUrl2, setImageUrl2] = useState('')
    const [imageUrl3, setImageUrl3] = useState('')


    async function addRoom() {
        const newRoom = {
            name,
            maxCount,
            rentPerDay,
            description,
            roomType,
            imageUrls: [imageUrl1, imageUrl2, imageUrl3]
        }
        try {
            setLoading(true)
            const result = (await axios.post('http://localhost:5000/api/rooms/addroom', newRoom))
            console.log(result)
            setLoading(false)
            Swal.fire('Success', 'Room added successfully', 'success').then((result) => { window.location.href = '/admin' })
        }
        catch (error) {
            console.log(error)
            setLoading(false)
            setError(true)
            Swal.fire('Error', 'Something went wrong', 'error')
        }


    }



    return (
        <div className='row'>
            {loading && (<Loader />)}
            <h1 className="text-center mb-4 custom-font" style={{ color: "#343a40" }}>Add Rooms</h1>
            <div className='col-md-5 me-5'>
                {loading && (<Loader />)}
                <input type='text' className='form-control' placeholder='Room Name'
                    value={name} onChange={(e) => { setName(e.target.value) }}
                ></input>
                <input type='text' className='form-control mt-2' placeholder='Rent Per Day'
                    value={rentPerDay} onChange={(e) => { setRentPerDay(e.target.value) }}
                ></input>
                <input type='text' className='form-control mt-2' placeholder='Max Number of Guests'
                    value={maxCount} onChange={(e) => { setMaxCount(e.target.value) }}
                ></input>
                <input type='text' className='form-control mt-2' placeholder='Description'
                    value={description} onChange={(e) => { setDescription(e.target.value) }}
                ></input>
            </div>
            <div className='col-md-5 '>
                <input type='text' className='form-control' placeholder='Room Type'
                    value={roomType} onChange={(e) => { setRoomType(e.target.value) }}
                ></input>
                <input type='text' className='form-control mt-2' placeholder='Image URL 1'
                    value={imageUrl1} onChange={(e) => { setImageUrl1(e.target.value) }}
                ></input>
                <input type='text' className='form-control mt-2' placeholder='Image URL 2'
                    value={imageUrl2} onChange={(e) => { setImageUrl2(e.target.value) }}
                ></input>
                <input type='text' className='form-control mt-2' placeholder='Image URL 3'
                    value={imageUrl3} onChange={(e) => { setImageUrl3(e.target.value) }}
                ></input>
                <button className='btn btn-primary mt-2' style={{ float: 'right' }} onClick={addRoom}>ADD ROOM</button>

            </div>
        </div>
    )
} 