import axios from "axios"
import { useState } from "react"
import { BottomWarning } from "../Components/BottomWarning"
import { Button } from "../Components/Button"
import { Heading } from "../Components/Heading"
import { InputBox } from "../Components/InputBox"
import { SubHeading } from "../Components/SubHeading"
import { useNavigate } from "react-router-dom"

export function Signup(){
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return <div className="flex bg-slate-300 h-screen justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-4 h-max px-6">
                <Heading label={"Sign Up"} />
                <SubHeading label={"Enter information to create an account"} />
                <InputBox onChange={e => {
                    setFirstName(e.target.value);
                }} label={"First Name"} placeholder={"Sharukh"} />
                <InputBox onChange={e => {
                    setLastName(e.target.value);
                }} label={"Last Name"} placeholder={"Khan"} />
                <InputBox onChange={e => {
                    setUsername(e.target.value);
                }} label={"Email"} placeholder={"skhan@example.com"} />
                <InputBox onChange={e => {
                    setPassword(e.target.value);
                }} label={"Password"} placeholder={"********"} />
                <div className="pt-4">
                    <Button label={"Sign Up"} onClick={async ()=>{
                        const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                            firstname,
                            lastname,
                            username,
                            password
                        });
                        localStorage.setItem("token", response.data.token);
                        navigate(`/dashboard?name=${firstname}`);
                    }} />
                </div>
                <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"}/>
            </div>
        </div>
    </div>
}