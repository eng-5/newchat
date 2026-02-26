import {useContext} from 'react';
import Nav from './Nav/nav';
import Main from './Main/main';
import { ThemesContext } from './providers/ThemesProvider';
import './App.scss';


const App = () => {
  const {themes} = useContext(ThemesContext);
  return(
    <div className='container'>
    <Nav/>
    <Main themes={themes}/>
    </div>
  );
};

export default App;
