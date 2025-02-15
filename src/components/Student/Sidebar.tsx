import {  Home, Inbox, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Logo from "../../assets/transCheatProof.png";

import { Link } from "react-router-dom";
// Menu items.


export function AppSidebar() {
    // const user:any = localStorage.getItem("user");

    const items = [
        {
          title: "Home",
          url: "/student-dashboard",
          icon: Home,
        },
        {
          title: "Result",
          url: "/student-dashboard/results",
          icon: Inbox,
        },

        {
          title: "Profile Settings",
          url: `/student-dashboard/profile`,
          icon: Settings,
        },
      ]
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="my-3">  
            <Link className="flex items-center py-4" to="/student-dashboard">
          {/* <FaReact className="text-4xl dark:text-whiteSecondary text-blackPrimary hover:rotate-180 hover:duration-1000 hover:ease-in-out cursor-pointer" /> */}
          <img className="w-[4rem] p-3" src={Logo}/>
          <span className="dark:text-whiteSecondary text-fore text-xl font-bold">CheatProof</span>
        </Link></SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="mt-8">
              {items.map((item) => (
                <SidebarMenuItem className="flex  items-center" key={item.title}>
                  <SidebarMenuButton className="" asChild>
                    <Link to={item.url}>
                      <item.icon className="text-fore py-4"/>
                      <span className="text-fore text-lg  font-semibold">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
