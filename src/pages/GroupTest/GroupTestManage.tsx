import { Footer, Header, Sidebar } from '../../components';
import TestDetails from '../../components/GroupTest/GroupTestCreation';

const GroupTestMange = ()=>{
    
    return (
        <>
        <div className="h-auto border-t dark:border-blackSecondary border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
        
        <Sidebar />
         <div className="dark:bg-blackPrimary bg-whiteSecondary w-full ">
         <Header />
         <div className="w-full pl-3">
         
              {/* <h2 className="text-3xl text-black font-bold mb-6 py-6">Question Bank</h2> */}
              
         
        <TestDetails/>
          </div>
          <Footer/>
          </div>
          </div>
          </>
    )
}

export default GroupTestMange;