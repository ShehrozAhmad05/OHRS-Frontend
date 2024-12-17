import React, { useState } from 'react'
import { Modal, Button, Carousel, CarouselItem } from 'react-bootstrap'
import { Link } from 'react-router-dom';

function Room({ room, fromDate, toDate }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div className='row bs mb-2'>
            <div className="col-md-4">
                <img src={room.imageUrls[0]} alt={room.name} className="smallimg" />
            </div>
            <div className="col-md-7">
                <b><h1>{room.name}</h1>
                    <p>Max Count : {room.maxCount}</p>
                    <p>Type: {room.roomType}</p>
                    <p>Price: ${room.rentPerDay}</p>
                </b>

                <div style={{ float: 'right' }}>

                    {(fromDate && toDate) && (
                        <Link to={`/book/${room._id}/${fromDate}/${toDate}`}>
                            <button className="btn btn-primary m-2">Book Now</button>
                        </Link>
                    )}
                    <button className="btn btn-primary" onClick={handleShow}>View Details</button>
                </div>
            </div>


            <Modal show={show} onHide={handleClose} size='lg'>
                <Modal.Header>
                    <Modal.Title>{room.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Carousel>
                        {room.imageUrls.map((url, index) => {
                            return <CarouselItem key={index}>
                                <img
                                    className="d-block w-100 bigimg"
                                    src={url}
                                    alt={`Room image ${index + 1}`}
                                />
                            </CarouselItem>
                        })}
                    </Carousel>
                    <p>{room.description}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default Room