import { useEffect, useState } from "react"
import { Button } from "./Button"
import axios from "axios";
import {useNavigate} from "react-router-dom"
import {jwtDecode} from "jwt-decode";

export function Users(){
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/user/bulk?filter="+filter)
        .then((response)=>{
            setUsers(response.data.user);
        })
    }, [filter]);

    return <div className="flex flex-col p-5">
        <div className="font-bold text-xl">
            Users
        </div>
        <div className="mt-4">
            <input onChange={(e)=>{
                setFilter(e.target.value);
            }} className="w-full border rounded border-slate-400 px-2 py-1" type="text" placeholder="Search Users..." />
        </div>
        <div>
            {users.map(user => <User key={user._id} user={user}/>)}
        </div>
    </div>
}

function User({user}){
    const navigate = useNavigate();
    return <div className="flex justify-between p-4">
        <div className="flex gap-3 justify-center">
            <div className="flex rounded-full bg-slate-200 h-11 w-11 justify-center">
                <div className="flex flex-col text-xl h-full justify-center font-medium">
                    {user.firstName[0].toUpperCase()}
                </div>   
            </div>
            <div className="flex flex-col justify-center h-full text-lg font-normal">
                {user.firstName} {user.lastName}
            </div>
        </div>
        <div>
            <Button label={"Send Money"} onClick={()=>{
                navigate(`/send?id=${user._id}&fname=${user.firstName}&lname=${user.lastName}`);
            }}/>
        </div>
    </div>
}