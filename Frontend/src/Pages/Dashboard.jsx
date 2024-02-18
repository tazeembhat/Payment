import { Balance } from "../Components/Balance";
import { Topbar } from "../Components/Topbar";
import { Users } from "../Components/Users";
import { useSearchParams } from "react-router-dom"

export function Dashboard(){
    return <div>
        <Topbar />
        <Balance />
        <Users />
    </div>
}