import React,{useRef,useState} from "react";
import emailjs from '@emailjs/browser';
import { connect } from 'react-redux';
// import "./pages/Main.css";
import { successMessage } from '../actions/notifyPopUp';

const FooterContactUs=(props)=>{
    const[values,setValues]=useState({
        email:"",
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
          props.successMessage("Email sent successfully")
      }).catch((error) => {
          console.log(error.text);
      })}

    return(
        <div class="right box">
          <h2>Contact us</h2>
          <div class="content">
            <form ref={form} onSubmit={onSubmit} >
              <div class="email">
                <div class="text">Email *</div>
                <input name="email" type="email" onChange={handleChange} required/>
              </div>
              <div class="msg">
                <div class="text">Message *</div>
                <textarea name="message" rows="2" cols="25" onChange={handleChange} required></textarea>
              </div>
              <div class="btn-footer">
                <button  type="submit">Send</button>
              </div>
            </form>
          </div>
        </div>
    )
}

export default connect(null,{successMessage})(FooterContactUs)