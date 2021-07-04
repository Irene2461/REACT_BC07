import React,{Fragment, useEffect } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import './Checkout.css';
import {layChiTietPhongVeAction} from '../../redux/actions/FilmActions'
import { DAT_GHE } from '../../redux/actions/types/FilmsType';
import _ from 'lodash';
import { USER_LOGIN } from '../../util/setting';
import {Redirect} from 'react-router-dom';
import { datVeAction } from '../../redux/actions/UserActions';

// Thư viện icon của antd
import {UserOutlined} from '@ant-design/icons';


export default function Checkout(props) {
    
    const {chiTietPhongVe, danhSachGheDangDat } = useSelector(state => state.FilmReducer);
    // Do lần đầu lấy về chiTietPhongVe chưa có 2 thuộc tính dưới nên phải khai báo riêng không thể dùng chiTietPhongVe. được

    // Lấy user đang đăng nhập từ store redux về
    const {userLogin} = useSelector(state => state.UserReducer);

    const {thongTinPhim,danhSachGhe} = chiTietPhongVe;
    const dispatch = useDispatch();


    useEffect(() => {
        //Lấy id từ url
        let maLichChieu = props.match.params.id;
        // console.log("Mã lịch chiếu ",maLichChieu);
        // call api
        const action = layChiTietPhongVeAction(maLichChieu);
        dispatch(action);
    }, []);// Không có [] sẽ chạy đến vô tận

    // console.log('chi tiet phong ve', chiTietPhongVe);
    if (!localStorage.getItem(USER_LOGIN)){
        alert("Bạn cần phải đăng nhập")
        return <Redirect to="/login/" />
    }

    const renderGhe = () => {
        return danhSachGhe?.map((ghe,index)=>{
            let classGheVip = ghe.loaiGhe === 'Vip'?'gheVip':'';
            let classGheDaDat = ghe.daDat === true ? 'gheDaDat':'';
            // Mỗi lần render ra 1 ghế đem ghế đó so sánh có trong mảng ghế đang đặt không nếu có thêm css vào
            let classGheDangDat = '';
            let classGheMinhDat = '';
            if (ghe.taiKhoanNguoiDat === userLogin.taiKhoan){
                classGheMinhDat = 'gheMinhDat';
            }
            let indexGheDD = danhSachGheDangDat.findIndex(gheDD=>gheDD.maGhe === ghe.maGhe);
            if (indexGheDD !== -1){
                classGheDangDat = 'gheDangDat';
            }

            return <Fragment key={index}>
                <button onClick={()=>{
                    const action = {
                        type: DAT_GHE,
                        ghe: ghe
                    }
                    dispatch(action);
                }} disabled={ghe.daDat === true} className={`ghe ${classGheVip} ${classGheDaDat} ${classGheDangDat} ${classGheMinhDat}`}>
                    {classGheMinhDat === '' ? ghe.stt : <UserOutlined />}
                </button>
                {(index+1)%16 === 0 ? <br /> : ''}
            </Fragment>
        })
    }


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-8 mt-5">
                    <div className="text-center">
                        <img src="https://tix.vn/app/assets/img/icons/screen.png" alt="..."/>
                        <br />
                        {renderGhe()}
                    </div>
                </div>
                <div className="col-4 mt-2">
                    <div className="text-success display-4 text-center">
                        {danhSachGheDangDat.reduce((tongTien,gheDD,index)=>{
                            return tongTien+=gheDD.giaVe;
                        },0).toLocaleString()} Đ
                    </div>
                    <hr />
                    <div className="thongTinPhim my-2">
                        <p>Tên phim: {thongTinPhim?.tenPhim}</p>
                        <p>Địa điểm: {thongTinPhim?.diaChi} - {thongTinPhim?.tenCumRap}</p>
                        <p>Ngày chiếu: {thongTinPhim?.ngayChieu} - {thongTinPhim?.gioChieu}</p>
                    </div>
                    <hr />
                    <div className="my-2">
                        <div className="row">
                            <div className="col-9">
                                Ghế : {_.sortBy(danhSachGheDangDat,['maGhe']).map((gheDangDat,index)=>{
                                    return <span className="font-weight-bold text-danger" key={index}> {gheDangDat.stt} </span>
                                })}
                            </div>
                            <div className="text-success font-weight-bold">
                                {danhSachGheDangDat.reduce((tongTien,gheDD,index)=>{
                                    return tongTien+=gheDD.giaVe
                                },0).toLocaleString()}
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="my-2">
                        <p>Email: abc@gmail.com</p>
                        <hr />
                        <p>Phone: 0123456789</p>
                    </div>
                    <div onClick={()=>{
                        let thongTinDatVe ={
                            "maLichChieu": props.match.params.id,
                            "danhSachVe": danhSachGheDangDat,
                            "taiKhoanNguoiDung": userLogin.taiKhoan
                        }
                        console.log('thongTinDatVe',thongTinDatVe);
                        dispatch(datVeAction(thongTinDatVe));
                    }} style={{cursor: 'pointer'}} className="w-full bg-success text-white text-center">
                        <div className="display-4 py-2">ĐẶT VÉ</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
