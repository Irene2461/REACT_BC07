import React,{Fragment, useEffect } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import './Checkout.css';
import {layChiTietPhongVeAction} from '../../redux/actions/FilmActions'

export default function Checkout(props) {
    const {chiTietPhongVe} = useSelector(state => state.FilmReducer);
    // Do lần đầu lấy về chiTietPhongVe chưa có 2 thuộc tính dưới nên phải khai báo riêng không thể dùng chiTietPhongVe. được
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

    const renderGhe = () => {
        return danhSachGhe?.map((ghe,index)=>{
            let classGheVip = ghe.loaiGhe === 'Vip'?'gheVip':'';
            let classGheDaDat = ghe.daDat === true ? 'gheDaDat':'';
            return <Fragment key={index}>
                <button disabled={ghe.daDat === true} className={`ghe ${classGheVip} ${classGheDaDat}`}>{ghe.stt}</button>
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
                    <div className="text-success display-4 text-center">0 Đ</div>
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
                                Ghế : 01 02 03
                            </div>
                            <div className="text-success font-weight-bold">
                                100
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="my-2">
                        <p>Email: abc@gmail.com</p>
                        <hr />
                        <p>Phone: 0123456789</p>
                    </div>
                    <div style={{cursor: 'pointer'}} className="w-full bg-success text-white text-center">
                        <div className="display-4 py-2">ĐẶT VÉ</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
