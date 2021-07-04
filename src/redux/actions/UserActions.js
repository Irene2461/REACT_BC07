import axios from 'axios';

import {history} from '../../App'
import { ACCESSTOKEN, DOMAIN, USER_LOGIN } from '../../util/setting';
import { layChiTietPhongVeAction } from './FilmActions';
import { displayLoadingAction, hideLoadingAction } from './types/LoadingActions';

export const dangKyAction = (thongTinNguoiDung) => {

    return async dispatch =>{
        
        try{
            const result = await axios({
                url: 'https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangKy',
                method: 'POST',
                data: thongTinNguoiDung
            });
            history.push('/');
            console.log(result.data);
            
        }catch(errors){
            console.log('errors',errors.response?.data);
            
        }
    }
}

export const dangNhapAction = (thongTinDangNhap) =>{
    // thongTinDangNhap: {taiKhoan:'',matKhau:''}
    return async dispatch => {
        try{
            const result = await axios({
                url: `${DOMAIN}/api/QuanLyNguoiDung/DangNhap`,
                method: 'POST',
                data: thongTinDangNhap
            });
            // Đưa lên reducer
            dispatch({
                type: 'DANG_NHAP',
                userLogin: result.data
            })
            // Lưu dữ liệu vào localstorage
            localStorage.setItem(USER_LOGIN,JSON.stringify(result.data));
            localStorage.setItem(ACCESSTOKEN,result.data.accessToken);

            // Đồng thời quay lại trang trước đó
            history.goBack();
        }catch(errors){
            console.log('errors',errors.response?.data);
            alert(errors.response?.data);
        }
    }
}

export const datVeAction = (thongTinDatVe)=>{
    return async dispatch => {
        dispatch(displayLoadingAction);
        try{
            const result = await axios({
                url: `${DOMAIN}/api/quanlydatve/datve`,
                method: 'POST',
                data: thongTinDatVe,
                headers:{
                    'Authorization': `Bearer ${localStorage.getItem(ACCESSTOKEN)}`
                }
            })
            await dispatch({
                type: 'XOA_DANH_SACH_GHE_DANG_DAT'
            })
            // Sau khi đặt vé xong gọi lại action load lại phòng vé
            await dispatch(layChiTietPhongVeAction(thongTinDatVe.maLichChieu))
            // console.log('result',result);
            dispatch(hideLoadingAction);
        }catch(error){
            console.log("error",error.response?.data);
            dispatch(hideLoadingAction);
        }
    }
}