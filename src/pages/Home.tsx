import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckDouble, faClipboardList, faComputer } from '@fortawesome/free-solid-svg-icons';
import { FaBook, FaClipboardQuestion, FaUserGraduate } from 'react-icons/fa6';
import { LuFileEdit } from 'react-icons/lu';
import { GoChecklist } from 'react-icons/go';
import { MdDashboard } from 'react-icons/md';
import { LiaChalkboardTeacherSolid } from 'react-icons/lia';
import { FcDocument } from 'react-icons/fc';
import Navbar from './Navbar';
import Footer from './Footer';
import picture from '../assets/undraw_online-test_20lm.svg';
import Surveillance from '../assets/8262066.jpg'; 

const features = [
  {
    icon: <LuFileEdit />,
    title: "Test Editor",
    description: "User-friendly interface to create and edit assessments. Options to format and customize tests.",
  },
  {
    icon: <FcDocument />,
    title: "Smooth Assignment of Tests",
    description: "Teachers can assign tests to students by sharing test link or by adding students to a group.",
  },
  {
    icon: <FaClipboardQuestion />,
    title: "Question Bank",
    description: "Manage a repository of different types of questions including MCQs, True & False, Free Text and more!",
  },
  {
    icon: <GoChecklist />,
    title: "Monitoring System",
    description: "Advanced monitoring features for supervising students during assessments.",
  },
  {
    icon: <FaBook />,
    title: "A.I Proctoring",
    description: "Advanced A.I proctoring features including Head-Pose Detection and Gaze Tracker.",
  },
  {
    icon: <LiaChalkboardTeacherSolid />,
    title: "Identity Verification",
    description: "Continuous identity verification ensures assessment credibility and prevents unauthorized access.",
  },
  {
    icon: <MdDashboard />,
    title: "Personalized Dashboards",
    description: "Tailored dashboards for teachers and students, ensuring a smooth user experience.",
  },
  {
    icon: <FaUserGraduate />,
    title: "Group Management",
    description: "Efficient creation and management of student groups for streamlined test distribution.",
  },
];

const HomePage = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 lg:pt-24 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Secure <span className="text-fore">Assessments</span>,<br />
                Trusted <span className="text-color1">Results</span>
              </h1>
              <p className="text-lg lg:text-xl text-color2 mb-8 max-w-2xl">
                Experience the future of secure online assessments with <span className="text-fore font-semibold">CheatProof</span>. 
                Leveraging advanced AI proctoring and monitoring techniques for seamless, secure testing.
              </p>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faClipboardList} className="text-fore text-2xl" />
                  <span className="text-fore font-semibold">Assessments</span>
                </div>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faComputer} className="text-fore text-2xl" />
                  <span className="text-fore font-semibold">Proctoring</span>
                </div>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faCheckDouble} className="text-fore text-2xl" />
                  <span className="text-fore font-semibold">Quality</span>
                </div>
              </div>
              
              <button
                onClick={() => navigate('/register')}
                className="px-8 py-3 bg-fore text-white font-semibold rounded-lg hover:bg-color2 transition-colors"
              >
                Get Started Today
              </button>
            </div>
            
            <div className="flex-1">
              <img 
                src={Surveillance} 
                alt="Online Assessment Platform" 
                className="w-full max-w-xl"
              />
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-24 fill-fore" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-5xl font-bold text-center text-fore mb-16">
            Powerful Features for Modern Education
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                className={`p-6 rounded-xl transition-all duration-300 ${
                  activeIndex === index
                    ? 'bg-fore text-white transform scale-105'
                    : 'bg-white text-gray-800 hover:shadow-lg'
                }`}
              >
                <div className={`text-3xl mb-4 ${
                  activeIndex === index ? 'text-white' : 'text-fore'
                }`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className={`text-sm ${
                  activeIndex === index ? 'text-gray-100' : 'text-gray-600'
                }`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Test Creation Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img
                src={picture}
                alt="Test Creation Interface"
                className="lg:max-w-xl w-full sm:max-w-screen-sm"
                
              />
            </div>
            
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl lg:text-4xl font-bold text-fore mb-6">
                Effortless Test Creation and Student Management
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                Create and update tests with ease, then distribute them seamlessly to your students. 
                Our platform simplifies the entire process, from test creation to result analysis.
              </p>
              <button
                onClick={() => navigate('/register')}
                className="px-6 py-3 bg-fore text-white font-semibold rounded-lg hover:bg-color2 transition-colors"
              >
                Try It Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-fore py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8">
            Ready to Transform Your Assessment Process?
          </h2>
          <button
            onClick={() => navigate('/register')}
            className="px-8 py-3 bg-white text-fore font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Join CheatProof Today
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;