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
// import "./Product.css";

export default function Product() {
  const [product, setProduct] = useState([]);
  const [stock, setStock] = useState([]);
  const [mainProduct, setMainProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [openShowModal, setOpenShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/api/Stock/getallgoods");
        setProduct(res.data);
        console.log(res.data)
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
  }, [mainProduct]);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/api/Stock/get-stocks");
        setStock(res.data);
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

  const showHandler = (productID) => {
    setOpenShowModal(true);
    const findedproduct = product.find((item) => item.id === productID);
    setMainProduct(findedproduct);
    if (product.length) {
      setMainProduct(findedproduct);
    }
  };
  const closeShowModal = () => setOpenShowModal(false);

  const editHandler = (productID) => {
    navigate(`/dashboard/editproduct/${productID}` );
  };

  const deleteHandler = (productID) => {
    Swal.fire({
      icon: "warning",
      title: "آیا میخواهید محصول را حذف کنید؟",
      text: "در صورت پاک کردن محصول، از تمام انبارها پاک میشود",
      showCancelButton: true,
      cancelButtonText: "خیر",
      confirmButtonText: "بله",
    }).then((res) => {
      if (res.isConfirmed) {
        (async () => {
          try {
            const response = await api.delete(`/api/Stock/deletegood/${productID}`);
            Swal.fire({
              title: "محصول مورد نظر با موفقیت حذف شد",
              text: "شما محصول مورد نظر را با موفقیت حذف کردید.",
              icon: "success",
            });
            setMainProduct(response.data);
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
            لیست محصولات
            <Button color="primary" variant="contained" startIcon={<IoMdAdd />} className="table-actions__btn me-3">
              <Link to={"/dashboard/addproduct"} style={{ color: "inherit", textDecoration: "none" }}>
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
                <th>محل فعلی</th>
                <th>انبار</th>
                <th>عملیات</th>
              </tr>
            </thead>
            <tbody>
              {product.length ? (
                product.map((productItem, index) => (
                  <tr key={productItem.id}>
                    <td>{index + 1}</td>
                    <td>{productItem.goodName}</td>
                    <td>{productItem.currentLocation}</td>
                    <td>{stock.find((item) => item.id === productItem.stockId)?.stockName}</td>
                    <td>
                      <div className="table-actions d-flex align-items-center">
                        <Button onClick={() => showHandler(productItem.id)} color="secondary" variant="contained" startIcon={<FaEye />} className="table-actions__btn">
                          نمایش
                        </Button>
                        <Button onClick={() => editHandler(productItem.id)} color="success" variant="contained" startIcon={<FaPencil />} className="table-actions__btn">
                          ویرایش
                        </Button>
                        <Button onClick={() => deleteHandler(productItem.id)} color="error" variant="contained" startIcon={<MdDelete />} className="table-actions__btn">
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
              <h3 className="modal-title">جزئیات محصول {mainProduct.productName}</h3>
              <table className="table table-bordered table-responsive">
                <tbody>
                  <tr>
                    <td>نام محصول</td>
                    <td>{mainProduct.goodName}</td>
                  </tr>
                  <tr>
                    <td>محل فعلی</td>
                    <td>{mainProduct.currentLocation}</td>
                  </tr>
                  <tr>
                    <td>انبار</td>
                    <td>{stock.find((item) => item.id === mainProduct.stockId)?.stockName}</td>
                  </tr>
                  <tr>
                    <td>شماره محصول</td>
                    <td>{mainProduct.goodNO}</td>
                  </tr>
                  <tr>
                    <td>شماره سریال</td>
                    <td>{mainProduct.serialNO}</td>
                  </tr>
                  <tr>
                    <td>توضیحات</td>
                    <td>{mainProduct.description}</td>
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
