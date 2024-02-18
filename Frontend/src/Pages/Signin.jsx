import { useEffect, useState } from "react";
import { BottomWarning } from "../Components/BottomWarning";
import { Button } from "../Components/Button";
import { Heading } from "../Components/Heading";
import { InputBox } from "../Components/InputBox";
import { SubHeading } from "../Components/SubHeading";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export function Signin(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return <div className="flex justify-center bg-slate-300 h-screen">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-4 h-max px-6">
                <Heading label={"Sign In"} />
                <SubHeading label={"Enter your credentials to access your account"} />
                <InputBox onChange={(e) => {
                    setUsername(e.target.value);
                }} label={"Email"} placeholder={"user@example.com"} />
                <InputBox onChange={(e) => {
                    setPassword(e.target.value);
                }} label={"Password"} placeholder={"********"} />
                <div className="pt-4">
                    <Button label={"Sign In"} onClick={async ()=>{
                        const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                            username,
                            password
                        }).catch((error)=>{
                            if(error.response){
                                navigate(`/messagefailure?msg=${error.response.data.message}&goto=/`)
                            }
                        });

                        {if(response){
                            localStorage.setItem("token", response.data.token);
                            localStorage.setItem("name", response.data.firstName);
                            navigate("/dashboard")
                        }}
                    }} />
                </div>
                <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
            </div>
        </div>
    </div>
}