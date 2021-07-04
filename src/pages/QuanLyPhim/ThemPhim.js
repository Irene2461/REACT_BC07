import React from 'react'
import {useFormik} from 'formik'
import { DatePicker, Space } from 'antd'; 
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { themPhimAction } from '../../redux/actions/FilmActions';

export default function ThemPhim(props) {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            maPhim: '',
            tenPhim: '',
            trailer: '',
            biDanh: '',
            moTa: '',
            maNhom: 'GP01',
            ngayKhoiChieu: '',
            danhGia: 10
        },
        onSubmit: (values) => {
            // console.log('values',values);
            // Biến đổi file JSON thành form data
            let formData = new FormData();
            for (let key in values){
                if (key === 'hinhAnh'){
                    formData.append('File',values[key],values[key].name);
                }else{
                    formData.append(key,values[key]);
                }
            }

            // formData.forEach((value,key)=>{
            //     console.log(value,key);
            // })

            // console.log(formData);

            dispatch(themPhimAction(formData));
        }
    })

    const changeFile = (e) => {
        let file = e.target.files[0];
        formik.setFieldValue('hinhAnh',file);
        console.log(file);

    }

    const changeDate = (date,dateString) => {
        formik.setFieldValue('ngayKhoiChieu',dateString);
        // console.log('dateString',dateString);
    }

    return (
        <form onSubmit={formik.handleSubmit} className="container" style={{minHeight: '100vh'}}>
            <h3>Thêm phim</h3>
            <div className="row">
                <div className="col-6">
                    <div className="form-group">
                        <p>Mã phim</p>
                        <input className="form-control" name="maPhim" onChange={formik.handleChange}/>
                    </div>
                    <div className="form-group">
                        <p>Tên phim</p>
                        <input className="form-control" name="tenPhim" onChange={formik.handleChange}/>
                    </div>
                    <div className="form-group">
                        <p>Mô tả</p>
                        <input className="form-control" name="moTa" onChange={formik.handleChange}/>
                    </div>
                </div>
                <div className="col-6">
                    <div className="form-group">
                        <p>Ngày khởi chiếu</p>
                        <DatePicker format={'DD/MM/YYYY'} className="form-control" onChange={changeDate} />
                    </div>
                    <div className="form-group">
                        <p>trailer</p>
                        <input className="form-control" name="trailer" onChange={formik.handleChange}/>
                    </div>
                    <div className="form-group">
                        <p>Hình ảnh</p>
                        <input className="form-control" name="hinhAnh" type="file" onChange={changeFile}/>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-success">Thêm phim</button>
                    </div>
                </div>
            </div>
            <button className="btn btn-primary" onClick={()=>{
                props.history.goBack();
            }}>Trở về</button>
        </form>
    )
}
