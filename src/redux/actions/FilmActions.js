import axios from 'axios';
import { get } from 'lodash';
import { quanLyPhimService } from '../../services/quanLyPhimService';
import { ACCESSTOKEN } from '../../util/setting';
import { SET_CHI_TIET_PHONG_VE, SET_FILMS, SET_FILM_DETAIL } from './types/FilmsType';
import { displayLoadingAction, hideLoadingAction } from './types/LoadingActions';


export const getApiFilmAction = (maNhom) => {

    return async (dispatch) => {
        try{
            let result = await quanLyPhimService.layDanhSachPhim();
            // Sau khi lấy dữ liệu từ api về => đưa dữ liệu lên redux
            const action = {
                type: SET_FILMS,
                dataFilms: result.data
            }
            dispatch(action);
        }catch(errors){
            console.log('errors',errors.response.data);
        }
    }
}

export const getFilmDetailAction = (maPhim) => {
    return async dispatch => {
        try{
            let result = await axios({
                url: `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`,
                method: 'GET' 
            });
            console.log('result',result);
            // đưa dữ liệu lên redux
            dispatch({
                type: SET_FILM_DETAIL,
                thongTinChiTiet: result.data
            })
        }catch(errors){
            console.log("errors",errors.response?.data);
        }
    }
}
 
export const layChiTietPhongVeAction = (maLichChieu) => {

    return async dispatch => {
        try {
            const result = await quanLyPhimService.layDanhSachPhim();
            console.log('result',result.data);
            //Sau khi lấy dữ liệu phòng vé từ api về => dispatch lên redux
            dispatch({
                type: SET_CHI_TIET_PHONG_VE,
                chiTietPhongVe: result.data
            })
        }
        catch(error){
            console.log(error.response?.data);
        }
    }


}

export const themPhimAction = (formData) => {
    return async dispatch => {
        try{
            const result = await axios({
                url: `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/ThemPhim`,
                method: 'POST',
                data: formData,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem(ACCESSTOKEN)}`
                }
            })
            console.log('result',result.data);
        }catch(error){
            console.log("error",error.response?.data);
        }
    }
}

export const xoaPhimAction = (maPhim) =>{
    return async dispatch => {
        try{
            const result = await axios({
                url: `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`,
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem(ACCESSTOKEN)}`
                }
            })
            console.log('result',result.data);
        }
        catch(error){
            console.log('error',error.response?.data);
        }
    }
}




