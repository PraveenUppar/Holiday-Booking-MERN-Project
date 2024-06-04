import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  async function login(ev) {
    ev.preventDefault();
    const response = await fetch("https://localhost:4000", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (response.ok) {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
        setRedirect(true);
        alert("Login Successful !! Redirecting to Home Page");
      });
    } else {
      alert("Check your Username and Password");
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="mt-48 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-5xl font-semibold  text-center mb-5">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={login}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          ></input>
          <input
            type="Password"
            placeholder="Password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          ></input>
          <button className="primary ">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet?
            <br></br>
            <Link
              className="underline text-black font-medium "
              to={"/register"}
            >
              Sign-up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
