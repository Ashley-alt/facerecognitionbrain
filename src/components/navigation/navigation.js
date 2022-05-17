import React from "react";

const Navigation = ({ onRouteChange }) => {
    return(
        <nav style={({display: 'flex', justifyContent: 'flex-end'})}>
            <p onCLick={onRouteChange("Signin")} className= 'f3 link dim white underline pa3 pointer'>Sign Out</p>
        </nav>
    );
}

export default Navigation; 