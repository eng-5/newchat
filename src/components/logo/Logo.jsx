import './logo.scss';
import ChatGPTLogo from '../../assets/chatgpt-icon.svg';

const Logo = () => {
  return (
    <div className="logo">
      <img src={ChatGPTLogo}/> 
      <h2 className="logo__heading">ChatGPT</h2>
      </div>
  )
};

export default Logo;
