import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import Layout from "components/layout/Layout";
import LoginScreen from "screens/Login";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "components/Auth/ProtectedRoute/ProtectedRoute ";
import VendorScreen from "screens/Vendor";
import { useSelector } from "react-redux";
import { selectAuth } from "store/authSlice";
import CategoriesScreen from "screens/Categories";
import Sliders from "components/Sliders/Sliders";
import Regions from "components/Regions/Regions";
import Users from "components/Users/Users";
import Products from "components/Products/Products";
import AddProduct from "components/Products/AddProduct/AddProduct";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import EditProduct from "components/Products/EditProduct/EditProduct";
import Orders from "components/Order/Order";
import { io } from "socket.io-client";
import sound from "assets/notification.mp3";
import OrderDetails from "components/Order/OrderDetails/OrderDetails";
import Home from "components/HomePage/HomePage";
function App() {
  const { isAuthenticated } = useSelector(selectAuth);
  const [newOrder, setNewOrder] = useState(null);
  const toast = useRef(null);

  useEffect(() => {
    const socket = io("http://localhost:5000"); // Replace with your server's URL
    // Listen for the "registerAdmin" event
    if (isAuthenticated) {
      console.log(socket);

      socket.emit("registerAdmin", socket.id);

      console.log(`Admin ID registered`);

      socket.on("connect", () => {
        console.log("Connected to the server:", socket.id);
      });

      socket.on("newOrder", (data) => {
        console.log("-------------------new---------------");
        const audio = new Audio(sound);
        showMessage("success", "طلب جديد", "هناك طلب جديد من " + data?.name);
        setNewOrder(data);
        audio.play();
      });
    }
  }, [isAuthenticated]);

  const showMessage = (type, head, content) => {
    toast.current.show({
      severity: type,
      summary: head,
      detail: content,
      life: 3000,
    });
  };

  return (
    <>
      <Toast style={{ direction: "rtf" }} ref={toast} position="top-left" />
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<LoginScreen />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout newOrder={newOrder} />
            </ProtectedRoute>
          }
        >
          {/* Nested Protected Routes */}
          <Route index element={<Home />} />
          <Route path="vendors" element={<VendorScreen />} />
          <Route path="/orders/*" element={<Orders newOrder={newOrder} />} />
          <Route
            path="orders/:id"
            element={<OrderDetails showMessage={showMessage} />}
          />
          <Route path="products" element={<Products />} />
          <Route
            path="products/:id"
            element={<EditProduct showMessage={showMessage} />}
          />
          <Route
            path="products/add"
            element={<AddProduct showMessage={showMessage} />}
          />
          <Route path="sliders" element={<Sliders />} />
          <Route path="regions" element={<Regions />} />
          <Route path="users" element={<Users />} />
          <Route path="categories" element={<CategoriesScreen />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
