import React from 'react'
import {NavLink} from 'react-router-dom'
import {useSelector} from 'react-redux'

export default function Header() {
    const {userLogin} = useSelector(state => state.UserReducer);

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <a className="navbar-brand" href="#">CYBERSOFT</a>
            <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation" />
            <div className="collapse navbar-collapse" id="collapsibleNavId">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <li className="nav-item active">
                    <NavLink activeClassName="bg-white text-dark" activeStyle={{border: `2px solid red`}} className="nav-link" to="/home">Home</NavLink>
                </li>
                <li className="nav-item">
                    {   
                        userLogin.taiKhoan ? <NavLink activeClassName="bg-white text-dark" activeStyle={{border: `2px solid red`}} className="nav-link" to="/login">Hello ! {userLogin.taiKhoan}</NavLink> : <NavLink activeClassName="bg-white text-dark" activeStyle={{border: `2px solid red`}} className="nav-link" to="/login">Login</NavLink>
                    }
                </li>
                <li className="nav-item">
                    <NavLink activeClassName="bg-white text-dark" activeStyle={{border: `2px solid red`}} className="nav-link" to="/register">Register</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink activeClassName="bg-white text-dark" activeStyle={{border: `2px solid red`}} className="nav-link" to="/detail">Detail</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink activeClassName="bg-white text-dark" activeStyle={{border: `2px solid red`}} className="nav-link" to="/todolist">To do list</NavLink>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="dropdownId" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                    <div className="dropdown-menu bg-dark text-white" aria-labelledby="dropdownId">
                        <NavLink className="dropdown-item" to='/axios'>Demo axios</NavLink>
                        <NavLink className="dropdown-item" to='/usestate'>UseState</NavLink>
                        <NavLink className="dropdown-item" to='/useeffect'>UseEffect</NavLink>
                        <NavLink className="dropdown-item" to='/reduxhook'>Redux Hook</NavLink>
                        <NavLink className="dropdown-item" to='/todolistrfc'>To do list RFC</NavLink>
                        <NavLink className="dropdown-item" to='/todolistrcc'>To do list RCC</NavLink>
                    </div>
                </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="text" placeholder="Search" />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
        </nav>

    )
}
