import { Link, Outlet, useLocation } from "react-router-dom"


export const MainPage = () => {
    let location = useLocation();
    return (
        <div className="main-container">
        {
            (location.pathname === '/' ? 
                <div className="header">
                    <p>Уже зарегистрированны?</p>
                    <Link to={'/login'} className="btn link">Войти</Link>
                </div>
                : null
                )
        }
            <Outlet/>
        </div>
    )
}