import { Link } from "react-router-dom";

export default function BookedPlace({
  _id,
  checkOut,
  checkIn,
  GuestName,
  GuestPhone,
  GuestNo,
  totalPrice,
}) {
  return (
    <>
      <div className="bg-gray-200 grid gap-5 mt-4 p-4 rounded-2xl">
        <div className="">
          <p className="text-2xl font-semibold">{GuestName}</p>

          <p className="text-lg font-semibold text-gray-600">
            Guest Phone Number:{" "}
            <span className="font-semibold text-gray-950">{GuestPhone}</span>
          </p>
          <p className="text-lg font-semibold text-gray-600">
            CheckIn:{" "}
            <span className="font-semibold text-gray-950">{checkIn}</span>
          </p>
          <p className="text-lg font-semibold text-gray-600">
            CheckOut:{" "}
            <span className="font-semibold text-gray-950">{checkOut}</span>
          </p>
          <p className="text-lg font-semibold text-gray-600">
            Total Price:
            <span className="font-semibold text-gray-950">
              {" "}
              ${totalPrice}
            </span>{" "}
          </p>
        </div>
      </div>
    </>
  );
}
