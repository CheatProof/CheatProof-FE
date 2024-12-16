// import { Button, Typography } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight, faCheckDouble, faClipboardList, faComputer, faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import {Typography} from "@mui/material";
import Button from "@mui/material";
import { WhiteButton } from "@/components";

import { FaBook, FaClipboardQuestion, FaUserGraduate } from "react-icons/fa6";
import { LuFileEdit } from "react-icons/lu";
import { GoChecklist } from "react-icons/go";
import { MdDashboard } from "react-icons/md";
import picture from "../assets/image.png"
// import editor from "../Assets/loginss.png"
// import dash from "../Assets/admindashboard.png"

// import NavBar from "../Components/NavBar";
// import Footer from "../Components/Footer";
import Testimonal1 from "../assets/1716884674044-1687426573382.jpeg"

// import Surveillance from "../Assets/8262066.jpg";
import Surveillance from "../assets/8262066.jpg";
import { useNavigate } from "react-router-dom";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { FcDocument } from "react-icons/fc";


const HomePage = () => {
  const navigate = useNavigate()

  const [activeIndex, setActiveIndex] = useState(0);

  const features = [
    {
      icon: <LuFileEdit className="text-fore" />,
      title: "Test Editor",
      description:
        "User-friendly interface to create and edit assessments. Options to format and customize tests.",
    },
    {
      icon: <FcDocument className="text-fore"/>,
      title: "Smooth Assignment of Tests",
      description:
        "Teachers can assign tests to students by sharing test link or by adding students to a group, where the test is shared.",
    },
    {
      icon: <FaClipboardQuestion className="text-fore"/>,
      title: "Question Bank",
      description:
        "Manage a repository of different types of questions including MCQs, True & False, Free Text and more!.",
    },
    {
      icon: <GoChecklist className="text-fore"/>,
      title: "Monitoring System",
      description:
        "Monitoring features such as browser control and noise detection assist educators in supervising students during assessments.",
    },
    {
      icon: <FaBook className="text-fore"/>,
      title: "A.I Proctoring",
      description:
        "Advanced A.I proctoring features including Head-Pose Detection and Gaze Tracker add an extra layer of security during assessments for teachers aid.",
    },
    {
      icon: <LiaChalkboardTeacherSolid className="text-fore"/>,
      title: "Identity Verification",
      description:
        "Continuous Identity Verification mechanism ensures the credibility of assessments conducted via CheatProof by preventing unauthorized individuals from taking the test on behalf of the candidate.",
    },
    {
      icon: <MdDashboard className="text-fore"/>,
      title: "Personalized Dashboards",
      description:
        "CheatProof Offers Personalized Dashboards for Teachers & Students, ensuring smooth user experience.",
    },
    {
      icon: <FaUserGraduate  className="text-fore"/>,
      title: "Group Management",
      description:
        "Smooth creation and maintenance of dedicated groups, where teachers can upload tests for students in the group.",
    },
  ];
    return (
        <>
        <div>
        
            <div className=" flex justify-center items-center min-h-[90vh] relative bg-white">
                <div className=" w-full overflow-hidden">
                <div className="absolute top-4 left-4 flex items-center px-2">
        <img
          src="/public/transCheatProof.png" // Replace with the actual path of your logo
          alt="Logo"
          className="h-10 w-10 object-contain mr-2" // Adjust size of the logo
        />
        <h2 className="text-3xl font-bold text-fore">CheatProof</h2>
      </div>
      <div className="absolute top-4 right-4 flex items-center ">
      <button onClick={()=>navigate("/register")}
            className="text-base items-center justify-center mr-3 py-1 text-center  hover:text-white hover:bg-fore text-fore border-fore font-semibold border rounded-md px-7 bg-white "
            >Sign Up</button>
      <button
  onClick={()=>navigate("/login")} 
  
  className={`text-base px-6 rounded-md py-1 text-fore font-semibold bg-white border border-fore hover:text-white hover:bg-fore
  }`}
>
 Log In
</button>
      </div>
                <div className="flex justify-center items-center w-full">
                <div className="flex-grow flex flex-col  lg:flex-row justify-center items-center container">
                    <div className="w-full flex-1 flex flex-col gap-8 lg:gap-10 pl-8 px-9 md:pr-0 py-16 lg:py-30 text-justify lg:text-left transition-all duration-400">
                        <div className="flex flex-col gap-10 lg:gap-8 ">
                            <h2
                        
                                
                                className="text-center lg:text-left text-3xl md:text-6xl lg:text-5xl 2xl:text-5xl lg:mt-10 text-[#323229] transition-all duration-400 "
                            >

                                Secure <span className="text-fore font-semibold">Assessments</span>, Trusted{" "}<span className="text-color1 font-semibold">Results</span>  </h2>
                     

                            

                            <h2 className=" tracking-wide text-wrap font-medium text-xl md:text-left text-color2 text-center ">

                            "Experience the future of secure online assessments with <span className="text-fore font-bold">CheatProof</span>. By leveraging advanced AI proctoring and monitoring techniques,  
                            we've transformed test conduction into a seamless and secure process, ensuring integrity and reliability for educational institutions."  
                            </h2>
                        </div>
                        <div className="w-full hidden container md:flex items-center justify-center md:gap-12 lg:gap-20 lg:justify-start px-16 lg:px-0 transition-all duration-400">
                            <div className="flex flex-row gap-1 items-center md:text-3xl">

                                <FontAwesomeIcon icon={faClipboardList} className="text-fore" color="blue" />
                                <h2 className="text-base font-semibold md:mt-2 text-fore">Assessments</h2>
                            </div>
                            <div className="flex gap-1 items-center md:text-3xl">
                                <FontAwesomeIcon icon={faComputer} className="text-fore"  color="blue" />
                                <h2 className=" text-base font-semibold md:mt-1 text-fore">Proctoring</h2>
                            </div>
                            <div className="flex gap-1 items-center md:text-3xl">
                                <FontAwesomeIcon icon={faCheckDouble} className="text-fore" color="blue" />
                                <h2 className="text-base font-semibold text-fore">Quality</h2>
                            </div>
                        </div>
                        <div className="flex justify-center lg:justify-start">
                            {/* <Button onClick={()=>navigate("/contact")}  size="lg" className="bg-blue-800"><span href="/contact">
                                Get Started </span><FontAwesomeIcon icon={faAngleDoubleRight} className="pl-2" />

                            </Button> */}
                           
                              <button
  onClick={()=>navigate("/register")} 
  
  className={`text-lg px-6 rounded-md py-2 text-fore font-semibold bg-white border border-fore hover:text-white hover:bg-fore
  }`}
>
 Join Now!
</button>
                        </div>
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                        <img src={Surveillance} alt="" className="w-full h-full max-w-2xl p-8 md:p-4 lg:p-[4rem] transition-all duration-400" />
                    </div>


                 
          </div>
        </div>
        </div>
        <div className="custom-shape-divider-bottom-1716710313">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-fore"></path>
    </svg>
</div>
</div>

{/* <section className="container1 relative">

    <Typography variant="h2" className="text-center font-mar" >Features</Typography>
    <div className="row">
      <div className="service">
        <i >
          <LuFileEdit className="mb-1"/>
        </i>
        <h3 className="font-mar text-xl font-semibold">Test Editor</h3>
        <p className="font-mar">User-friendly interface to create and edit assessments. Options to format and customize tests.</p>
      </div>
      <div className="service">
        <i >
        <GoChecklist className="mb-1"/>
        </i>
        <h3 className="font-mar text-xl font-semibold">Smooth Assignment of Tests</h3>
        
        <p>Teachers can assign tests to students by sharing test link or by adding students to a group, where the test is shared.
</p>
      </div>
      <div className="service">
        <i className="ri-database-2-line">
        <FaClipboardQuestion className="mb-1"/>
        </i>
        <h3 className="font-mar text-xl font-semibold">Question Bank</h3>

        <p>Manage a repository of different types of questions including MCQs, True & False, Free Text and more!.

</p>
      </div>
      <div className="service">
        <i className="ri-palette-line">
        <FaUserGraduate className="mb-1"/>
        </i>
        <h3 className="font-mar text-xl font-semibold">Monitoring System</h3>
        
        <p>Monitoring features such as browser control and noise detection can help educators in supervising students during assessments</p>
      </div>
      <div className="service">
        <i className="ri-android-line">
        <FaBook className="mb-1"/>
        </i>
        <h3 className="font-mar text-xl font-semibold">A.I Proctoring </h3>
        <p>Advanced A.I proctoring features including Head pose detection and gaze tracker 
            add an extra layer of security during assessments for teachers aid
        </p>
      </div>
      <div className="service">
        <i className="ri-account-box-line">
        <LiaChalkboardTeacherSolid className="mb-1"/>
        </i>
        <h3  className="font-mar text-xl font-semibold">Identity Verification</h3>
        <p>Continuous Identity Verification mechanism ensures the credibility of aassessments conducted via CheatProof, by preventing unauthorized person to give the test, instead of the candidate</p>
      </div>
      <div className="service">
        <i className="ri-hand-coin-line">
        <MdDashboard className="mb-1"/>

        </i>
        <h3 className="font-mar text-xl font-semibold">Multiple Dashboard's</h3>
        <p>Examiti Offers Multiple Dashboards for different role for doing different task.(Teacher , Administrator , Examiner)</p>
      </div>
      <div className="service">
        <i className="ri-english-input">
        <FcDocument className="mb-1"/>
        </i>
        <h3 className="font-mar text-xl font-semibold">Examination Managment</h3>
        <p>Examination Management who exams flow to the examiner for the Assesment of Students.</p>
      </div>
    </div>
  </section> */}

<section className="container1 relative py-10 px-6">
      
      <h2 className="text-center text-fore font-bold text-6xl mb-12 border border-fore border-x-transparent border-b-white border-t-4 pt-12">Features </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(NaN)}
            className={`service flex flex-col items-start gap-2 p-4 rounded-lg shadow-md cursor-pointer transition-all ${
              activeIndex === index
                ? "bg-color1 text-white scale-105"
                : "bg-white text-fore"
            }`}
          >
            <i className="text-3xl">{feature.icon}</i>
            <h3 className="font-mar text-lg font-semibold">{feature.title}</h3>
            <p className="font-mar text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>

<section className="overflow-hidden pt-20 pb-12 lg:pt-[2px] lg:pb-[90px] border-4 border-x-transparent  border-fore bg-white text-fore">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-10 items-center">
            <div className="flex justify-center ">
              <img
                src={picture}
                alt=""
                className="max-w-full lg:max-w-[450px] lg:w-auto lg:p-4 lg:ml-[-30px] transition-all duration-400"
              />
            </div>

            <div className="lg:pt-14 md:px-16">
              <span className="block mb-4 text-3xl lg:text-4xl font-semibold text-center lg:text-left">
              Effortless Test Creation and Student Management
              </span>

              <p className="mb-5 text-base lg:text-lg font-medium text-center lg:text-left">
              Easily create and update tests, then assign them seamlessly by sharing test links with students or organizing them into groups for efficient test distribution and management.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* <section className="text-gray-600 bg-white body-font">
        <div className="container px-5 py-24 mx-auto">
          <h1 className="text-3xl font-medium title-font  mb-12 text-center font-mar">Feedbacks from Teachers</h1>
          <div className="flex flex-wrap -m-4">
            <div className="p-4 md:w-1/2 w-full">
              <div className="h-full bg-gray-100  p-8 rounded">
                <svg  xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="block w-5 h-5 text-blue-400 mb-4" viewBox="0 0 975.036 975.036">
                  <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                </svg>
                <p className="leading-relaxed mb-6">
                "Kudos to your team for a game-changing project! You've created a remarkably seamless and efficient system for the paper creation and submission, making life easier for both teachers and the examination department. Your dedication, expertise, and attention to detail have truly paid off, and we can't wait to see the positive impact this will have on our academic community!"
                </p>
                <a className="inline-flex items-center">
                  <img alt="testimonial" src={Testimonal1} className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"/>
                  <span className="flex-grow flex flex-col pl-4">
                    <span className="title-font font-medium text-gray-900">Dr. Karim Kazi</span>
                    <span className="text-blue-500 text-sm">Assistant Professor - CSIT - NEDUET </span>
                  </span>
                </a>
              </div>
            </div>
            <div className="p-4 md:w-1/2 w-full">
              <div className="h-full bg-gray-100 p-8 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="block w-5 h-5 text-blue-400 mb-4" viewBox="0 0 975.036 975.036">
                  <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                </svg>
                <p className="leading-relaxed mb-6">
                    I am really impressed by the quality of services I received from Creative Solutions Solutions. You were right on schedule, charged reasonable prices, were professional and courteous in dealings, and delivered items well before time. I have got a good e-commerce site for my products. My revenue has increased because of Creative Solutions and I will definitely use your services again.
                </p>
                <a className="inline-flex items-center">
                  <img alt="testimonial" src="https://source.unsplash.com/featured?user" className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"/>
                  <span className="flex-grow flex flex-col pl-4">
                    <span className="title-font font-medium text-gray-900">Teachers Name</span>
                    <span className="text-blue-500 text-sm">Chairman CSIT Department</span>
                  </span>
                </a>
              </div>
            </div>

            <div className="p-4 md:w-1/2 w-full">
              <div className="h-full bg-gray-100 p-8 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="block w-5 h-5 text-blue-400 mb-4" viewBox="0 0 975.036 975.036">
                  <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                </svg>
                <p className="leading-relaxed mb-6">
                    I am really impressed by the quality of services I received from Creative Solutions Solutions. You were right on schedule, charged reasonable prices, were professional and courteous in dealings, and delivered items well before time. I have got a good e-commerce site for my products. My revenue has increased because of Creative Solutions and I will definitely use your services again.
                </p>
                <a className="inline-flex items-center">
                  <img alt="testimonial" src="https://source.unsplash.com/featured?user" className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"/>
                  <span className="flex-grow flex flex-col pl-4">
                    <span className="title-font font-medium text-gray-900">Teachers Name</span>
                    <span className="text-blue-500 text-sm">Chairman CSIT Department</span>
                  </span>
                </a>
              </div>
            </div>

            <div className="p-4 md:w-1/2 w-full">
              <div className="h-full bg-gray-100 p-8 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="block w-5 h-5 text-blue-400 mb-4" viewBox="0 0 975.036 975.036">
                  <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                </svg>
                <p className="leading-relaxed mb-6">
                    I am really impressed by the quality of services I received from Creative Solutions Solutions. You were right on schedule, charged reasonable prices, were professional and courteous in dealings, and delivered items well before time. I have got a good e-commerce site for my products. My revenue has increased because of Creative Solutions and I will definitely use your services again.
                </p>
                <a className="inline-flex items-center">
                  <img alt="testimonial" src="https://source.unsplash.com/featured?user" className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"/>
                  <span className="flex-grow flex flex-col pl-4">
                    <span className="title-font font-medium text-gray-900">Teachers Name</span>
                    <span className="text-blue-500 text-sm">Chairman CSIT Department</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden min-h-screen flex justify-center items-center  pt-10  px-11    bg-blue-800 text-gray-50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-10 items-center">
            <div>
              
              <h2 className="mb-5 text-3xl lg:text-4xl poppins-bold  dark:text-white sm:text-[40px]/[48px]">
                  Enhance Teaching Efficiency: Innovating Exam Paper Creation
              </h2>
              <p className="mb-5 text-base lg:text-lg poppins-regular">
              Unlock a hassle-free experience with our exam editor, offering a diverse range of tools for teachers to curate exam papers efficiently
              </p>
              <p className="mb-8 text-base lg:text-lg poppins-regular">
              With customizable formatting options and real-time previews,
               our exam editor feature streamlines the exam paper creation process, allowing educators to focus more on teaching.
              </p>
             
            </div>
            <div className="flex justify-center lg:justify-end">
              <img
                src=""
                alt=""
                className="max-w-full lg:max-w-[700px] mt-[-30px] lg:w-auto lg:p-4 lg:mr-[-40px] transition-all duration-400"
              />
            </div>
          </div>
        </div>
      </section> */}

      <section className="bg-fore dark:bg-gray-900">
  <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
      <h2 className="flex justify-center mb-8 text-4xl text-center tracking-tight font-mar  text-white dark:text-white mt-12">Sign Up & Join the CheatProof Community!</h2>
        
        <div className="flex justify-center items-center mb-12">
        <a  href="/register"
            className="inline-flex items-center justify-center py-3 text-center text-fore font-semibold border border-white rounded-md px-7 bg-white hover:scale-105"
            >Sign Up</a>
      </div>
      </div>
      </section>




      {/* <section className=" bg-[#0f5ec6] text-white dark:bg-gray-900">
  <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
      <h2 className="flex justify-center mb-8 text-4xl tracking-tight poppins-bold  dark:text-white mt-12">Want to know more?</h2>
        
        <div className="flex justify-center items-center mb-12">
        <a  href="/contact"
            className="inline-flex items-center justify-center py-3 font-medium text-center bg-white poppins-semibold border border-transparent rounded-md px-7 text-[#0f5ec6] hover:bg-opacity-80 hover:scale-105"
            >Contact Us</a>
      </div>
      </div>
      </section> */}


  


        
      </div>
    </>
  );
};

export default HomePage;
