import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getReviews } from '../../actions/reviews'
import propTypes from 'prop-types'
// import './Home.css';
const ViewReviews = (props) => {

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const [reviewDisplays, setReviewDisplays] = useState([])
    const [sectionDisplays, setSectionDisplays] = useState([])
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(2)
    useEffect(() => {
        props.getReviews()
    }, [])
    


    useEffect(() => {
        setReviewDisplays([])
        if (props.reviews.length>0) {
            setReviewDisplays([...(props.reviews.map(review => {
                const datePosted = new Date(review.date_posted)
                return (
                    <div key={review.id} className="box" data-aos="fade-right">
                        <p style={{ height: 'inherit', width: 'inherit', padding: '0.5rem', margin: '0px' }}>{review.message}</p>
                        <h3>{review.reviewer_first_name + " " + review.reviewer_last_name}</h3>
                        <span>{monthNames[datePosted.getMonth()]} {datePosted.getDate()}</span>
                        <img src={'http://localhost:8000' + review.reviewer_profile_pic} alt="" />
                    </div>
                )
            }))]);
            

        }
    }, [props.reviews])

    useEffect(()=>{
        setSectionDisplays(reviewDisplays.slice(start, end))
    },[reviewDisplays])


    const toNext = () => {
        if (reviewDisplays.length > end) {
            setSectionDisplays(reviewDisplays.slice(start+2, end+2)) 
            setStart(start + 2)
            setEnd(end + 2)
                       
        }

    }

    const toPrevious = () => {
        if (start >= 2) {
            setSectionDisplays(reviewDisplays.slice(start-2, end-2))
            setStart(start - 2)
            setEnd(end - 2)
            
        }

    }




    return (
        <div class="container bg-transparent carousel slide" data-ride="carousel" >
            <a class="carousel-control-prev" onClick={toPrevious} role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" ></span>
                <span class="sr-only">Previous</span>
            </a>

            <h1 class="heading"><span>'</span> people's review <span>'</span></h1>

            <div class="box-container">

                {sectionDisplays}

                {/* <div class="box" data-aos="fade-right">
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur accusantium error numquam dolore atque. Atque totam ad sint ducimus! Maxime!</p>
                    <h3>someone's name</h3>
                    <span>jan 5, 2021</span>
                    <img src="images/aboutimage.jpg" alt="" />
                </div> */}

                {/* <div class="box" data-aos="fade-up">
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur accusantium error numquam dolore atque. Atque totam ad sint ducimus! Maxime!</p>
                    <h3>someone's name</h3>
                    <span>jan 7, 2021</span>
                    <img src="images/aboutimage.jpg" alt="" />
                </div> */}

                {/* <div class="box" data-aos="fade-left">
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur accusantium error numquam dolore atque. Atque totam ad sint ducimus! Maxime!</p>
                    <h3>someone's name</h3>
                    <span>jan 10, 2021</span>
                    <img src="images/aboutimage.jpg" alt="" />
                </div> */}

            </div>

            <a class="carousel-control-next" onClick={toNext} role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>

        </div>
    )

}

ViewReviews.propTypes = {
    getReviews: propTypes.func.isRequired,
    reviews: propTypes.array.isRequired
}
const mapStateToProps = state => ({
    reviews: state.reviews.reviews
})

export default connect(mapStateToProps, { getReviews })(ViewReviews)