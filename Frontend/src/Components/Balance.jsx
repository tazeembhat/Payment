export function Balance({value}){
    return <div className="flex gap-4 p-5 mt-5">
        <div className="font-bold text-xl">Your balance:</div>
        <div className="font-semibold text-lg">₹ {value}</div>
    </div>
}