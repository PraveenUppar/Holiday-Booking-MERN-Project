import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../UserContext";
import BookedPlace from "../../components/BookedPlace";

export default function IndexPage() {
  const { userInfo } = useContext(UserContext);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (userInfo && userInfo.id) {
      fetch(`http://localhost:4000/bookings?userId=${userInfo.id}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to fetch bookings");
          }
        })
        .then((bookings) => {
          setBookings(bookings);
        })
        .catch((error) => {
          console.error("Error fetching bookings:", error);
        });
    }
  }, [userInfo]);

  return (
    <div className="grid md:grid-cols-2 gap-3 grid-col-1 lg:grid-cols-4 mt-6">
      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <BookedPlace key={booking._id} {...booking} />
        ))
      ) : (
        <p>No bookings found</p>
      )}
    </div>
  );
}
