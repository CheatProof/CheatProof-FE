
// import { useNavigate } from "react-router-dom";
import { Footer, Header } from "@/components";
import  Sidebar  from "../../components/Sidebar";
import AddGroupMembers from "@/components/Group/AddGroupUser";



const AddGroupUser = () => {

  // const navigate = useNavigate();




  


  return (
    <>
      <div className="h-auto border-t dark:border-blackSecondary border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
        <Sidebar />
   

        <div className="dark:bg-blackPrimary bg-whiteSecondary w-full ">
        <Header />
          <div className="w-full pl-3">
            <h2 className="text-3xl text-black font-bold  py-6">Adding Groups Members</h2>

        <AddGroupMembers/>
          </div>
          <Footer/>
        </div>
      </div>
    </>
  );
};

export default AddGroupUser;

