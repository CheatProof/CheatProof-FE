
import {
    // ActivitiesByCountry,
    // ActivitiesByDevices,
    // ActivityByTime,
    // ConversionRateBySource,
    Sidebar,
    // Stats,
    // Welcome,
    
  } from "../../components";
import CategoryManage from "../../components/Categories/CategoryManage";
 


const CategoryManagePage = ()  => {
    return (
        <>
      <div className="h-auto border-t dark:border-blackSecondary border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
      
      <Sidebar />
       <div className="dark:bg-blackPrimary bg-whiteSecondary w-full pt-6 pl-9 max-sm:pt-6 max-sm:pl-5 flex max-[1700px]:flex-wrap gap-x-10 max-[400px]:pl-2">
       <div className="w-full pl-3">
       
            <h2 className="text-3xl text-black font-bold mb-6 py-6">Question Bank</h2>
            
       
<CategoryManage/>
        </div>
        </div>
        </div>
        </>
    );
};

export default CategoryManagePage;