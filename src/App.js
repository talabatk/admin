import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import Layout from "components/layout/Layout";
import LoginScreen from "screens/Login";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "components/Auth/ProtectedRoute/ProtectedRoute ";
import VendorScreen from "screens/Vendor";
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
import OrderDetails from "components/Order/OrderDetails/OrderDetails";
import Home from "components/HomePage/HomePage";
import sound from "assets/notification.mp3";
import AddVendorPage from "components/Vendors/AddVendorPage/AddVendorPage";
import EditVendor from "components/Vendors/EditVendor/EditVendor";
import Complains from "components/Complains/Complains";
import { io } from "socket.io-client";
import VendorCategories from "components/VendorCategories/VendorCategories";
function App() {
  const [newOrder, setNewOrder] = useState(1);
  const toast = useRef(null);

  useEffect(() => {
    // Initialize the socket connection
    const SOCKET_URL =
      window.location.hostname === "localhost"
        ? "http://localhost:5000"
        : "https://api.talabatk.top";

    let socket = io(SOCKET_URL, {
      transports: ["websocket"],
      withCredentials: true,
    });

    socket.on("connect", () => {
      console.log("✅ Connected to WebSocket server:", socket.id);
      socket.emit("join-room", "admins");
    });

    // Listen for "new-order-admin" event
    socket.on("new-order-admin", (orderData) => {
      setNewOrder(orderData);
      const audio = new Audio(sound); // Ensure this path is correct

      // Play the sound after user interaction
      audio.play().catch((error) => {
        console.error("Error playing notification sound:", error);
      });

      // Display browser notification
      new Notification("طلببه جديده", {
        body: `هناك طلبيه جديده من ${orderData.name}`,
        icon: "logo.png",
      });

      showMessage(
        "success",
        "طلببه جديده",
        `هناك طلبيه جديده من ${orderData.name}`
      );
    });

    // Listen for "update-order-admin" event
    socket.on("update-order-admin", (orderData) => {
      setNewOrder(orderData);
      new Notification("تحديث للطلبيه", {
        body: `هناك تحديث للطلبيه الخاصه ب ${orderData.name}`,
        icon: "logo.png",
      });
    });

    socket.on("new-message", (message) => {
      console.log(message);
    });
    // Cleanup on component unmount
    return () => {
      socket.disconnect(); // Disconnect the socket
      console.log("🛑 WebSocket disconnected");
    };
  }, []);

  const showMessage = (type, head, content) => {
    toast.current.show({
      severity: type,
      summary: head,
      detail: content,
      life: 10000,
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
          <Route path="complains" element={<Complains />} />
          <Route
            path="vendors/:id"
            element={<EditVendor showMessage={showMessage} />}
          />
          <Route
            path="vendors/add"
            element={<AddVendorPage showMessage={showMessage} />}
          />
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
          <Route path="vendor-categories" element={<VendorCategories />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
