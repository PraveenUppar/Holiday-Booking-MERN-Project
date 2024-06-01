import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../UserContext";
import { Link } from "react-router-dom";

export default function PlacePage() {
  const [placeInfo, setPlaceInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [GuestName, setGuestName] = useState("");
  const [GuestPhone, setGuestPhone] = useState("");
  const [GuestNo, setGuestNo] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  const email = userInfo?.email;

  useEffect(() => {
    fetch(`http://localhost:4000/place/${id}`).then((response) => {
      response.json().then((placeInfo) => {
        setPlaceInfo(placeInfo);
      });
    });
  }, [id]);

  useEffect(() => {
    calculateTotalPrice(checkIn, checkOut);
  }, [checkIn, checkOut]);

  const calculateTotalPrice = (checkIn, checkOut) => {
    if (checkIn && checkOut) {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      const timeDifference = checkOutDate.getTime() - checkInDate.getTime();
      const daysDifference = timeDifference / (1000 * 3600 * 24);
      const total = daysDifference * placeInfo.price;
      setTotalPrice(total);
    }
  };
  async function Bookplace() {
    const url = "http://localhost:4000/bookings";
    const data = {
      checkIn,
      checkOut,
      GuestName,
      GuestPhone,
      GuestNo,
      totalPrice,
    };

    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    };

    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const bookingData = await response.json();
        const bookingId = bookingData._id;
        setRedirect(`/account/bookings/${bookingId}`);
        alert =
          "Booked your Hotel Successful Check your Booking Details in your account";
      } else {
        console.error("Booking failed:", await response.text());
        alert("Booking failed. Please try again.");
      }
    } catch (error) {
      console.error("Error booking place:", error);
      alert("Booking Successful Check your Booking Details in your account");
    }
  }
  if (!placeInfo) return "Loading";

  return (
    <div className="mt-4 bg-gray-100 mx-8 px-8 py-8 rounded-lg">
      <h1 className="text-5xl font-semibold">{placeInfo.title}</h1>
      <br></br>
      <div>
        <img
          className="rounded-lg"
          src={`http://localhost:4000/${placeInfo.cover}`}
          alt="image"
        />
      </div>
      <br></br>
      <p className="text-xl font-semibold text-gray-600">
        Location:{" "}
        <span className="font-semibold text-gray-950">{placeInfo.address}</span>
      </p>
      <p className="text-xl mt-2 font-semibold text-gray-600">
        Description:{" "}
        <span className="font-semibold text-gray-950">
          {placeInfo.description}
        </span>
      </p>
      <p className="text-xl mt-2 font-semibold text-gray-600">
        Perks:{" "}
        <span className="font-semibold text-gray-950">{placeInfo.perks}</span>
      </p>
      <p className="text-xl mt-2 font-semibold text-gray-600">
        Max No of guests:{" "}
        <span className="font-semibold text-gray-950">{placeInfo.guests}</span>
      </p>
      <p className="text-xl mt-2 font-semibold text-gray-600">
        CheckIn:{" "}
        <span className="font-semibold text-gray-950">{placeInfo.checkIn}</span>
      </p>
      <p className="text-xl mt-2 font-semibold text-gray-600">
        CheckOut:{" "}
        <span className="font-semibold text-gray-950">
          {placeInfo.checkOut}
        </span>
      </p>
      <p className="text-xl mt-2 font-semibold text-gray-600">
        Pricing:{" "}
        <span className="font-semibold text-gray-950">${placeInfo.price}</span>
      </p>
      <p className="text-xl mt-2 font-semibold text-gray-600">
        Contact info:{" "}
        <span className="font-semibold text-gray-950">
          +91 {placeInfo.contact}
        </span>
      </p>
      <br></br>
      <p>Login to book your Hotels !!!</p>
      <br></br>
      <div>
        <>
          {email && (
            <div className="bg-white shadow p-4 rounded-2xl">
              <div className="text-xl text-center">
                Price : ${placeInfo.price}/per night
              </div>
              <div className="contents">
                <div className="my-4 bg-gray-200 py-4 px-4 rounded-2xl">
                  <p>Check in:</p>
                  <input
                    value={checkIn}
                    type="date"
                    onChange={(ev) => setCheckIn(ev.target.value)}
                    className="rounded-2xl p-2"
                  ></input>
                </div>
                <div className="my-4 bg-gray-200 py-4 px-4 rounded-2xl">
                  <p>Check out:</p>
                  <input
                    value={checkOut}
                    onChange={(ev) => setCheckOut(ev.target.value)}
                    className="rounded-2xl p-2"
                    type="date"
                  ></input>
                </div>
                <div className="my-4 bg-gray-200 py-4 px-4 rounded-2xl">
                  <p>Number of Guest:</p>
                  <input
                    value={GuestNo}
                    onChange={(ev) => setGuestNo(ev.target.value)}
                    type="number"
                  ></input>
                </div>
                <div className="my-4 bg-gray-200 py-4 px-4 rounded-2xl">
                  <p>Full Name:</p>
                  <input
                    value={GuestName}
                    onChange={(ev) => setGuestName(ev.target.value)}
                    type="text"
                  ></input>
                </div>
                <div className="my-4 bg-gray-200 py-4 px-4 rounded-2xl">
                  <p>Phone Number:</p>
                  <input
                    value={GuestPhone}
                    onChange={(ev) => setGuestPhone(ev.target.value)}
                    type="number"
                  ></input>
                </div>
              </div>
              <div className="text-center">
                <p className="text-2xl">
                  Total Price: ${totalPrice.toFixed(2)}
                </p>
                <br></br>
              </div>
              <button onClick={Bookplace} className="primary">
                Book this Place
              </button>
            </div>
          )}
        </>
      </div>
      {userInfo.id === placeInfo.owner._id && (
        <div className="flex justify-center gap-5 mt-7">
          <Link
            to={`/edit/${placeInfo._id}`}
            className="bg-primary  hover:bg-green-500 flex text-xl items-center gap-1 p-3 rounded-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
            Edit
          </Link>
          <Link className="bg-primary  hover:bg-gray-500 flex text-xl items-center gap-1 p-2 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
            Delete
          </Link>
        </div>
      )}
    </div>
  );
}
