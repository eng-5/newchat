// import React,{useEffect,useState,useRef} from 'react';
// import ChatgptLogo from '../assets/chatgpt-icon.svg';
// import myProfilePics from '../assets/profile.jpg';
// import { MdSend } from "react-icons/md";
// import './main.scss';
// import {sendMsgToGemini} from '../api/chatgptApi';
// import ReactMarkDown from 'react-markdown';
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

// const main = ({themes}) => {
//   const [input, setInput] = useState("");
//   const [count,setCount] = useState(0)
//   const [responses, setResponses] = useState([
//     {
//       message:"Happy day",
//       isbot:false
//     },
//   ])
//   const scrollTarget = useRef(null);
//   const inputTarget = useRef(null);

//   useEffect(()=>{
//     scrollTarget.current.scrollIntoView();
//     if(responses.length > 1){
//       setCount(1)
//     }else{
//       setCount(0)
//     }
//   },[responses])
  
//   const sendMsg = async (e)=>{
//     const inputText =input;
//     setResponses([
//       ...responses,{message:inputText,isbot:false}
//     ]);
//     setInput("");
//     inputTarget.current.focus();
//     try{
//       const response = await sendMsgToGemini(inputText);
//     await setResponses([
//       ...responses,
//       {message:inputText,isbot:false},
//       {message:response,isbot:true}
//     ]);
//     }catch(err){
//       alert(err);
//     }
//     console.log(responses);
    
  
//   }
//   return (
//     <div className="main__container">
//       <section className={`message__section ${themes === 'light'?'dark-text':''}`}>
//         <div className="scroll__div">
//           {
//             responses.map((response,i)=> {
//               if(i>0){
//                 return (
//                 <div key={i} className={`prompt-text ${response.isbot?"ai__bg":""}`}>
//             <div className="image">
//             <img src={response.isbot?ChatgptLogo:myProfilePics} alt="logo" />
//             </div>
//             <div className="paragraph">
//             <p>
              
//               <ReactMarkdown
//   components={{
//     code({ node, inline, className, children, ...props }) {
//       const match = /language-(\w+)/.exec(className || '');
      
//       // If it's a code block (like ```javascript), use the highlighter
//       return !inline && match ? (
//         <SyntaxHighlighter
//           style={vscDarkPlus}
//           language={match[1]}
//           PreTag="div"
//           {...props}
//         >
//           {String(children).replace(/\n$/, '')}
//         </SyntaxHighlighter>
//       ) : (
//         // If it's just a single word in code tags, use a normal code tag
//         <code className={className} {...props}>
//           {children}
//         </code>
//       );
//     }
//   }}
// >
//   {response.message}
// </ReactMarkdown>
//             </p>
//             </div>
//           </div>
//                 )

//               }else{
//                 return(
//                 count === 0 && (
//                   <p className={`${themes === 'light'?'dark-adjust-text':''}`} style={{textAlign:"center",position:'absolute',top:"50%",left:"50%",transform:"translate(-50% ,-50%)", fontSize:"1.3rem"}}>Ask me anything, your dearest friend Gemini</p>
//                 )
//               )
//               }
//             }
//           )
//           }

//         {/* <div className="prompt-text ai__bg">
//           <div className="image">
//           <img src={ChatgptLogo} alt="ChatGPT logoo" />
//           </div>
//           <div className="paragraph">
//           <p>Hi,I am ChatGpt, a state-of-the-art language model developed by OpenAI. Im designed to understand and generate human like text based on the input I recieve. You can ask me  questions, have conversations, seek information or even request assistance with various task. Just let me know how i can help you!</p>

//           </div>
//         </div>
//         <div className="prompt-text">
//           <div className="image">
//           <img src={ChatgptLogo} alt="ChatGPT logo" />
//           </div>
//           <div className="paragraph">
//           <p>Introduce your self</p>
//           </div>
//         </div> */}


//         <div ref={scrollTarget}/>
//         </div>
//       </section>

//       <section className="input__section">
//         <div className="input__container">
//         <input className={`${themes === 'light'?'input-whiteMode':''}`} ref={inputTarget} type="text" placeholder='Send a message' 
//         onChange={(e)=>{
//           setInput(e.target.value);
//         }}
//         value={input}
//         onKeyDown={(e)=>{
//           if(e.keyCode === 13 || e.which === 13){
//             sendMsg();
//           }
//         }}
//         />
//         <div className={`input__icon ${themes === 'light'?'sendBtnLight':''}`} onClick={sendMsg}><MdSend/></div>
//         </div>
//       </section>
//       <footer>
//         ChatGPT may produce inaccurate about people places or facts. ChatGPT August 10 version
//       </footer>
    
