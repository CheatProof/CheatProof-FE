import { fetchStudentResultsBySession } from "@/api/test-session";
import { useEffect, useState } from "react";


const ManageResults = () => {
    const [results, setResult] = useState([]);

    const fetchResult = async () => {
        const data = await fetchStudentResultsBySession()
        // use the data to display results
        if (data.code === 200) {
            // Display results
            console.log(data.data)
            setResult(data.data)
            console.log(results)
        }
    }

    useEffect(() => {
        fetchResult() // Fetch results when component mounts or re-renders
        return () => {
            // Add cleanup logic here
        }
    },[])
    
    return (
    <>
        Hello

    </>)
}


export default ManageResults;