import { Ring } from "@uiball/loaders";
import "assets/styles/table.scss";
import { useState, useRef, useEffect } from "react";
import { Toast } from "primereact/toast";
import DeleteItem from "components/Ui/DeleteItem/DeleteItem";
import useComplain from "hooks/useComplain";
import Complain from "./complainItem";
import SendNotification from "./SendNotification/SendNotification";
import {
  collection,
  onSnapshot,
  query,
  writeBatch,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "firbase";

const Complains = () => {
  const [complaints, setComplaints] = useState([]);

  const [showDelete, setShowDelete] = useState(false);
  const [showSendNotification, setSendNotification] = useState(false);
  const [selectedComplain, setSelectedComplain] = useState(null);
  const { loading, deleteComplain } = useComplain();
  const toast = useRef(null);

  useEffect(() => {
    const markAllUnseenAsSeen = async () => {
      try {
        const q = query(
          collection(db, "complains"),
          where("seen", "==", false)
        );
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          const batch = writeBatch(db);

          snapshot.docs.forEach((doc) => {
            batch.update(doc.ref, {
              seen: true,
              seenAt: new Date(),
            });
          });

          await batch.commit();
          console.log(`Marked ${snapshot.size} unseen complaints as seen.`);
        }
      } catch (error) {
        console.error("Error updating unseen complaints:", error);
      }
    };

    // Run the update when page loads
    markAllUnseenAsSeen();

    const q = query(collection(db, "complains")); // Add where(...) if you want to filter
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComplaints(data);
    });

    // Cleanup on unmount
    return () => unsubscribe();
  }, []);

  const showMessage = (type, head, content) => {
    toast.current.show({
      severity: type,
      summary: head,
      detail: content,
      life: 3000,
    });
  };

  const toggleDelete = () => {
    setShowDelete((pre) => (pre = !pre));
  };

  const toggleNotification = () => {
    setSendNotification((pre) => (pre = !pre));
  };

  const setSelectedComplainValue = (complain) => {
    setSelectedComplain(complain);
  };

  const confirmDelete = async () => {
    try {
      const response = await deleteComplain(selectedComplain.id);
      // Assuming `response` contains information to check if the operation succeeded

      if (response) {
        showMessage("warn", "تم الحذف", "تم حذف الشكوى بنجاح");
        toggleDelete();
      } else {
        showMessage("error", "هناك خطأ", "حدث خطأ غير متوقع");
      }
    } catch (err) {
      console.error("Error deleting product:", err);
      showMessage("error", "هناك خطأ", "حدث خطأ غير متوقع");
    }
  };

  return (
    <div className="items">
      <Toast style={{ direction: "rtf" }} ref={toast} position="top-left" />
      <h2
        className="text-center"
        style={{ margin: "20px 0", color: "#0f7f3d" }}
      >
        الشكاوى
      </h2>
      {loading ? (
        <div className="loadingSpinner">
          <Ring size={40} lineWeight={5} speed={2} color="#0f7f3d" />
        </div>
      ) : (
        <>
          <div className="row row-cols-1" style={{ padding: "10px" }}>
            {complaints.length ? (
              complaints.map((complain) => (
                <Complain
                  complain={complain}
                  toggleDelete={toggleDelete}
                  setSelectedComplainValue={setSelectedComplainValue}
                  toggleNotification={toggleNotification}
                  key={complain.id}
                />
              ))
            ) : (
              <h3>لا يوجد شكاوى</h3>
            )}
          </div>
          {/* <Stack spacing={1}>
            <Pagination
              count={pages}
              page={page}
              shape="rounded"
              color="#0f7f3d"
              style={{ margin: "20px auto 0" }}
              onChange={handleChangePage}
            />
          </Stack> */}
          <SendNotification
            show={showSendNotification}
            close={toggleNotification}
            fcm={selectedComplain ? selectedComplain.fcm : ""}
            showMessage={showMessage}
          />
          <DeleteItem
            show={showDelete}
            close={toggleDelete}
            loading={loading}
            confirm={confirmDelete}
          />
        </>
      )}
    </div>
  );
};
export default Complains;
