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

import "./Stock.css";

export default function Stock() {
  const [stock, setStock] = useState([]);
  const [mainstock, setMainstock] = useState({});
  const [loading, setLoading] = useState(true);
  const [openShowModal, setOpenShowModal] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const res = await api.get("/api/Stock/get-all-stocks");
        setStock(res.data);
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
        }
      }
    })();
  }, [mainstock]);

  const showHandler = (stockID) => {
    setOpenShowModal(true);
    const findedStock = stock.find((item) => item.id === stockID);
    setMainstock(findedStock);
    if (stock.length) {
      setMainstock(findedStock);
    }
  };
  const closeShowModal = () => setOpenShowModal(false);

  const editHandler = (stockID) => {
    navigate(`/dashboard/editStock/${stockID}`);
  };

  const deleteHandler = (stockID) => {
    Swal.fire({
      icon: "warning",
      title: "آیا میخواهید انبار را حذف کنید؟",
      text: "در صورت پاک کردن انبار، تمام محصولات آن هم پاک میشوند",
      showCancelButton: true,
      cancelButtonText: "خیر",
      confirmButtonText: "بله",
    }).then((res) => {
      if (res.isConfirmed) {
        (async () => {
          try {
            const response = await api.delete(`/api/Stock/deletestock/${stockID}`);
            Swal.fire({
              title: "انبار مورد نظر با موفقیت حذف شد",
              text: "شما انبار مورد نظر را با موفقیت حذف کردید.",
              icon: "success",
            });
            setMainstock(response.data.$values);
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
            لیست انبار ها
            <Button color="primary" variant="contained" startIcon={<IoMdAdd />} className="table-actions__btn me-3">
              <Link to={"/dashboard/addstock"} style={{ color: "inherit", textDecoration: "none" }}>
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
                <th>نام کاربری مالک انبار</th>
                <th>عملیات</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8}>
                    <span className="loader"></span>
                  </td>
                </tr>
              ) : stock.length ? (
                stock.map((stockItem, index) => (
                  <tr key={stockItem.id}>
                    <td>{index + 1}</td>
                    <td>{stockItem.stockName}</td>
                    <td>{stockItem.stockOwnerUserName}</td>
                    <td>
                      <div className="table-actions d-flex align-items-center">
                        <Button onClick={() => showHandler(stockItem.id)} color="secondary" variant="contained" startIcon={<FaEye />} className="table-actions__btn">
                          نمایش
                        </Button>
                        <Button onClick={() => editHandler(stockItem.id)} color="success" variant="contained" startIcon={<FaPencil />} className="table-actions__btn">
                          ویرایش
                        </Button>
                        <Button onClick={() => deleteHandler(stockItem.id)} color="error" variant="contained" startIcon={<MdDelete />} className="table-actions__btn">
                          حذف
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8}>
                    <span>هیچ انباری تعریف نشده</span>
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
              <h3 className="modal-title">جزئیات انبار {mainstock?.stockName}</h3>
              <table className="table table-bordered table-responsive">
                <tbody>
                  <tr>
                    <td>نام انبار</td>
                    <td>{mainstock?.stockName}</td>
                  </tr>
                  <tr>
                    <td>نام کاربری مالک انبار </td>
                    <td>{mainstock?.stockOwnerUserName}</td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <Link to={`/dashboard/product/${mainstock?.id}`}>مشاهده کالاهای {mainstock?.stockName}</Link>
                    </td>
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
