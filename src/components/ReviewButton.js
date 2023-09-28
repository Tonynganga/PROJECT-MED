import React, { useEffect, useState } from 'react';
import './pages/Main.css';
import { Link } from 'react-router-dom';
import ReviewModal from './ReviewModal';


function ReviewButton() {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <Link>
            <button className='btn' onClick={() => setIsOpen(true)}>Add Review</button>
            <ReviewModal open={isOpen} onClose={() => setIsOpen(false)}>
                Fancy Modal
            </ReviewModal>
        </Link>
);
}

export default ReviewButton
