import { Outlet } from "react-router-dom"


export const MainPage = () => {

    return (
        <div className="main-container">
            
            <Outlet/>
        </div>
    )
}