import { useState } from "react";
import { Navigate } from "react-router-dom";
import Perks from "./PerksLabel";

const PlaceForm = () => {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [files, setFiles] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("");
  const [price, setPrice] = useState("");
  const [contact, setContact] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function createNewPlace(ev) {
    const data = new FormData();
    data.set("title", title);
    data.set("address", address);
    data.set("description", description);
    data.set("checkIn", checkIn);
    data.set("checkOut", checkOut);
    data.set("guests", guests);
    data.set("price", price);
    data.set("contact", contact);
    data.set("perks", perks);
    data.set("file", files[0]);
    ev.preventDefault();
    const response = await fetch("http://localhost:4000/places", {
      method: "POST",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
      alert("Place created successfully");
    }
  }
  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <div>
      <form onSubmit={createNewPlace}>
        <div className="flex items-center gap-2 mt-9">
          <h2 className="text-2xl font-semibold">Title</h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12"
            />
          </svg>
        </div>
        <input
          type="text"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          placeholder=" Add name of your property"
        ></input>
        <div className="flex items-center gap-2 mt-3">
          <h2 className="text-2xl font-semibold f">Address</h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>
        </div>
        <input
          type="text"
          value={address}
          onChange={(ev) => setAddress(ev.target.value)}
          placeholder=" Add location of your property."
        ></input>
        <div className="flex items-center gap-2 mt-3">
          <h2 className="text-2xl font-semibold">Photos</h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
            />
          </svg>
        </div>
        <p className="text-gray-500">Add cover photo of your property</p>
        <div className="mt-2 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 ">
          <input
            type="file"
            onChange={(ev) => setFiles(ev.target.files)}
          ></input>
        </div>
        <div className="flex items-center gap-1 mt-4">
          <h2 className="text-2xl  font-semibold">Description</h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
            />
          </svg>
        </div>
        <textarea
          placeholder="Add description of your property"
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        ></textarea>
        <div className="flex items-center gap-1 mt-4">
          <h2 className="text-2xl font-semibold">What this place offers</h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
            />
          </svg>
        </div>
        <p className="text-gray-500">
          Select the perks that your place offers.
        </p>
        <Perks selected={perks} onChange={setPerks}></Perks>
        <div className="flex items-center gap-2 mt-4">
          <h2 className="text-2xl font-semibold">Check in/out</h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>
        <div className=" grid gap-4 grid-col-3 mt-3 md:grid-cols-4 lg:grid-cols-6 ">
          <div>
            <h3 className="mt-2">Check in time</h3>
            <input
              type="text"
              placeholder="13:00"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
            ></input>
          </div>
          <div>
            <h3 className="mt-2">Check out time</h3>
            <input
              type="text"
              placeholder="13:00"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
            ></input>
          </div>
          <div>
            <h3 className="mt-2">Number of guests</h3>
            <input
              type="text"
              placeholder="3"
              value={guests}
              onChange={(ev) => setGuests(ev.target.value)}
            ></input>
          </div>
        </div>
        <h2 className="text-2xl mt-4 font-semibold">Pricing</h2>

        <input
          type="text"
          value={price}
          onChange={(ev) => setPrice(ev.target.value)}
          placeholder=" Price per night"
        ></input>
        <h2 className="text-2xl mt-4 font-semibold">Contact Info</h2>

        <input
          type="text"
          value={contact}
          onChange={(ev) => setContact(ev.target.value)}
          placeholder="Enter owner Contact Info"
        ></input>

        <button className="bg-primary text-xl mt-6 rounded-full text-white justify-center text-center px-6 py-2">
          Save
        </button>
      </form>
    </div>
  );
};

export default PlaceForm;
