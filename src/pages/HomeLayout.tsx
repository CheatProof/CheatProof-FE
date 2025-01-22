import { Outlet } from "react-router-dom"
// import { Footer } from "../components"

const HomeLayout = () => {
  return (
    <>
    {/* <Header /> */}
    <Outlet />
    {/* <Footer /> */}
    </>
  )
}
export default HomeLayout