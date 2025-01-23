import { ChevronFirst, ChevronLast } from "lucide-react"
import logo from "../assets/transCheatProof.png"
// import profile from "../assets/profile.jpg"
import { createContext, useContext, useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const SidebarContext = createContext<any>(null);

export default function Sidebar({ children,name,page,to}:any) {
    const [expanded, setExpanded] = useState(true)
    return (
        <>
            <aside className=" sticky top-0 h-[100vh]">
                <nav className="h-full  flex flex-col bg-white border-r shadow-sm">
                    <div className="p-4 pb-2 flex justify-between items-center">
                 {expanded &&   <Link className="flex items-center" to={to}>
      <img className="w-[3.5rem] p-2" src={logo} alt="Logo" />
      <span className="dark:text-whiteSecondary text-blackPrimary text-xl font-bold hidden sm:block">
        {name?"Test Editor":"CheatProof"}
      </span>
    </Link>}
                        <button onClick={() => setExpanded((curr) => !curr)} className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">
                            {expanded ? <ChevronFirst /> : <ChevronLast />}
                        </button>
                    </div>

                    <SidebarContext.Provider value={{ expanded }}>
                        {expanded ? name? <p className="text-center">{name}/ <br />{page}</p>:<p></p>:<p>    </p>}

                        <ul className="flex-1 px-3">{children}</ul>
                    </SidebarContext.Provider>

                </nav>
            </aside>
        </>
    )
}

export function SidebarItem({ icon, text, active, alert,to }:any) {
    const navigate = useNavigate()
    const { expanded }:any = useContext(SidebarContext)
    return (
        <li onClick={()=>to && navigate(to)} className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${active ? "bg-gradient-to-tr from-color1/30 to-color2/30 text-color1" : "hover:bg-color1/10 text-gray-600"}`}>
            {icon}
            <span className={`overflow-hidden transition-all ${expanded ? "w-48 ml-3" : "w-0"}`}>{text}</span>
            {alert && (
                <div className={`absolute right-2 w-2 h-2 rounded bg-color1 ${expanded ? "" : "top-2"}`}>

                </div>
            )}

            {!expanded && (
                <div className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-color1 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>
                    {text}
                </div>
            )}
        </li>
    )
}




export function MultilevelSidebarItem({ icon, text, active, alert, to,children }: any) {
    const { expanded }: any = useContext(SidebarContext);
    const [open, setOpen] = useState(active);

    const toggleOpen = () => setOpen(!open);
    const navigate = useNavigate();

    return (
        <li
        
         className="relative list-outside list-none">
            <div
                onClick={()=>{{to &&
                    navigate(to)};toggleOpen()}}
                className={`flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
                    active ? "bg-gradient-to-tr from-color1/30 to-color2/30 text-color1" : "hover:bg-color1/10 text-gray-600"
                }`}
            >
                {icon}
                <span className={`overflow-hidden transition-all ${expanded ? "w-48 ml-3" : "w-0"}`}>{text}</span>
                {children && (
                    <span className="ml-auto">
                        {open ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </span>
                )}
                {alert && (
                    <div className={`absolute right-2 w-2 h-2 rounded bg-color2 ${expanded ? "" : "top-2"}`} />
                )}
            </div>

            {open && children && (
                <ul className={`pl-2 transition-all ${expanded ? "block" : "hidden"}`}>
                    {children.map((child: any, index: number) => (
                        <MultilevelSidebarItem key={index} {...child} />
                    ))}
                </ul>
            )}
        </li>
    );
}
