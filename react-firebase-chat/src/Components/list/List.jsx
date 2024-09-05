import Userinfo from "./userinfo/Userinfo.jsx"
import "./list.css"
import ChatList from "./chatList/ChatList.jsx"



const List = () => {
    return(
        <div className="list">
            <Userinfo/>
            <ChatList/>

        </div>
    )
}

export default List