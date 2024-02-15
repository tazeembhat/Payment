import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import {useNavigate} from "react-router-dom"

export function SendMoney(){
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("fname");
    const lname = searchParams.get("lname");
    const [amount, setAmount] = useState(0);
    const navigate = useNavigate();

    return <div className="flex justify-center h-screen bg-gray-200">
        <div className="flex flex-col h-full justify-center">
            <div className="border h-min text-card-foreground max-w-md rounded-lg bg-white text-center p-4 
            shadow-lg space-y-4 w-96">
                <div className="flex flex-col space-y-1 p-4">
                    <h2 className="text-3xl font-bold text-center">Send Money</h2>
                </div>
                <div className="p-2 space-y-4">
                    <div className="flex justify-center items-center space-x-3">
                        <div className="rounded-full w-9 h-9 bg-slate-800 flex items-center justify-center">
                            <h4 className="text-medium text-lg text-white">{name[0].toUpperCase()}</h4>
                        </div>
                        <h3 className="text-xl font-medium">{name} {lname}</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-4">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed 
                            peer-disabled:opacity-70" htmlFor="amount">Amount(in ₹) </label>
                            <input onChange={(e)=>{
                                setAmount(e.target.value);
                            }} type="number"
                            className="flex text-center h-10 w-full rounded-md border border-slate-400 border-input 
                            bg-background px-3 py-2 text-md font-semibold" id="amount" placeholder="Enter Amount"/>
                        </div>
                        <button onClick={async ()=>{
                            await axios.post("http://localhost:3000/api/v1/account/transfer", {
                                amount:amount,
                                to: id
                            }, {
                                headers: {
                                    Authorization: "Bearer " + localStorage.getItem("token") 
                                }
                            }).catch((error)=>{
                                if(error.respose){
                                    navigate(`/messagefailure?msg=${error.response.data.message}&goto=/dashboard`)
                                }
                                return;
                            });
                            navigate(`/messagesuccess?msg="Transaction Successful"`)
                        }} className="justify-center rounded-md text-xl font-medium ring-offset-backgroud transition-colors h-10
                        px-4 py-2 w-full bg-green-700 text-white hover:bg-green-900">
                            Initiate Transfer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}