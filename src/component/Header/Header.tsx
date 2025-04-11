import { Outlet } from "react-router-dom"
import './header.css';
import taskImg from "../images/tasks.png";
import { UseContext } from "../ContextProvider/ContextProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
    const { toggleLightDark, lightdark } = UseContext()

    return (
        <>
            <header id="header" className="position-fixed top-0 left-0 w-100 z-1000 d-flex position-relative align-items-center justify-content-between p-4">
                <div className="logo-header">
                    <div className="logo-picture">
                        <img src={taskImg} alt="logo" />
                    </div>
                </div>
                <div className="light-dark-icon">
                    <input checked={lightdark === "light"} onChange={toggleLightDark} type="checkbox" id="toggle" />
                    <label htmlFor="toggle" className="label">
                        <div className="circle">
                            <FontAwesomeIcon icon={faSun} className="sun" />
                            <FontAwesomeIcon icon={faMoon} className="moon" />
                        </div>
                    </label>
                </div>
            </header>
            <main id="main">
                <Outlet />
            </main>
        </>
    )
}