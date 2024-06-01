import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../UserContext";
import PlaceList from "./PlaceListing";

const Places = () => {
  const { userInfo } = useContext(UserContext);
  const email = userInfo?.email;
  return (
    <>
      {email && (
        <div>
          <nav className="w-full flex mt-10 gap-10 justify-center ">
            <Link
              to={"/account"}
              className="py-2 px-6 flex gap-2 items-center font-semibold hover:text-black bg-primary border hover:bg-white border-gray-500 text-white shadow-md shadow-gray-500 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="black"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
              My Profile
            </Link>
            <Link
              to={"/account/bookings"}
              className="py-2 px-6 flex gap-2 items-center font-semibold hover:text-black bg-primary border hover:bg-white border-gray-500 text-white shadow-md shadow-gray-500 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="black"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              My Bookings
            </Link>
            <Link
              to={"/account/places"}
              className="py-2 px-6 flex gap-2 items-center font-semibold hover:text-black bg-primary border hover:bg-white border-gray-500 text-white shadow-md shadow-gray-500 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="black"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819"
                />
              </svg>{" "}
              My Accommodations
            </Link>
          </nav>
          <div className="items-center text-center font-semibold mt-12 max-w-lg mx-auto">
            <Link
              to={"/account/places/new"}
              className="bg-primary inline-flex gap-2 text-white py-2 px-6 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 30 30"
              >
                <path d="M15,3C8.373,3,3,8.373,3,15c0,6.627,5.373,12,12,12s12-5.373,12-12C27,8.373,21.627,3,15,3z M21,16h-5v5 c0,0.553-0.448,1-1,1s-1-0.447-1-1v-5H9c-0.552,0-1-0.447-1-1s0.448-1,1-1h5V9c0-0.553,0.448-1,1-1s1,0.447,1,1v5h5 c0.552,0,1,0.447,1,1S21.552,16,21,16z"></path>
              </svg>
              Add New Place
            </Link>
          </div>
          <PlaceList></PlaceList>
        </div>
      )}
    </>
  );
};

export default Places;
