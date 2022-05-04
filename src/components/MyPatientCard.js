import React, { useEffect, useState } from "react";
import '././pages/PatientHomePage.css';
import Avatar from '@mui/material/Avatar';
import {capitalizeFirstLetter,monthNames,HTTP_API_PATH} from '../utils'

function MyPatientCard(props) {

    const [imageState, setImage] = useState("");

    const name =capitalizeFirstLetter(props.details.first_name)+' '+capitalizeFirstLetter(props.details.last_name)
    const date = new Date(props.details.date_of_birth)
    const dateOfBirth=monthNames[date.getMonth()]+" "+date.getDate()+" "+date.getFullYear()
    const bloodGroup=props.details.blood_group==""||props.details.blood_group==null?"not provided":props.details.blood_group

    const ColoredLine = ({ color }) => (
        <hr
            style={{
                color: color,
                backgroundColor: color,
                height: 2
            }}
        />
    );

    const datePosted = new Date(props.details.patient_date_of_birth)

    useEffect(() => {
        setImage(HTTP_API_PATH + props.imageUrl)
    }, [props.imageUrl])
    return (
        <div className="myp__card">
            <div className="myp_holder">
                <div className="image__view1">
                    <Avatar
                        alt={imageState}
                        src={HTTP_API_PATH + props.details.profile_pic}
                        sx={{ width: 90, height: 90 }}
                    />

                </div>

                <div className='form__data__two'>

                    <input type="text" placeholder="Name" value={name}
                        name="name"
                        disabled
                    /><br />
                </div>
                <div className='form__data__two'>

                    <input type="text" placeholder="Email"
                        name="email"
                        value={props.details.email}
                        disabled
                    /><br />
                </div>
                <div className='form__data__two'>

                    <input type="text" placeholder="Location"
                        name="location"
                        value={props.details.address?props.details.address:"not provided"}
                        required
                        disabled
                    /><br />
                </div>

                <ColoredLine color="red" />

                <div className='form__data__two'>
                    <div className='label' >
                        <label>Phone :</label>
                    </div>
                    <input type="text" placeholder="Phone"
                        name="phone"
                        value={props.details.phone_number?props.details.phone_number:"not provided"}
                        disabled
                    /><br />
                </div>
                <div className='form__data__two'>
                    <div className='label'>
                        <label>D.O.B :</label>
                    </div>
                    <input type="text" placeholder="Date of Birth"
                        name="dob"
                        value={dateOfBirth}
                        disabled
                    /><br />
                </div>
                <div className='form__data__two'>
                    <div className='label'>
                        <label>Blood Group :</label>
                    </div>
                    <input type="text" placeholder="bloodgroup"
                        name="bloodgroup"
                        value={bloodGroup}
                        disabled
                    /><br />
                </div>
            </div>
        </div>
    )
}
export default MyPatientCard;