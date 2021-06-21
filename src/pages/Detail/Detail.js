import React, {Component, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {getFilmDetailAction} from '../../redux/actions/FilmActions';
import TabMenu from './TabMenu';

export default function Detail(props) {
    const dispatch = useDispatch();
    const {thongTinChiTiet} = useSelector(state => state.FilmReducer);
    console.log("Thong Tin Chi Tiet", thongTinChiTiet);

    // Lấy dữ liệu load ra giao diện khi trang vừa load xong
    useEffect(()=>{
        // Hàm sử dụng tương đương componentdidmount tự kích hoạt sau khi giao diện load
        const action = getFilmDetailAction(props.match.params.postId);
        console.log(props.match.params.postId);
        dispatch(action); 
    },[])
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-6">
                    <img className = "w-100" src={thongTinChiTiet.hinhAnh} alt="..."/>
                </div>
                <div className="col-6">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Tên phim</th>
                                <th>{thongTinChiTiet.tenPhim}</th>
                            </tr>
                            <tr>
                                <th>Nội dung</th>
                                <th>{thongTinChiTiet.moTa}</th>  
                            </tr>
                        </thead>
                    </table>
                </div>
                <div className="mt-5">
                    <h3>Thông tin lịch chiếu</h3>
                    <TabMenu heThongRapChieu = {thongTinChiTiet.heThongRapChieu} />
                </div>
            </div>
        </div>
    )
}

