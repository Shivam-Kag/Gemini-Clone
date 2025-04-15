import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
import "./Main.css";


function Main() {


  const {onSent , recentPrompt , showResult , loading , resultData ,setInput , input} = useContext(Context)

  const handleMicClick = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser.");
      return;
    }
  
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
  
    recognition.onresult = (event) => {
      const voiceInput = event.results[0][0].transcript;
      setInput(voiceInput);
      onSent(); // optional: auto-send
    };
  
    recognition.onerror = (event) => {
      console.error("Speech recognition error", event);
    };
  
    recognition.start();
  };
  


  return (
    <div className="main">

      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>

      <div className="main-container">

        {!showResult
        ?
        <>
        
        <div className="greet">
          <p>
            <span>Hello, Dev.</span>
          </p>
          <p>How can I help you today?</p>
        </div>

        <div className="cards">

          <div className="card">
            <p>Suggest beautiful places to see on an upcoming road trip</p>
            <img src={assets.compass_icon} alt="" />
          </div>

          <div className="card">
            <p>Briefly summarize this concept: urban planing</p>
            <img src={assets.bulb_icon} alt="" />
          </div>

          <div className="card">
            <p>Brainstrom team bonding activities for our work retreat</p>
            <img src={assets.message_icon} alt="" />
          </div>

          <div className="card">
            <p>Imporve the readability of the following code</p>
            <img src={assets.code_icon} alt="" />
          </div>

        </div>

        </>
        : <div className="result" > 
                <div className="result-title">
                  <img src={assets.user_icon} alt="" />
                  <p>{recentPrompt}</p>
                </div>

                <div className="result-data">
                  <img src={assets.gemini_icon} alt="" />
                  {loading 
                  ? <div className="loader">
                      <hr />
                      <hr />
                      <hr />
                  </div>
                  :
                  <p dangerouslySetInnerHTML={{__html:resultData}}></p>
                }
               
                </div>
        </div>
        }



        <div className="main-bottom">

                <div className="search-box">
                      <input
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && input.trim()) {
                          onSent();
                        }
                      }}
                      type="text"
                      placeholder="Enter a prompt here"
                    />
                    <div>
                        <img src={assets.gallery_icon} alt="" />

                        <img src={assets.mic_icon} alt="" onClick={handleMicClick} />

                {input ?<img   onClick={()=> onSent()} src={assets.send_icon} alt="" /> :null }        
                    </div>
                </div>

                <p className="bottom-info">
                    Gemini may display inaccurate info , including about people , so double-check its responses. Your privacy and Gemini Apps
                </p>

        </div>


      </div>
    </div>
  );
}

export default Main;
