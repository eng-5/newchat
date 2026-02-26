import { LuMessageSquare } from "react-icons/lu";
import './question.scss'

const question = ({question,themes}) => {
  return <div className={`nav__question ${themes === 'light'? 'text__lightMode':''}`}><LuMessageSquare className="questionIcon"/>{question}</div>;
};

export default question;
