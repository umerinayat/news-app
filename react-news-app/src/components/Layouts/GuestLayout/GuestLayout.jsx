import React from "react";
import { Navigate, Outlet } from "react-router";
import { useStateContext } from "../../../contexts/ContextProvider";

const GuestLayout = () => {

    const {token} = useStateContext();

    if(token) {
        return <Navigate to="/" />
    }
    
    return (
       <div className="container-fluid overflow-hidden p-0">
           <div className="row">
            <div className="col-sm-6">
            <div className="row">
                    <div className="col-sm-12">
                        <div className="display-6 pt-3 ps-4 font-gh">News</div>
                    </div>
                </div>
                <div className="row h-75 d-flex flex-column justify-content-center">
                    <div className="col-sm-12">
                        <Outlet />
                    </div>
                </div>
            </div>
            <div className="col-sm-6">
                <div className="bg-image"></div>
            </div>
           </div>
       </div>
    );
};

export default GuestLayout;