import React from 'react';
import PropTypes from 'prop-types';
export const ThemesContext = React.createContext({});

export const ThemesProvider = ({children}) => {
const [themes,setThemes] = React.useState('dark');
const [nav,setNav] = React.useState(true);
window.localStorage.setItem('themeMode',themes);

const darkTheme = ()=>{
    setThemes(() => 'dark');
    window.localStorage.setItem('themeMode',themes);
}
const lightTheme = ()=>{
    setThemes(() => 'light');
    window.localStorage.setItem('themeMode',themes);
}

return(
    <ThemesContext.Provider value={{themes,darkTheme,lightTheme,nav,setNav}}>
        {children}
    </ThemesContext.Provider>
)
}
ThemesProvider.propTypes = {
    children:PropTypes.node.isRequired
}