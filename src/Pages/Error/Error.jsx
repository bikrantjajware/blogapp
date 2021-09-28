import React from 'react'
import { useLocation } from 'react-router';
import './Error.css';

const Error = () => {
    const location = useLocation();
    const message = location.state ? location.state.message : undefined;

    
console.log(message);
    return (
        <div className="error">
            <h1> The Page is not available</h1>
         {
             message == undefined ?
             "" : <p> <strong> {message} </strong></p>
         }
        </div>
    )
}

export default Error
