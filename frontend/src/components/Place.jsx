import { Link } from "react-router-dom";

export default function Place({
  _id,
  title,
  cover,
  address,
  description,
  perks,
  checkOut,
  checkIn,
  guests,
  owner,
  price,
  contact,
}) {
  return (
    <>
      <div className="bg-gray-200 grid gap-5 mt-4 p-4 rounded-2xl">
        <Link to={`/place/${_id}`}>
          <img
            className="w-full h-64 bg-gray-200 rounded-xl "
            src={"http://localhost:4000/" + cover}
            alt="Images"
          />
        </Link>
        <div className="">
          <Link to={`/place/${_id}`}>
            <p className="text-2xl font-semibold">{title}</p>
          </Link>
          <p className="text-lg font-semibold text-gray-600">
            Location:{" "}
            <span className="font-semibold text-gray-950"> {address}</span>
          </p>
          <p className="text-lg font-semibold text-gray-600">
            No of guest:{" "}
            <span className="font-semibold text-gray-950">{guests}</span>
          </p>
          <p className="text-lg font-semibold text-gray-600">
            Pricing:
            <span className="font-semibold text-gray-950"> ${price}</span> per
            night
          </p>
        </div>
      </div>
    </>
  );
}
