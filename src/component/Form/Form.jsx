import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../../Context/AuthenticationContextProvider/AuthenticationContextProvider";
import googleLogo from "../../Assets/images/google-logo.png"; // Replace with the correct path to your Google logo

const Form = ({ type, thirdinput }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === "log in") {
      if (!email || !password) {
        alert("Email and Password are required!");
        return;
      }
      // Log in logic can be added here
      console.log("Logged in with:", { email, password });
    } else if (type === "sign up") {
      if (!email || !password || !username) {
        alert("Username, Email, and Password are required!");
        return;
      }
      setUser({ username, email, password });
      navigate("/");
      console.log("Signed up with:", { username, email, password });
    }
  };

  const handleGoogleSignIn = () => {
    // Add Google sign-in logic here
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
            pattern="^[A-Za-z0-9]{3,15}$"
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
          pattern="^[A-Za-z0-9]{6,100}$"
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