//     </div>
//   );
// };

// export default main;

import React, { useEffect, useState, useRef } from "react";
import ChatgptLogo from "../assets/chatgpt-icon.svg";
import myProfilePics from "../assets/profile.jpg";
import { MdSend } from "react-icons/md";
import "./main.scss";
import { sendMsgToGemini } from "../api/chatgptApi";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Main = ({ themes }) => {
  const [input, setInput] = useState("");
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);

  const scrollTarget = useRef(null);
  const inputTarget = useRef(null);

  // ✅ auto-scroll
  useEffect(() => {
    scrollTarget.current?.scrollIntoView({ behavior: "smooth" });
  }, [responses, loading]);

  // ✅ streaming typing effect
  const streamText = async (fullText) => {
    let current = "";

    setResponses((prev) => [
      ...prev,
      { message: "", isbot: true, streaming: true },
    ]);

    for (let i = 0; i < fullText.length; i++) {
      current += fullText[i];

      await new Promise((r) => setTimeout(r, 0.000001));

      setResponses((prev) => {
        const copy = [...prev];
        copy[copy.length - 1] = {
          ...copy[copy.length - 1],
          message: current,
        };
        return copy;
      });
    }

    // finish streaming
    setResponses((prev) => {
      const copy = [...prev];
      copy[copy.length - 1].streaming = false;
      return copy;
    });
  };

  // ✅ send message (LOCKED while loading)
  const sendMsg = async () => {
    if (!input.trim() || loading) return;

    const inputText = input;

    // add user message
    setResponses((prev) => [
      ...prev,
      { message: inputText, isbot: false },
    ]);

    setInput("");
    inputTarget.current?.focus();
    setLoading(true);

    try {
      const response = await sendMsgToGemini(inputText, responses);
      await streamText(response);
    } catch (err) {
      console.error(err);
      alert("Failed to get response");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main__container">
      <section
        className={`message__section ${
          themes === "light" ? "dark-text" : ""
        }`}
      >
        <div className="scroll__div">
          {/* empty state */}
          {responses.length === 0 && !loading && (
            <p
              className={`${
                themes === "light" ? "dark-adjust-text" : ""
              }`}
              style={{
                textAlign: "center",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50% ,-50%)",
                fontSize: "1.3rem",
              }}
            >
              Ask me anything, your dearest friend Gemini
            </p>
          )}

          {/* messages */}
          {responses.map((response, i) => (
            <div
              key={i}
              className={`prompt-text ${response.isbot ? "ai__bg" : ""}`}
            >
              <div className="image">
                <img
                  src={response.isbot ? ChatgptLogo : myProfilePics}
                  alt="logo"
                />
              </div>

              <div className="paragraph">
                <ReactMarkdown
                  components={{
                    code({ inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(
                        className || ""
                      );

                      if (!inline && match) {
                        const codeString = String(children).replace(/\n$/, "");

                        return (
                          <div style={{ position: "relative" }}>
                            <CopyToClipboard text={codeString}>
                              <button className="copy-btn">Copy</button>
                            </CopyToClipboard>

                            <SyntaxHighlighter
                              style={vscDarkPlus}
                              language={match[1]}
                              PreTag="div"
                              {...props}
                            >
                              {codeString}
                            </SyntaxHighlighter>
                          </div>
                        );
                      }

                      return (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {response.message || ""}
                </ReactMarkdown>

                {/* blinking cursor */}
                {response.streaming && (
                  <span className="typing-cursor">▍</span>
                )}
              </div>
            </div>
          ))}

          {/* loading bubble */}
          {loading && (
            <div className="prompt-text ai__bg">
              <div className="image">
                <img src={ChatgptLogo} alt="logo" />
              </div>
              <div className="paragraph">
                <div className="loading-dots">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>
          )}

          <div ref={scrollTarget} />
        </div>
      </section>

      {/* input */}
      <section className="input__section">
        <div className="input__container">
          <input
            disabled={loading}
            className={`${themes === "light" ? "input-whiteMode" : ""}`}
            ref={inputTarget}
            type="text"
            placeholder={
              loading ? "Gemini is thinking..." : "Send a message"
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !loading) sendMsg();
            }}
          />

          <div
            className={`input__icon ${
              themes === "light" ? "sendBtnLight" : ""
            } ${loading ? "disabled" : ""}`}
            onClick={() => {
              if (!loading) sendMsg();
            }}
          >
            <MdSend />
          </div>
        </div>
      </section>

      <footer>
        Gemini may produce inaccurate information about people, places or facts.
      </footer>
    </div>
  );
};

export default Main;