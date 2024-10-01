import { FaReact } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";
import { InputWithLabel, SimpleInput, ThirdPartyAuthButton, WhiteButton } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import { useState } from "react";
import { signIn } from "../api/auth";

const LoginComponent = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("john@email.com");
  const [password, setPassword] = useState("pass1234567890");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true); // Start loading
    try {
      console.log("Login with email: ", email, " and password: ", password);
      const body = {
        email: email,
        password: password,
      };
      const data =await signIn(body);

      console.log(data)
      if(data.code == 200){
        localStorage.setItem('token',data.data.token);
        localStorage.setItem('user',JSON.stringify(data.data.user));
      navigate("/")
      }else{
        alert("Invalid credentials")
      }
      // TODO: Handle success (e.g., redirect to dashboard)
    } catch (error) {
      console.error("Login failed", error);
      // TODO: Handle error (e.g., show error message to user)
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="w-[500px] h-[750px] dark:bg-gray-900 bg-white flex flex-col justify-between items-center py-10 max-sm:w-[400px] max-[420px]:w-[320px] max-sm:h-[750px]">
      <div className="flex flex-col items-center gap-10">
        <FaReact className="text-5xl dark:text-whiteSecondary text-blackPrimary hover:rotate-180 hover:duration-1000 hover:ease-in-out cursor-pointer max-sm:text-4xl" />
        <h2 className="text-2xl dark:text-whiteSecondary text-blackPrimary font-medium max-sm:text-xl">
          Welcome to the dashboard!
        </h2>
        <div className="flex gap-5">
          <ThirdPartyAuthButton>
            <FaGoogle className="text-2xl max-sm:text-xl" />
          </ThirdPartyAuthButton>
          <ThirdPartyAuthButton>
            <FaGithub className="text-2xl max-sm:text-xl" />
          </ThirdPartyAuthButton>
        </div>

        <p className="dark:text-gray-400 text-gray-700 text-xl max-sm:text-base">OR</p>

        <div className="w-full flex flex-col gap-5">
          <InputWithLabel label="Email">
            <SimpleInput
              type="email"
              placeholder="Enter an email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputWithLabel>

          <InputWithLabel label="Password">
            <SimpleInput
              type="password"
              placeholder="Enter a password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputWithLabel>
        </div>
        <p className="dark:text-gray-400 text-gray-700 text-base dark:hover:text-gray-300 hover:text-gray-600 cursor-pointer transition-colors max-sm:text-sm">
          Forgot password?
        </p>
        <WhiteButton
          onClick={()=>handleSubmit()}
          disabled={loading}
          textSize="lg"
          width="full"
          py="2"
          text={loading ? "Logging in..." : "Login now"} // Change button text during loading
        />
        {loading && (
          <p className="dark:text-gray-400 text-gray-700 text-base mt-2">Processing your login...</p>
        )}
        <p className="dark:text-gray-400 text-gray-700 text-base cursor-pointer transition-colors flex gap-1 items-center max-sm:text-sm">
          Not registered yet?{" "}
          <Link
            to="/register"
            className="dark:text-whiteSecondary text-blackPrimary hover:text-black flex gap-1 items-center dark:hover:text-white max-sm:text-sm hover:underline"
          >
            Register <FaArrowRight className="mt-[2px]" />
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginComponent;
