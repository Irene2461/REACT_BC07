import { useFormik } from 'formik'
import React, { Component } from 'react'
import {useDispatch} from 'react-redux';
import {dangNhapAction} from '../../redux/actions/UserActions';

export default function Login(props) {

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues:{
            taiKhoan: '',
            matKhau: ''
        },
        onSubmit : (values)=>{
            // Gửi thông tin đăng nhập về backend
            dispatch(dangNhapAction(values))
            console.log(values);
        }
    })

    return (
        <div className="container">
            <h3>Login</h3>
            <form onSubmit={formik.handleSubmit} className="form">
                <div className="form-group">
                    <p>Tài khoản</p>
                    <input className="form-control" name="taiKhoan" onChange={formik.handleChange} />
                </div>
                <div className="form-group">
                    <p>Mật khẩu</p>
                    <input type="password" className="form-control" name="matKhau" onChange={formik.handleChange} />
                </div>
                <div className="form-group">
                    <button className="btn btn-success">Đăng nhập</button>
                </div>
            </form>
        </div>
    )
}


// export default class Login extends Component {

//     dangNhap = (event) =>{
//         // Chặn sự kiện submit browser
//         event.preventDefault();

//         // Xử lý xong => chuyển hướng
//         alert("Đăng nhập thành công");

//         // .history.push('path'): Chuyển đến path tương ứng 
//         this.props.history.push('/home');

//         // .history.replace('path'): Thay đổi trang hiện tại bằng path tương ứng
//         // this.props.history.replace('/register');

//         // .history.goBack(): Chuyển đến trang trước đó
//         // this.props.history.goBack();

//     }

//     render() {
//         return (
//             <div className="container">
//                 <h3>Login</h3>
//                 <form onSubmit={this.dangNhap} className="form">
//                     <div className="form-group">
//                         <p>Tài khoản</p>
//                         <input className="form-control" name="taiKhoan" />
//                     </div>
//                     <div className="form-group">
//                         <p>Mật khẩu</p>
//                         <input type="password" className="form-control" name="matKhau" />
//                     </div>
//                     <div className="form-group">
//                         <button className="btn btn-success">Đăng nhập</button>
//                     </div>
//                 </form>
//             </div>
//         )
//     }
// }
