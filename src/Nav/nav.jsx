import React,{useContext,useEffect,useState} from 'react';
// import {useThemesContext} from '../providers/ThemesProvider';
import Question from '../components/question/question';
import { MdHome } from "react-icons/md";
import { CiBookmark } from "react-icons/ci";
import { GiUpgrade } from "react-icons/gi";
import { FaPlus } from "react-icons/fa";
import './nav.scss';
import { ThemesContext } from '../providers/ThemesProvider';
import Logo from '../components/logo/Logo';
import Menu from '../assets/menu.svg';

const nav = () => {
  // const {themes,setThemes} = useContext(useThemesContext);
  // console.log(useThemesContext)
  const {themes,darkTheme,lightTheme,nav,setNav} = useContext(ThemesContext);
useEffect(()=>{
  if(themes === 'light'){
    document.body.classList.add('bg_light-mode');
  }else{
    document.body.classList.remove('bg_light-mode');
  }
},[themes]);
useEffect(() => {
 console.log(window.innerWidth);
 window.addEventListener('resize',(e)=>{
  if(window.innerWidth < 700){
    setHandle((prev)=>prev=true);
  }else{
    setHandle((prev)=>prev=false);
    setNav((prev)=>prev=true);
  }
 });

}, []);
const [handle, setHandle] = useState(false);

// setInterval(()=>{
//   console.log(nav);
// },3000)
  return <div className={`nav__container ${handle && (nav?'nav__flex-adjust':'nav__flex-readjust')}
  ${themes === 'light'? 'bg_light-mode':''}
  `}>
    {handle && <div className="nav__button" onClick={()=>{
  setNav((prev)=> !prev);
  console.log(nav);
}}>
<img src={Menu} alt="Menu" />  
</div>}
{nav && <>
    <div className="nav__top-side">
      <Logo/>
      <div className={`new__chat-nav ${themes === 'light'? 'white-text adjust-bg1':''}`}><FaPlus/>New Chat</div>
      <Question themes={themes} question="What is Programming?"/>
      <Question themes={themes} question="How to use Api?"/>
    </div>

    <div className="nav__ul__section">
    <ul>
      <li className={`${themes === 'light'?'text__lightMode':''}`}><MdHome className="listIcon"/>Home</li>
      <li className={`${themes === 'light'?'text__lightMode':''}`}><CiBookmark className="listIcon"/>Saved</li>
      <li className={`${themes === 'light'?'text__lightMode':''}`}><GiUpgrade className="listIcon"/>Upgrade to Pro</li>
    </ul>
    <div className='modes'>
      <div className="white-mode" onClick={()=>lightTheme()} ></div>
      <div className="dark-mode" onClick={()=>darkTheme()}></div>
    </div>
    </div>
    </>

}
  </div>;
};

export default nav;
