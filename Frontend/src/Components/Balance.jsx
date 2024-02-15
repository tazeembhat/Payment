import { useEffect, useState } from "react"
import axios from "axios";

export function Balance(){
    const token = localStorage.getItem("token");
    const [balance, setBalance] = useState(0);

    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/account/balance", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response)=>{
            setBalance(response.data.balance);
        })
    }, []);
    return <div className="flex gap-4 p-5 mt-5">
        <div className="font-bold text-xl">Your balance:</div>
        <div className="font-semibold text-lg">₹ {balance}</div>
    </div>
}