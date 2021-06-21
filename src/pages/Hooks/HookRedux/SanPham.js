import React from 'react'
import {useDispatch} from 'react-redux'



export default function SanPham(props) {

    const dispatch = useDispatch();
    return (
        <div class="card text-white bg-dark">
          <img style={{height: 300}} class="card-img-top" src={props.sanPham.hinhAnh} alt="..." />
          <div class="card-body">
            <h4 class="card-title">{props.sanPham.tenSP}</h4>
            <p class="card-text">{props.sanPham.giaBan}</p>
            <button onClick={()=>{
              const action = {
                type: 'XEM_CHI_TIET',
                sanPhamClick: props.sanPham 
              }
              // Đưa dữ liệu lên redux
              dispatch(action);
            }} className="btn btn-success">Xem chi tiết</button>
          </div>
        </div>
    )
}
