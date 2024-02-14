
export function Topbar({name}){
    
    return <div className="flex h-14 justify-between shadow">
        <div className="flex flex-col justify-center h-full ml-6">
            <h3 className="font-semibold font-sans tracking-wide text-2xl">hlopay</h3>
        </div>
        <div className="flex justify-center">
            <div className="flex flex-col justify-center h-full mr-4">
                <h5 className="text-lg font-normal">Hello</h5>
            </div>
            <div className="flex justify-center rounded-full h-10 w-10 bg-slate-200 mt-2 mr-4">
                <div className="flex flex-col justify-center h-full text-xl">{name[0].toUpperCase()}</div>
            </div>
        </div>
    </div>
}