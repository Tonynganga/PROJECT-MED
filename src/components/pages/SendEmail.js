import React,{useRef,useState} from "react";
import emailjs from '@emailjs/browser';
const SendEmail=()=>{
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
  }).catch((error) => {
      console.log(error.text);
  })}


    return(
        
                <form ref={form} onSubmit={onSubmit} >
                  <div class="form-row">
                    <div class="col-md-6 form-group">
                      <input type="text" name="fullname" class="form-control" id="fullname"
                        placeholder="Your Name" onChange={handleChange} />

                    </div>
                    <div class="col-md-6 form-group">
                      <input type="email" class="form-control" name="email"
                        id="email" placeholder="Your Email" onChange={handleChange}/>

                    </div>
                  </div>
                  <div class="form-group">
                    <input type="text" class="form-control" name="subject"
                      id="subject" placeholder="Subject" onChange={handleChange} />
                  </div>
                  <div class="form-group">
                    <textarea class="form-control" name="message" rows="5" onChange={handleChange}></textarea>
                  </div>
                  <div class="text-center">
                    <button class="form-submit" type="submit">Send Message</button></div>
                </form>
                
            
    )

}

export default SendEmail