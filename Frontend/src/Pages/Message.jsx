import { useSearchParams } from "react-router-dom";
import { Button } from "../Components/Button";
import {useNavigate} from "react-router-dom"

export function MessageSuccess(){
    const [searchParams] = useSearchParams();
    const msg = searchParams.get("msg");
    const navigate = useNavigate();
    
    return <div className="flex justify-center items-center h-screen bg-gray-200">
        <div className="flex flex-col h-max items-center justify-center">
            <div className="flex flex-col justify-center items-center border shadow-lg rounded-lg max-w-md bg-white h-min w-96 text-card-foreground p-4">
                <div className="mt-4 flex justify-center rounded-full bg-green-500 h-14 w-14">
                    <div className="flex justify-center items-center">
                        <div>
                            <svg style={{color: "white"}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="5" stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                        </div>
                    </div> 
                </div>
                <div className="justify-center p-6">
                    <h4 className="text-xl font-normal">{msg}</h4>
                </div>
                <div className="justify-center mb-2">
                    <Button onClick={()=>{
                        navigate("/dashboard");
                    }} label={"Go to Dashboard"} />
                </div>
            </div>        
        </div>
    </div>
}

export function MessageFailure(){
    const [searchParams] = useSearchParams();
    const msg = searchParams.get("msg");
    const nav = searchParams.get("goto");
    const navigate = useNavigate();

    return <div className="flex justify-center items-center h-screen bg-gray-200">
        <div className="flex flex-col h-max items-center justify-center">
            <div className="flex flex-col justify-center items-center border shadow-lg rounded-lg max-w-md bg-white h-min w-96 text-card-foreground p-4">
                <div className="mt-4 flex justify-center rounded-full bg-red-500 h-14 w-14">
                    <div className="flex justify-center items-center">
                        <div>
                            <svg style={{color: "white"}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </div>
                    </div> 
                </div>
                <div className="justify-center p-6">
                    <h4 className="text-xl font-normal">{msg}</h4>
                </div>
                <div className="justify-center mb-2">
                    <Button onClick={()=>{
                        navigate(nav);
                    }} label={"Close"} />
                </div>
            </div>        
        </div>
    </div>
}