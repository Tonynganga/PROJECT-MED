import React, { useEffect, useState } from "react";
import '././pages/PatientHomePage';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

function MyPatientCard(props) {

    const [imageState, setImage] = useState("");

    const ColoredLine = ({ color }) => (
        <hr
            style={{
                color: color,
                backgroundColor: color,
                height: 2
            }}
        />
    );

    useEffect(() => {
        setImage('http://localhost:8000' + props.imageUrl)
    }, [props.imageUrl])
    return (
        <div className="myp__card">
            <div className="myp_holder">
                <div className="image__view1">
                    <Avatar
                        alt={imageState}
                        src="/src/assets/images/homepage.jpg"
                        sx={{ width: 90, height: 90 }}
                    />

                </div>

                <div className='form__data__two'>

                    <input type="text" placeholder="Name"
                        name="name"
                    /><br />
                </div>
                <div className='form__data__two'>

                    <input type="text" placeholder="Email"
                        name="email"
                        required
                    /><br />
                </div>
                <div className='form__data__two'>

                    <input type="text" placeholder="Location"
                        name="location"
                        required
                    /><br />
                </div>

                <ColoredLine color="red" />

                <div className='form__data__two'>
                    <div className='label'>
                        <label>Phone :</label>
                    </div>
                    <input type="text" placeholder="Phone"
                        name="phone"
                    /><br />
                </div>
                <div className='form__data__two'>
                    <div className='label'>
                        <label>D.O.B :</label>
                    </div>
                    <input type="text" placeholder="Date of Birth"
                        name="dob"
                    /><br />
                </div>
                <div className='form__data__two'>
                    <div className='label'>
                        <label>Blood Group :</label>
                    </div>
                    <input type="text" placeholder="bloodgroup"
                        name="bloodgroup"
                    /><br />
                </div>
            </div>
        </div>
    )
}
export default MyPatientCard;