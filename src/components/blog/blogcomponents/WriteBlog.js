import React from "react";
import "../Blog.css";
import Select from 'react-select';


const blog_type = [
    { label: "General", value: "general" },
    { label: "Dentry", value: "dentry" },
    { label: "Neurological", value: "neurological" },
    { label: "Urogenital", value: "urogenital" },
    { label: "Oral", value: "oral" },
    { label: "Dermatology", value: "dermatology" },
    { label: "Psychiatry", value: "psychiatry" },
    { label: "Surgery", value: "surgery" },
    { label: "Urology", value: "urology" },
    { label: "Ophthalmology", value: "ophthalmology" },
    { label: "Allergy & Immunology", value: "allergy & immunology" },
    { label: "Pathology", value: "pathology" },
    { label: "Pediatrics", value: "pediatrics" },
    { label: "Cardiology", value: "cardiology" },
    

];

function WriteBlog() {
    return (
        <div className="write">
            <img
                className="writeImg"
                src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
            />
            <form className="writeForm">
                <div className="fileInput">
                    <label htmlFor="fileInput">
                        <i className="writeIcon fas fa-plus"></i>
                    </label>

                    <input id="fileInput" placeholder="Thumbnail" type="file" style={{ display: "none" }} />
                </div>
                <div className="writeFormGroup">
                    <div className="bloginputs">
                        <div className="bloginput">
                            <input
                                className="writeInput"
                                placeholder="Title"
                                type="text"
                                autoFocus={true} />
                        </div>
                        <Select
                            className="blogtype"
                            required
                            options={blog_type} />
                        <div className="bloginput">
                            <input
                                className="writeInput2"
                                placeholder="Excerpt"
                                type="text"
                                autoFocus={true}
                            />

                        </div>
                    </div>


                </div>
                <div className="writeFormGroup">
                    <textarea
                        className="writeInput writeText"
                        placeholder="Blog Content..."
                        type="text"
                        autoFocus={true}
                    />
                </div>
                <button className="writeSubmit" type="submit">
                    Publish
                </button>
            </form>
        </div>
    );
}

export default WriteBlog;
