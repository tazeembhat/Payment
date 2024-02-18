import { useEffect, useState } from "react";
import { Heading } from "../Components/Heading";
import { InputBoxUpdate } from "../Components/InputBox";
import { SubHeading } from "../Components/SubHeading";
import { Button } from "../Components/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function UpdateUser(){
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/user/getuser", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res)=>{
            setFirstName(res.data.firstName);
            setLastName(res.data.lastName);
            setUsername(res.data.username);
            setPassword(res.data.password);
        })
    }, [])

    return <div className="flex justify-center bg-slate-300 h-screen">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-4 h-max px-6">
                <Heading label={"Edit Details"} />
                <SubHeading label={"Update Account Details"} />
                <InputBoxUpdate onChange={(input)=>{
                    setFirstName(input.target.value);
                }} label={"First Name"} placeholder={firstName} />
                <InputBoxUpdate onChange={(input)=>{
                    setLastName(input.target.value);
                }} label={"Last Name"} placeholder={lastName} />
                <InputBoxUpdate onChange={(input)=>{
                    setUsername(input.target.value);
                }} label={"Username"} placeholder={username} />
                <InputBoxUpdate onChange={(input)=>{
                    setPassword(input.target.value);
                }} label={"Password"} placeholder={password} />
                <div className="pt-4">
                    <Button label={"Update"} onClick={async ()=>{
                        const response = await axios.put("http://localhost:3000/api/v1/user/user", {
                            firstName,
                            lastName,
                            username,
                            password
                        }, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        })
                        navigate(`/messagesuccess?msg=${response.data.message}`)
                    }} />
                </div>
                <div>
                    <Button label={"Cancel"} onClick={()=>{
                        navigate("/dashboard");
                    }} />
                </div>
            </div>
        </div>
    </div>
}