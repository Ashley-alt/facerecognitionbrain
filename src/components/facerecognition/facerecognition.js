import React from "react";

const Facerecognition = ({ imageURL }) => {
    return(
        <div className="center ma">
            <div className="absolute mt2">
                <img alt='' src={imageURL} width='300px' height='auto'/>
            </div>
        </div>
    );
}

export default Facerecognition; 