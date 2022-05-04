import React,{useRef,useState} from "react";
import emailjs from '@emailjs/browser';
import { connect } from 'react-redux';
import { successMessage } from '../../actions/notifyPopUp';

const SendEmail=(props)=>{
  const[values,setValues]=useState({
    fullname:"",
    email:"",
    subject:"",
    message:""
  })
  const form=useRef()

  const handleChange=(e)=>{
    setValues({
      ...values,
      [e.target.name]:e.target.value
    })}

const onSubmit=(e)=>{
  e.preventDefault()
  emailjs.sendForm('service_xkpysvg', 'template_uxuzxkd',form.current, '8ymZf0M1NM-taV10M')
  .then((result) => {
      console.log(result.text);
      successMessage("Email sent successfully")
  }).catch((error) => {
      console.log(error.text);
  })}


    return(
        
                <form ref={form} onSubmit={onSubmit} >
                  <div className="form-row">
                    <div className="col-md-6 form-group">
                      <input type="text" name="fullname" className="form-control" id="fullname"
                        placeholder="Your Name" onChange={handleChange} />

                    </div>
                    <div className="col-md-6 form-group">
                      <input type="email" className="form-control" name="email"
                        id="email" placeholder="Your Email" onChange={handleChange}/>

                    </div>
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control" name="subject"
                      id="subject" placeholder="Subject" onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <textarea className="form-control" name="message" rows="5" onChange={handleChange}></textarea>
                  </div>
                  <div className="text-center">
                    <button className="form-submit" type="submit">Send Message</button></div>
                </form>
                
            
    )

}

export default connect(null,{successMessage})(SendEmail);