import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";


export const AdminRoutes = () => {


    const { user } = useContext(UserContext);

    if (!user) {
        return <Navigate to="/login" />
    }


    if (user.Role === "ADMIN") {
        return (
            <Outlet />
        )
    }
    else {
        return (
            <h5>Unauthorized</h5>
        )
    }

}