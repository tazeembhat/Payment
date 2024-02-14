import { Balance } from "../Components/Balance";
import { Topbar } from "../Components/Topbar";
import { Users } from "../Components/Users";
import { useSearchParams } from "react-router-dom"

export function Dashboard(){
    const [searchParams] = useSearchParams();
    const name = searchParams.get("name");
    
    return <div>
        <Topbar name={name}/>
        <Balance value={2000} />
        <Users />
    </div>
}