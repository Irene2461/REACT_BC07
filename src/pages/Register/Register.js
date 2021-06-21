import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {useDispatch} from 'react-redux';
import {dangKyAction} from '../../redux/actions/UserActions'; 

export default function Register(props) {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      // Khai báo các thuộc tính trên form
      taiKhoan: "",
      hoTen: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: "",
    },
    validationSchema: Yup.object().shape({
      taiKhoan: Yup.string().required("Tài khoản không được bỏ trống"),
      hoTen: Yup.string().required("Họ tên không được bỏ trống"),
      matKhau: Yup.string()
        .required("Mật khẩu không được bỏ trống")
        .min(6, "Mật khẩu tối thiểu 6-32 ký tự")
        .max(32, "Mật khẩu tối thiểu 6-32 ký tự"),
      email: Yup.string()
        .email("Email không hợp lệ")
        .required("Email không được bỏ trống"),
      soDt: Yup.string().matches(
        /^[0-9]+$/,
        "Số điện thoại không đúng định dạng"
      ),
    }),
    onSubmit: (values) => {
      // value là object chứa giá trị của các input
      const action = dangKyAction(values);
      dispatch(action);
    }
  });

  const { handleChange, touched, errors } = formik;

  // const [state,setState] = useState({
  //     taiKhoan: '',
  //     matKhau: '',
  //     email: '',
  //     soDt: ''
  // })

  // console.log('state',state);

  // const handleChange = (event) => {
  //     let {value,name} = event.target;
  //     setState({
  //         ...state,
  //         [name] : value
  //     })
  // }

  return (
    <form className="container" onSubmit={formik.handleSubmit}>
      <h3>Đăng ký</h3>
      <div className="form-group">
        <p>Tài khoản</p>
        <input
          name="taiKhoan"
          className="form-control"
          onChange={handleChange}
          onBlur={formik.handleBlur}
        />
        {touched.taiKhoan && errors.taiKhoan && (
          <p className="text text-danger">{formik.errors.taiKhoan}</p>
        )}
      </div>
      <div className="form-group">
        <p>Họ tên</p>
        <input
          name="hoTen"
          className="form-control"
          onChange={handleChange}
          onBlur={formik.handleBlur}
        />
        {touched.hoTen && errors.hoTen && (
          <p className="text text-danger">{formik.errors.hoTen}</p>
        )}
      </div>
      <div className="form-group">
        <p>Mật khẩu</p>
        <input
          name="matKhau"
          className="form-control"
          onChange={handleChange}
          onBlur={formik.handleBlur}
        />
        {touched.matKhau && errors.matKhau && (
          <p className="text text-danger">{formik.errors.matKhau}</p>
        )}
      </div>
      <div className="form-group">
        <p>Email</p>
        <input
          name="email"
          className="form-control"
          onChange={handleChange}
          onBlur={formik.handleBlur}
        />
        {touched.email && errors.matKhau && (
          <p className="text text-danger">{formik.errors.email}</p>
        )}
      </div>
      <div className="form-group">
        <p>Số điện thoại</p>
        <input
          name="soDt"
          className="form-control"
          onChange={handleChange}
          onBlur={formik.handleBlur}
        />
        {touched.soDt && errors.soDt && (
          <p className="text text-danger">{formik.errors.soDt}</p>
        )}
      </div>
      <div className="form-group">
        <p>Mã nhóm</p>
        <select name="maNhom" className="maNhom" onChange={handleChange}>
          <option value="GP01">Group 1</option>
          <option value="GP02">Group 2</option>
          <option value="GP03">Group 3</option>
          <option value="GP04">Group 4</option>
        </select>
      </div>
      <div className="form-group">
        <button className="btn btn-success" type="submit">
          Đăng ký
        </button>
      </div>
    </form>
  );
}
