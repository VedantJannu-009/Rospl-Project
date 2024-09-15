import "./userInfo.css"
import { useUserStore } from "../../../../../../../ROSLP/Rospl-Project/react-firebase-chat/lib/userStore";

const Userinfo = () => {

    const { currentUser} = useUserStore();
    return(
        <div className="userinfo">
           <div className="user">
            <img src={currentUser.avatar || "./avatar.png"} alt="" />
             <h6>{currentUser.username} </h6>
            </div> 

            <div className="icons">
                <img src="./more.png" alt="" />
                <img src="./video.png" alt="" />
                <img src="./edit.png" alt="" />
            </div>
        </div>
    )
}

export default Userinfo