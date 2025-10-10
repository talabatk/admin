import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import Layout from "components/layout/Layout";
import LoginScreen from "screens/Login";
import { Route, Routes, useNavigate } from "react-router-dom";
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
import Cities from "components/Cities/Cities";
import Banners from "components/Banners/Banners";
import { useSelector } from "react-redux";
import Setting from "components/Settings/Settings";
import Options from "components/Options/Options";
function App() {
  const [newOrder, setNewOrder] = useState(1);
  const toast = useRef(null);
  const adminInfo = useSelector((state) => state.auth.userData);

  useEffect(() => {
    // Initialize the socket connection
    const SOCKET_URL = "wss://api.talabatk.top";

    let socket = io(SOCKET_URL, {
      transports: ["websocket"],
      reconnection: true, // Enable reconnection
      reconnectionAttempts: Infinity, // Keep trying to reconnect
      reconnectionDelay: 3000, // Wait 3 seconds before retrying
      withCredentials: true,
      timeout: 20000, // Wait 20 seconds before giving up
      autoConnect: true, // Automatically try to connect
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

    socket.on("disconnect", (reason) => {
      console.error("❌ Disconnected:", reason);
      if (reason === "ping timeout") {
        console.warn("🔄 Attempting to reconnect...");
        socket.connect();
      }
    });

    socket.on("pong", () => {
      console.log("📡 Pong received from server");
    });

    // Send a ping manually every 20 seconds (extra safeguard)
    setInterval(() => {
      console.log("📡 Sending ping...");
      socket.emit("ping");
    }, 20000);
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

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout newOrder={newOrder} />
            </ProtectedRoute>
          }>
          <Route index element={<Home />} />

          <Route
            path="orders/*"
            element={
              <ProtectedRoute
                condition={
                  adminInfo?.super_admin || adminInfo?.roles?.manage_orders
                }>
                <Orders newOrder={newOrder} />
              </ProtectedRoute>
            }
          />

          <Route
            path="orders/:id"
            element={
              <ProtectedRoute
                condition={
                  adminInfo?.super_admin || adminInfo?.roles?.manage_orders
                }>
                <OrderDetails showMessage={showMessage} />
              </ProtectedRoute>
            }
          />

          <Route
            path="vendors"
            element={
              <ProtectedRoute
                condition={
                  adminInfo?.super_admin || adminInfo?.roles?.manage_vendors
                }>
                <VendorScreen />
              </ProtectedRoute>
            }
          />

          <Route
            path="vendors/:id"
            element={
              <ProtectedRoute
                condition={
                  adminInfo?.super_admin || adminInfo?.roles?.manage_vendors
                }>
                <EditVendor showMessage={showMessage} />
              </ProtectedRoute>
            }
          />

          <Route
            path="vendors/add"
            element={
              <ProtectedRoute
                condition={
                  adminInfo?.super_admin || adminInfo?.roles?.manage_vendors
                }>
                <AddVendorPage showMessage={showMessage} />
              </ProtectedRoute>
            }
          />

          <Route
            path="products"
            element={
              <ProtectedRoute
                condition={
                  adminInfo?.super_admin || adminInfo?.roles?.manage_products
                }>
                <Products />
              </ProtectedRoute>
            }
          />

          <Route
            path="products/:id"
            element={
              <ProtectedRoute
                condition={
                  adminInfo?.super_admin || adminInfo?.roles?.manage_products
                }>
                <EditProduct showMessage={showMessage} />
              </ProtectedRoute>
            }
          />

          <Route
            path="products/add"
            element={
              <ProtectedRoute
                condition={
                  adminInfo?.super_admin || adminInfo?.roles?.manage_products
                }>
                <AddProduct showMessage={showMessage} />
              </ProtectedRoute>
            }
          />

          <Route
            path="users"
            element={
              <ProtectedRoute
                condition={
                  adminInfo?.super_admin || adminInfo?.roles?.manage_users
                }>
                <Users />
              </ProtectedRoute>
            }
          />

          <Route
            path="categories"
            element={
              <ProtectedRoute
                condition={
                  adminInfo?.super_admin || adminInfo?.roles?.manage_categories
                }>
                <CategoriesScreen />
              </ProtectedRoute>
            }
          />

          <Route
            path="vendor-categories"
            element={
              <ProtectedRoute
                condition={
                  adminInfo?.super_admin || adminInfo?.roles?.manage_categories
                }>
                <VendorCategories />
              </ProtectedRoute>
            }
          />

          <Route
            path="cities"
            element={
              <ProtectedRoute
                condition={
                  adminInfo?.super_admin || adminInfo?.roles?.manage_cities
                }>
                <Cities />
              </ProtectedRoute>
            }
          />

          <Route
            path="complains"
            element={
              <ProtectedRoute>
                <Complains />
              </ProtectedRoute>
            }
          />

          <Route
            path="options"
            element={
              <ProtectedRoute>
                <Options />
              </ProtectedRoute>
            }
          />

          <Route
            path="sliders"
            element={
              <ProtectedRoute>
                <Sliders />
              </ProtectedRoute>
            }
          />

          <Route
            path="banners"
            element={
              <ProtectedRoute>
                <Banners />
              </ProtectedRoute>
            }
          />

          <Route
            path="regions"
            element={
              <ProtectedRoute>
                <Regions />
              </ProtectedRoute>
            }
          />
          <Route
            path="settings"
            element={
              <ProtectedRoute>
                <Setting />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
