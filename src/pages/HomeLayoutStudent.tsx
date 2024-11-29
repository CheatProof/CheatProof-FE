import { Outlet } from "react-router-dom"
import { Footer } from "../components"


const HomeLayoutStudent = () => {
  return (
    <>
    {/* <HeaderStudent /> */}
    <Outlet />
    <Footer />
    </>
  )
}
export default HomeLayoutStudent;