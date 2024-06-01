import Place from "./Place";
import { useEffect, useState } from "react";

const HomePlacePage = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/places").then((response) => {
      response.json().then((places) => {
        setPlaces(places);
      });
    });
  }, []);
  return (
    <div className="grid md:grid-cols-2 gap-3 grid-col-1 lg:grid-cols-4 ">
      {places.length > 0 && places.map((places) => <Place {...places} />)}
    </div>
  );
};

export default HomePlacePage;
