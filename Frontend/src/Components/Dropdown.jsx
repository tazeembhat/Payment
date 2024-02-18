import {useNavigate} from "react-router-dom";
import axios from "axios";

export function UserDropdown(){
    const navigate = useNavigate();
    
    const handleLogout = () => {
        localStorage.removeItem("name");
        localStorage.removeItem("token");
        navigate("/");
    }

    const handleDelete = async () => {
        const token = localStorage.getItem("token");

        await axios.delete("http://localhost:3000/api/v1/user/delete", {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).catch((error)=>{
            if(error.response){
                navigate(`/messagefailure?msg=${error.response.data.message}&goto=/signup`)
            }
            return;
        })
        
        localStorage.removeItem("name");
        localStorage.removeItem("token");
        navigate("/signup");
    }

    return <div id="dropdownHover" className="bg-white divide-y showdow-lg rounded-lg 
    divide-gray-100 dark:bg-gray-700 w-40 cursor-pointer z-10">
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHoverButton">
            <li>
                <a onClick={()=>{
                    navigate("/updateuser")
                }} className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    Update Profile</a>
            </li>
            <li>
                <a onClick={handleDelete} className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    Delete Account</a>
            </li>
            <li>
                <a onClick={handleLogout} className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    Logout</a>
            </li>
        </ul>
    </div>
}