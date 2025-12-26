import { React, useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import api from "../../Services/config";
import Cookies from "js-cookie";

import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

import { FaEye } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

import "./SentMessages.css";

export default function SentMessages() {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState({});
  const [loading, setLoading] = useState(true);
  const [openShowModal, setOpenShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const res = await api.get("/api/Messages/sent", {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
        setMessages(res.data);
        setLoading(false);
      } catch (e) {
        if (e.code === "ERR_NETWORK") {
          Swal.fire({
            icon: "error",
            title: "خطای اینترنت",
            text: "لطفا وضعیت اتصال خود را بررسی کنید",
          }).then(() => {
            setLoading(false);
          });
        } else if (e.response?.status === 401) {
          Swal.fire({
            icon: "error",
            title: "خطای احراز هویت",
            text: "شما به این صفحه دسترسی ندارید",
          }).then(() => {
            navigate("/");
            setLoading(false);
          });
        } else if (e.response?.status === 403) {
          Swal.fire({
            icon: "error",
            title: "خطای احراز هویت",
            text: "شما به این صفحه دسترسی ندارید",
          }).then(() => {
            navigate("/");
            setLoading(false);
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "خطا",
            text: "خطایی در دریافت پیام‌ها رخ داد",
          }).then(() => {
            setLoading(false);
          });
        }
      }
    })();
  }, [navigate]);

  const showHandler = (messageId) => {
    setOpenShowModal(true);
    const foundMessage = messages.find((item) => item.id === messageId);
    setSelectedMessage(foundMessage);
  };

  const closeShowModal = () => setOpenShowModal(false);

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div>
      <div className="card shadow border-0 p-3">
        <div className="row card-filters">
          <h4 className="card__title">لیست پیام‌های ارسال شده</h4>
        </div>
        <div className="table-responsive mt-3">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ردیف</th>
                <th>فرستنده</th>
                <th>گیرنده</th>
                <th>محتوا</th>
                <th>تاریخ ارسال</th>
                <th>وضعیت</th>
                <th>عملیات</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7}>
                    <span className="loader"></span>
                  </td>
                </tr>
              ) : messages.length ? (
                messages.map((message, index) => (
                  <tr key={message.id}>
                    <td>{index + 1}</td>
                    <td>{message.senderName || "-"}</td>
                    <td>{message.receiverName || "-"}</td>
                    <td>
                      {message.content && message.content.length > 50
                        ? `${message.content.substring(0, 50)}...`
                        : message.content || "-"}
                    </td>
                    <td>{formatDate(message.sentAt)}</td>
                    <td>
                      <span
                        style={{
                          color: message.isRead ? "green" : "orange",
                          fontWeight: "bold",
                        }}
                      >
                        {message.isRead ? "خوانده شده" : "خوانده نشده"}
                      </span>
                    </td>
                    <td>
                      <div className="table-actions d-flex align-items-center">
                        <Button
                          onClick={() => showHandler(message.id)}
                          color="secondary"
                          variant="contained"
                          startIcon={<FaEye />}
                          className="table-actions__btn"
                        >
                          نمایش
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7}>
                    <span>هیچ پیامی وجود ندارد</span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* show modal */}
        <Modal open={openShowModal} onClose={closeShowModal}>
          <>
            <div className="modal-wrapper">
              <RxCross2 onClick={closeShowModal} className="modall-cross" />
              <h3 className="modal-title">جزئیات پیام</h3>
              <table className="table table-bordered table-responsive">
                <tbody>
                  <tr>
                    <td>فرستنده</td>
                    <td>{selectedMessage?.senderName || "-"}</td>
                  </tr>
                  <tr>
                    <td>گیرنده</td>
                    <td>{selectedMessage?.receiverName || "-"}</td>
                  </tr>
                  <tr>
                    <td>محتوا</td>
                    <td>{selectedMessage?.content || "-"}</td>
                  </tr>
                  <tr>
                    <td>تاریخ ارسال</td>
                    <td>{formatDate(selectedMessage?.sentAt)}</td>
                  </tr>
                  <tr>
                    <td>وضعیت</td>
                    <td>
                      <span
                        style={{
                          color: selectedMessage?.isRead ? "green" : "orange",
                          fontWeight: "bold",
                        }}
                      >
                        {selectedMessage?.isRead ? "خوانده شده" : "خوانده نشده"}
                      </span>
                    </td>
                  </tr>
                  {selectedMessage?.readAt && (
                    <tr>
                      <td>تاریخ خوانده شدن</td>
                      <td>{formatDate(selectedMessage?.readAt)}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        </Modal>
      </div>
    </div>
  );
}

