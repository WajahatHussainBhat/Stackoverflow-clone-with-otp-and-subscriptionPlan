import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import "./ChatBot.css";
import "./ChatBotDarkMode.css"
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import { useSelector } from "react-redux";

const API_KEY = "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";

const ChatBot = () => {
  const navigate = useNavigate();
  const [typing, setTyping] = useState(false);
  const darkMode = useSelector((state) => state.themeReducer.darkMode);

  const verifyOTP = () => {
    const isVerified = localStorage.getItem("ChatBotVerified");
    if (!isVerified) {
      alert("Verify your Mobile Number");
      navigate("/OTPverify");
    }
  };

  useEffect(() => {
    verifyOTP();
    const removeItemTimeout = setTimeout(() => {
      localStorage.removeItem("ChatBotVerified");
    }, 60 * 60 * 1000 );
    return () => clearTimeout(removeItemTimeout);
  }, [navigate]);

  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm ChatBot! Ask me anything!",
      sentTime: "just now",
      sender: "ChatBot",
    },
  ]);

  const systemMessage = {
    role: "system",
    content:
      "Explain things like you're talking to a software professional with 2 years of experience.",
  };

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: "outgoing",
      sender: "user",
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);

    setTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatBot") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...apiMessages],
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: "ChatBot",
          },
        ]);
        setTyping(false);
      });
  }

  return (
    <div className={`chatBot-container ${darkMode ? "chatBot-container-dark" : ""}`}>
      <MainContainer
        style={{
          height:"30rem",
          width: "70%",
          boxShadow:
            "0 10px 25px rgb(0 0 0 /5%), 0 20px 48px rgb(0 0 0 /5%), 0 1px 4px rgb(0 0 0 /10%)",
        }}
      >
        <ChatContainer >
          <MessageList
            scrollBehavior="smooth"
            typingIndicator={
              typing ? <TypingIndicator content="Chatbot is typing" /> : null
            }
            style={{ backgroundColor: darkMode ? "black" : "rgb(255 144 67 / 19%)" }}>
          
            {messages.map((message, i) => {
              return <Message key={i} model={message} />;
            })}
          </MessageList>
          <MessageInput placeholder="Type message here" onSend={handleSend} />
        </ChatContainer>
      </MainContainer>
    </div>
  );
};

export default ChatBot;
