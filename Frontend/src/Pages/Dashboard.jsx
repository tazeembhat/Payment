import { Balance } from "../Components/Balance";
import { Topbar } from "../Components/Topbar";
import { Users } from "../Components/Users";
import { useSearchParams } from "react-router-dom"

export function Dashboard(){
    const name = localStorage.getItem("name");

    return <div>
        <Topbar name={name}/>
        <Balance />
        <Users />
    </div>
}