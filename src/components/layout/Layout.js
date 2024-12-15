import "./layout.scss";
import SideBar from "./Sidebar/SideBar";
import Navbar from "./Navbar/Navbar";
import { Outlet } from "react-router-dom";

const Layout = (props) => {
  return (
    <>
      <SideBar />
      <Navbar newOrder={props.newOrder} />
      <main>
        <Outlet />
      </main>
    </>
  );
};
export default Layout;
