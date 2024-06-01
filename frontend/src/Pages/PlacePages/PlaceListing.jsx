import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../UserContext";
import OwnerPlace from "../../components/OwnerPlace";

export default function IndexPage() {
  const { userInfo } = useContext(UserContext);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/places")
      .then((response) => response.json())
      .then((places) => {
        const userPlaces = places.filter(
          (places) => places.owner._id === userInfo.id
        );
        setPlaces(userPlaces);
      });
  }, [userInfo.id]);

  return (
    <div className="grid md:grid-cols-2 gap-3 grid-col-1 lg:grid-cols-4 mt-6 ">
      {places.length > 0 &&
        places.map((places) => <OwnerPlace key={places._id} {...places} />)}
    </div>
  );
}
