import { DAT_GHE, SET_CHI_TIET_PHONG_VE, SET_FILMS, SET_FILM_DETAIL } from "../actions/types/FilmsType";


const stateDefault = {
    arrFilm: [{maPhim: 1, tenPhim: 'ABC', hinhAnh: 'https://picsum.photos/200/200'}],
    thongTinChiTiet: {},
    chiTietPhongVe: {},
    danhSachGheDangDat: [
        // {
        //     daDat: false,
        //     giaVe: 75000,
        //     loaiGhe: "Thuong",
        //     maGhe: 69224,
        //     maRap: 587,
        //     stt: "64",
        //     taiKhoanNguoiDat: null,
        //     tenGhe: "64"
        // },
        // {
        //     daDat: false,
        //     giaVe: 75000,
        //     loaiGhe: "Thuong",
        //     maGhe: 69225,
        //     maRap: 588,
        //     stt: "65",
        //     taiKhoanNguoiDat: null,
        //     tenGhe: "65"
        // }
    ]
}

export const FilmReducer = (state = stateDefault, action) => {

      switch(action.type){
        case SET_FILMS:{
            state.arrFilm = action.dataFilms
            return {...state};
        }
        case SET_FILM_DETAIL:{
            state.thongTinChiTiet = action.thongTinChiTiet;
            return {...state};
        }
        case SET_CHI_TIET_PHONG_VE:{
            state.chiTietPhongVe = action.chiTietPhongVe;
            return {...state};
        }
        case DAT_GHE:{
            let danhSachGheCapNhat = [...state.danhSachGheDangDat];
            // Tìm actionGhe gửi lên có tồn tại trong mảng ghế đang đặt không. Nêú có => xoá đi, chưa có => thêm vào 
            let index = danhSachGheCapNhat.findIndex(gheDD => gheDD.maGhe === action.ghe.maGhe);
            if (index !== -1){
                danhSachGheCapNhat.splice(index,1);
            }else{
                danhSachGheCapNhat.push(action.ghe);
            }
            state.danhSachGheDangDat = danhSachGheCapNhat;
            return {...state};
        }
        case 'XOA_DANH_SACH_GHE_DANG_DAT':{
            state.danhSachGheDangDat = [];
            return {...state};
        }
        default: return state;
      }
}
