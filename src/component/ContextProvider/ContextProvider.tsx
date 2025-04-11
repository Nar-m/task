import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import context from "../interface";

const contextApp = createContext({} as context);

type children = {
    children: ReactNode
}

export function UseContext() {
    return useContext(contextApp)
}

const ContextProvider = ({ children }: children) => {
    const [lightdark, setLightDark] = useState<"light" | "dark">("light")

    useEffect(() => {
        const storage = localStorage.getItem('lightdark') as "light" | "dark"
        if (storage) {
            setLightDark(storage)
        }
    }, [])

    const toggleLightDark = () => {
        const toggleTheme = lightdark === "light" ? "dark" : "light"
        setLightDark(toggleTheme)
        localStorage.setItem('lightdark', toggleTheme)
    }

    useEffect(() => {
        document.body.classList.toggle('dark-theme', lightdark === "light")
    }, [lightdark])

    return (
        <contextApp.Provider value={{ toggleLightDark, lightdark }}>{children}</contextApp.Provider>
    )
}

export default ContextProvider