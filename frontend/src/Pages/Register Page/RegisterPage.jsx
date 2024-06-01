import { Link } from "react-router-dom";
import { useState } from "react";
import { Navigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [redirect, setRedirect] = useState(false);

  async function register(ev) {
    ev.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      setRedirect(true);
      alert("Registration Successful !! Redirecting you to Login.");
    } catch (e) {
      alert("Registration Failed. Please try again later");
    }
  }
  if (redirect) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div className="mt-48 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-5xl font-semibold  text-center mb-5">Sign-Up</h1>
        <form className="max-w-md mx-auto" onSubmit={register}>
          <input
            type="text"
            placeholder="Username"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          ></input>
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
          <button className="primary ">Sign-Up</button>
          <div className="text-center py-2 text-gray-500">
            Already a member?
            <br></br>
            <Link className="underline text-black font-medium " to={"/login"}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Register;
