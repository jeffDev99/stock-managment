import { React, useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../Services/config";
import Cookies from "js-cookie";

import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";

import { FaEye } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

import "./Messages.css";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState({});
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openShowModal, setOpenShowModal] = useState(false);
  const [openSendModal, setOpenSendModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const res = await api.get("/api/Messages/inbox", {
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

  // دریافت لیست کاربران
  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/api/Account/GetAllUsers", {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
        setUsers(res.data || []);
      } catch (e) {
        console.error("Error fetching users:", e);
      }
    })();
  }, []);

  const showHandler = (messageId) => {
    setOpenShowModal(true);
    const foundMessage = messages.find((item) => item.id === messageId);
    setSelectedMessage(foundMessage);
  };

  const closeShowModal = () => setOpenShowModal(false);
  const openSendMessageModal = () => setOpenSendModal(true);
  const closeSendModal = () => {
    setOpenSendModal(false);
    form.resetForm();
  };

  const form = useFormik({
    initialValues: {
      receiverId: "",
      content: "",
    },
    validationSchema: Yup.object().shape({
      receiverId: Yup.string().required("انتخاب گیرنده الزامی است"),
      content: Yup.string().min(1, "محتوا نمی‌تواند خالی باشد").required("محتوا الزامی است"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await api.post(
          "/api/Messages/send",
          {
            receiverId: values.receiverId,
            content: values.content,
          },
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );
        if (response.status === 200 || response.status === 201) {
          Swal.fire({
            icon: "success",
            title: "پیام ارسال شد",
            text: "پیام شما با موفقیت ارسال شد",
          });
          closeSendModal();
          // به‌روزرسانی لیست پیام‌ها
          const res = await api.get("/api/Messages/inbox", {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          });
          setMessages(res.data);
        }
      } catch (e) {
        if (e.response?.status === 401) {
          Swal.fire({
            icon: "error",
            title: "خطای احراز هویت",
            text: "شما به این صفحه دسترسی ندارید",
          });
        } else if (e.response?.status === 400) {
          Swal.fire({
            icon: "error",
            title: "خطا در ارسال پیام",
            text: "لطفا ورودی‌های خود را بررسی کنید",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "خطا",
            text: "خطایی در ارسال پیام رخ داد",
          });
        }
      }
    },
  });

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
          <h4 className="card__title">
            لیست پیام‌ها
            <Button color="primary" variant="contained" startIcon={<IoMdAdd />} className="table-actions__btn me-3" onClick={openSendMessageModal}>
              ارسال پیام
            </Button>
          </h4>
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
        {/* send message modal */}
        <Modal open={openSendModal} onClose={closeSendModal}>
          <>
            <div className="modal-wrapper">
              <RxCross2 onClick={closeSendModal} className="modall-cross" />
              <h3 className="modal-title">ارسال پیام</h3>
              <form onSubmit={form.handleSubmit} dir="rtl" style={{ marginTop: "20px" }}>
                <div className="mb-3">
                  <FormControl fullWidth error={form.touched.receiverId && Boolean(form.errors.receiverId)} className="input">
                    <InputLabel id="receiver-select-label">گیرنده</InputLabel>
                    <Select
                      labelId="receiver-select-label"
                      id="receiver-select"
                      value={form.values.receiverId}
                      name="receiverId"
                      label="گیرنده"
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                    >
                      {users.map((user) => (
                        <MenuItem key={user.id} value={user.id}>
                          {user.userName}
                        </MenuItem>
                      ))}
                    </Select>
                    {form.touched.receiverId && form.errors.receiverId && (
                      <FormHelperText>{form.errors.receiverId}</FormHelperText>
                    )}
                  </FormControl>
                </div>
                <div className="mb-3">
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="محتوا"
                    name="content"
                    value={form.values.content}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    error={form.touched.content && Boolean(form.errors.content)}
                    helperText={form.touched.content && form.errors.content}
                    className="input"
                  />
                </div>
                <div className="text-center mt-3">
                  <Button type="submit" variant="contained" color="primary" className="me-2">
                    ارسال
                  </Button>
                  <Button type="button" variant="outlined" color="error" onClick={closeSendModal}>
                    انصراف
                  </Button>
                </div>
              </form>
            </div>
          </>
        </Modal>
      </div>
    </div>
  );
}

