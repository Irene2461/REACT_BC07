import React,{useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import { Table, Tag, Space } from 'antd';
import {getApiFilmAction, xoaPhimAction} from '../../redux/actions/FilmActions'
import {useDispatch, useSelector} from 'react-redux';


export default function QuanLyPhim() {

    const {arrFilm} = useSelector(state => state.FilmReducer);

    const dispatch = useDispatch();

    useEffect (() => {
        const action = getApiFilmAction('GP01');
        dispatch(action);
    },[])

    const columns = [
        {
          title: 'Mã phim',
          dataIndex: 'maPhim',
          key: 'maPhim',
          render: (text,film) => <a>{film.maPhim}</a>,
        },
        {
            title: 'Tên phim',
            dataIndex: 'tenPhim',
            key: 'tenPhim',
            render: (text,film) => <a>{film.tenPhim}</a>,
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'hinhAnh',
            key: 'hinhAnh',
            render: (text,film) => <img src={film.hinhAnh} alt={"..."} width={50} height={50} />,
        },
        {
            title: 'Mô tả',
            dataIndex: 'moTa',
            key: 'moTa',
            render: (text,film) => <section>{film.moTa?.length > 50 ? film.moTa.substr(0,50) + '...' : film.moTa}</section>,
        },
        {
            title: 'Action',
            key: 'action',
            render: (text,film) => (
                <Space size="middle">
                    <NavLink to="/" >Tạo lịch chiếu</NavLink>
                    <NavLink to="/" >Chỉnh sửa</NavLink>
                    <NavLink onClick={()=>{
                        // console.log(film);
                        dispatch(xoaPhimAction(film.maPhim));
                    }} to="/admin">Xoá</NavLink>
                </Space>
            ),
        },
    ];
      
    const data = arrFilm;

    return (
        <div className="container" style={{minHeight: '100vh'}}>
            <NavLink className="mb-2 btn btn-primary" to="/admin/addfilm">Thêm phim</NavLink>
            <Table columns={columns} dataSource={data} />
        </div>
    )
}
