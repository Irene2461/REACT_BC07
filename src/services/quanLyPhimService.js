import { baseService } from "./baseService";

export class QuanLyPhimService extends baseService{
    constructor(){
        super();
    }

    layDanhSachPhim = () => {
        return this.get(`/api/quanlyphim/laydanhsachphim?maNhom=GP01`);
    }
    
}

export const quanLyPhimService = new QuanLyPhimService();