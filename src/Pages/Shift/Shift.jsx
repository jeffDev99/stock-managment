import { React, useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import api from "../../Services/config";

import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

import { FaEye } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

// hooks
// import "./shift.css";

export default function Shift() {
  const [shift, setShift] = useState([]);
  const [stock, setStock] = useState([]);
  const [mainshift, setMainshift] = useState({});
  const [loading, setLoading] = useState(true);
  const [openShowModal, setOpenShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/api/Shift/getshift");
        setShift(res.data.$values)
      } catch (e) {
        if (e.code === "ERR_NETWORK") {
          Swal.fire({
            icon: "error",
            title: "خطای اینترنت",
            text: "لطفا وضعیت اتصال خود را بررسی کنید",
          }).then(() => {
            setLoading(false);
          });
        }
      }
    })();
  }, [mainshift]);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/api/Stock/get-stocks");
        setStock(res.data.$values);
      } catch (e) {
        if (e.code === "ERR_NETWORK") {
          Swal.fire({
            icon: "error",
            title: "خطای اینترنت",
            text: "لطفا وضعیت اتصال خود را بررسی کنید",
          }).then(() => {
            setLoading(false);
          });
        }
      }
    })();
  }, []);

  const showHandler = (shiftID) => {
    setOpenShowModal(true);
    const findedshift = shift.find((item) => item.id === shiftID);
    setMainshift(findedshift);
    if (shift.length) {
      setMainshift(findedshift);
    }
  };
  const closeShowModal = () => setOpenShowModal(false);

  const editHandler = (shiftID) => {
    navigate(`/dashboard/editshift/${shiftID}`);
  };

  const deleteHandler = (shiftID) => {
    Swal.fire({
      icon: "warning",
      title: "آیا میخواهید شیفت را حذف کنید؟",
      text: "در صورت پاک کردن شیفت، از تمام انبارها پاک میشود",
      showCancelButton: true,
      cancelButtonText: "خیر",
      confirmButtonText: "بله",
    }).then((res) => {
      if (res.isConfirmed) {
        (async () => {
          try {
            // !! change api
            // const response = await api.delete(`/api/Stock/deletegood/${shiftID}`);
            Swal.fire({
              title: "شیفت مورد نظر با موفقیت حذف شد",
              text: "شما شیفت مورد نظر را با موفقیت حذف کردید.",
              icon: "success",
            });
            setMainshift(response.data);
          } catch (e) {
            console.log(e);
          }
        })();
      }
    });
  };

  return (
    <div>
      <div className="card shadow border-0 p-3">
        <div className="row card-filters">
          <h4 className="card__title">
            لیست شیفت ها
            <Button color="primary" variant="contained" startIcon={<IoMdAdd />} className="table-actions__btn me-3">
              <Link to={"/dashboard/addshift"} style={{ color: "inherit", textDecoration: "none" }}>
                اضافه کردن
              </Link>
            </Button>
          </h4>
        </div>
        <div className="table-responsive mt-3">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ردیف</th>
                <th>نام</th>
                <th>ساعت شروع</th>
                <th>ساعت پایان</th>
                <th>عملیات</th>
              </tr>
            </thead>
            <tbody>
              {shift.length ? (
                shift.map((shiftItem, index) => (
                  <tr key={shiftItem.shiftId}>
                    <td>{index + 1}</td>
                    <td>{shiftItem.shiftName}</td>
                    <td>{shiftItem.startTime}</td>
                    <td>{shiftItem.endTime}</td>
                    <td>
                      <div className="table-actions d-flex align-items-center">
                        <Button onClick={() => showHandler(shiftItem.id)} color="secondary" variant="contained" startIcon={<FaEye />} className="table-actions__btn">
                          نمایش
                        </Button>
                        <Button onClick={() => editHandler(shiftItem.id)} color="success" variant="contained" startIcon={<FaPencil />} className="table-actions__btn">
                          ویرایش
                        </Button>
                        <Button onClick={() => deleteHandler(shiftItem.id)} color="error" variant="contained" startIcon={<MdDelete />} className="table-actions__btn">
                          حذف
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8}>
                    <span className="loader"></span>{" "}
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
              <h3 className="modal-title">جزئیات شیفت {mainshift.shiftName}</h3>
              <table className="table table-bordered table-responsive">
                <tbody>
                  <tr>
                    <th>نام</th>
                    <td>{mainshift.shiftName}</td>
                  </tr>
                  <tr>
                    <th>ساعت شروع</th>
                    <td>{mainshift.startTime}</td>
                  </tr>
                  <tr>
                    <th>ساعت پایان</th>
                    <td>{mainshift.endTime}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        </Modal>
      </div>
    </div>
  );
}
