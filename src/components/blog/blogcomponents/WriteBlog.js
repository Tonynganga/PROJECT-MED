import React from "react";
import "../Blog.css";

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

                    <input id="fileInput" type="file" style={{ display: "none" }} />
                </div>
                <div className="writeFormGroup">
                    <div className="bloginputs">
                        <div className="bloginput">
                            <input
                                className="writeInput"
                                placeholder="Title"
                                type="text"
                                autoFocus={true}
                            />

                        </div>
                        <div className="bloginput">
                            <input
                                className="writeInput"
                                placeholder="Title"
                                type="text"
                                autoFocus={true}
                            />

                        </div>
                    </div>


                </div>
                <div className="writeFormGroup">
                    <textarea
                        className="writeInput writeText"
                        placeholder="Tell your story..."
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
