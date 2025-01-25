
// import { useNavigate } from "react-router-dom";
import { Footer, Header } from "@/components";
import  Sidebar  from "../../components/Sidebar";
import GenerateRegistrationCode from "@/components/Group/GenerateRegistrationCode";



const RegistrationCodes = () => {

  // const navigate = useNavigate();




  


  return (
    <>
      <div className="h-auto border-t dark:border-blackSecondary border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
        <Sidebar />
   

        <div className="dark:bg-blackPrimary bg-whiteSecondary w-full ">
        <Header />
          <div className="w-full pl-3">
            <h2 className="text-3xl text-black font-bold xl:ml-24  py-6">Registration Codes</h2>

        <GenerateRegistrationCode />
          </div>
          <Footer/>
        </div>
      </div>
    </>
  );
};

export default RegistrationCodes;

