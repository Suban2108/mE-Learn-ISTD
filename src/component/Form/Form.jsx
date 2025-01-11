import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthenticationContext } from "../../Context/AuthenticationContextProvider/AuthenticationContextProvider";
import googleLogo from "../../Assets/images/google-logo.png";

const Form = ({ type, thirdinput }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (type === "log in") {
      if (!email || !password) {
        alert("Email and Password are required!");
        return;
      }

      try {
        const response = await axios.post("http://localhost:6002/user/login", {
          email,
          password,
        });

        const { token } = response.data;
        if (token) {
          sessionStorage.setItem("authToken", token);
          alert("Login successful!");
          navigate("/");
        }
      } catch (err) {
        console.error(err);
        alert("Invalid credentials or server error!");
      }
    } else if (type === "sign up") {
      if (!email || !password || !username) {
        alert("Username, Email, and Password are required!");
        return;
      }

      try {
        const response = await axios.post("http://localhost:6002/user/register", {
          name: username,
          email,
          password,
          bio: "", // Add any default or empty value for bio if not used
          college_name: "", // Add any default or empty value for college_name if not used
        });

        if (response.data.msg === "User registered successfully") {
          alert("Sign Up successful!");
          navigate("/log-in"); // Redirect to login after successful signup
        }
      } catch (err) {
        console.error(err);
        alert("Error during signup. Please try again!");
      }
    }
  };

  const handleGoogleSignIn = () => {
    console.log(`Google ${type} clicked`);
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      {thirdinput && (
        <div>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            type="text"
            placeholder="User Name *"
            className="text-lg p-3 dark:text-white dark:placeholder-slate-300 w-full sm:w-[80%] border border-slate-400 bg-transparent outline-0 rounded transition-shadow focus:shadow-lg"
          />
        </div>
      )}
      <div>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
          placeholder="Email *"
          className="text-lg p-3 dark:text-white dark:placeholder-slate-300 w-full sm:w-[80%] border border-slate-400 bg-transparent outline-0 rounded transition-shadow focus:shadow-lg"
        />
      </div>
      <div>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          type="password"
          placeholder="Password *"
          className="text-lg p-3 dark:text-white dark:placeholder-slate-300 w-full sm:w-[80%] border border-slate-400 bg-transparent outline-0 rounded transition-shadow focus:shadow-lg"
        />
      </div>
      <div>
        <button
          type="submit"
          className="text-xl p-3 bg-main uppercase text-white dark:bg-sky-500 cursor-pointer w-full sm:w-[80%] outline-0 rounded transition-transform hover:scale-105"
        >
          {type}
        </button>
      </div>
      <button
        type="button"
        onClick={handleGoogleSignIn}
        className="flex items-center justify-center gap-3 text-xl p-3 bg-red-500 uppercase text-white dark:bg-red-600 cursor-pointer w-full sm:w-[80%] outline-0 rounded transition-transform hover:scale-105"
      >
        <img src={googleLogo} alt="Google Logo" className="h-6 w-6" />
        Google {type}
      </button>
    </form>
  );
};

export default Form;
