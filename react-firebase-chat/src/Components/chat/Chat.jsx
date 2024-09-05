import { useEffect, useState } from "react";
import "./chat.css";
import EmojiPicker from "emoji-picker-react";
import { useRef } from "react";

const Chat = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <span>Janes</span>
            <p>nakpada</p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="" />
        </div>
      </div>
      <div className="chatMessages">
        <div className="center">
          <div className="message">
            <img src="./avatar.png" alt="" />
            <div className="texts">
              <p>
                Lorem ipsum dolor sit amet consectetur adtates atque amet quae
                vi dignissimos. Facere!
              </p>
              <span>1 min ago</span>
            </div>
          </div>
        </div>
        <div className="center">
          <div className="message own">
            <div className="texts">
              <p>
                Lorem ipsum dolor sit amet consectetur aut unde. Nam corporis
                quos porro sequi dignissimos. Facere!
              </p>
              <span>1 min ago</span>
            </div>
          </div>
        </div>
        <div className="center">
          <div className="message">
            <img src="./avatar.png" alt="" />
            <div className="texts">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repellendus debitis eius nostrum{" "}
              </p>
              <span>1 min ago</span>
            </div>
          </div>
        </div>
        <div className="center">
          <div className="message own">
            <div className="texts">
              <p>
                Lorem ipsum dolor sit amet consectetur adipinde. Nam corporis
                quos porro sequi dignissimos. Facere!
              </p>
              <span>1 min ago</span>
            </div>
          </div>
        </div>
        <div className="center">
          <div className="message">
            <img src="./avatar.png" alt="" />
            <div className="texts">
              <p>
                Lorem ipsum dolor sit amet consectetur Nam corporis quos porro
                sequi dignissimos. Facere!
              </p>
              <span>1 min ago</span>
            </div>
          </div>
        </div>
        <div className="center">
          <div className="message own">
            <div className="texts">
              <img
                src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
              <p>
                Lorem ipsum dolor sit amet consectetur Nam corporis quos porro
                sequi dignissimos. Facere!
              </p>
              <span>1 min ago</span>
            </div>
          </div>
        </div>
        <div className="center">
          <div className="message own">
            <div className="texts">
              <img
                src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
              <p>
                Lorem ipsum dolor sit amet consectetur Nam corporis quos porro
                sequi dignissimos. Facere!
              </p>
              <span>1 min ago</span>
            </div>
          </div>
          <div ref={endRef}></div>
        </div>
      </div>
      <div className="bottom">
        <div className="icons">
          <img src="./img.png" alt="" />
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input
          type="text"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="emoji">
          <img
            src="./emoji.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
          <div className="picker">
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button className="sendButton">Send</button>
      </div>
    </div>
  );
};

export default Chat;
