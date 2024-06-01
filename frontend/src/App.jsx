import Layout from "./Layouts/Layout";
import { Routes, Route } from "react-router";
import Login from "./Pages/LoginPage/LoginPage";
import Register from "./Pages/Register Page/RegisterPage";
import Account from "./Pages/Account Page/AccountPage";
import Booking from "./Pages//Booking Page/BookingPage";
import Places from "./Pages/PlacePages/PlacesPage";
import AddPlaces from "./Pages/PlacePages/PlacesAddPage";
import PlacePage from "./Pages/PlacePages/PlacePage";
import HomePlacePage from "./components/HomePage";
import { UserContextProvider } from "./UserContext";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout></Layout>}>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/account" element={<Account></Account>}></Route>
          <Route path="/account/bookings" element={<Booking></Booking>}></Route>
          <Route path="/account/places" element={<Places></Places>}></Route>
          <Route
            path="/account/places/new"
            element={<AddPlaces></AddPlaces>}
          ></Route>
          <Route path="/" element={<HomePlacePage></HomePlacePage>}></Route>
          <Route path="/place/:id" element={<PlacePage></PlacePage>} />
          <Route path="/booking/:id" element={<PlacePage></PlacePage>} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
