import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import Layout from "components/layout/Layout";
import LoginScreen from "screens/Login";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "components/Auth/ProtectedRoute/ProtectedRoute ";
import { messaging } from "./firbase";
import { getToken, onMessage } from "firebase/messaging";
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
import useUser from "hooks/useUser";
function App() {
  const { updateFcm } = useUser();
  const [newOrder, setNewOrder] = useState(1);
  const toast = useRef(null);

  useEffect(() => {
    // Request permission to send notifications
    const requestPermission = async () => {
      try {
        const token = await getToken(messaging, {
          vapidKey:
            "BHBfikqY8olpHPlcqj29svYWxyHIYXHPcWhkuI-cNorF47Go1wVR_CeKFjUoYaHJt4RkArolEbbaI4FaObLDh9c",
        });
        if (token) {
          console.log("FCM Token:", token);
          updateFcm(token);
          // Send this token to your server and subscribe to the topic (admin)
        } else {
          console.error(
            "No registration token available. Request permission to generate one."
          );
        }
      } catch (err) {
        console.error("An error occurred while retrieving token. ", err);
      }
    };

    requestPermission();

    // Listen for messages while the app is in the foreground
    onMessage(messaging, (payload) => {
      showMessage(
        "success",
        payload.notification.title,
        payload.notification.body
      );
      setNewOrder((pre) => (pre = pre + 1));

      const audio = new Audio(sound); // Ensure this path is correct
      const playSound = () => {
        audio.play().catch((error) => {
          console.error("Error playing notification sound:", error);
        });
        // Remove the event listener after playing sound
        window.removeEventListener("click", playSound);
        window.removeEventListener("keydown", playSound);
      };

      playSound();

      new Notification(payload.notification.title, {
        body: payload.notification.body,
        icon: "logo.png",
      });

      console.log("Message received. ", payload);
      // Handle foreground messages here
    });
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
