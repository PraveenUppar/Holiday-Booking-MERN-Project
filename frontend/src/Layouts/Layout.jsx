import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="p-6 flex flex-col min-h-screen">
      <Header></Header>
      <br></br>
      <hr></hr>
      <br></br>
      <Outlet></Outlet>
      <div className="container mx-auto py-10 flex-1"></div>
      <hr></hr>
      <Footer></Footer>
    </div>
  );
};
export default Layout;
