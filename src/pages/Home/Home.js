import React, { Component } from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import axios from 'axios'
import {getApiFilmAction} from '../../redux/actions/FilmActions';

class Home extends Component {
    render() {
        return (
            <div className="container">
                <h3>Danh sách phim</h3>
                <div className="row mt-5">
                    {this.props.arrFilm.map((film,index)=>{
                        return <div className="col-4" key={index}>
                                    <div class="card text-white bg-dark"> 
                                      <img class="card-img-top" src={film.hinhAnh} alt />
                                      <div class="card-body"> 
                                        <h4 class="card-title">{film.tenPhim}</h4>
                                      </div>
                                      <NavLink className="btn btn-success" to={`/detail/${film.maPhim}`}>Đặt vé</NavLink>
                                    </div>
                                </div>
                    })}
                </div>
            </div>

        )
    }
    async componentDidMount(){
        // dispatch loại 1: dispatch action là objectobject (type,data)
        // const action = {
        //     type: 'abc',
        //     data: {}
        // }
        // dispatch loại 2: dispatch action là function
        const action = getApiFilmAction('GP01');
        this.props.dispatch(action);
    }
}

const mapStateToProps = state => {
    return {
        arrFilm: state.FilmReducer.arrFilm
    }
}

export default connect(mapStateToProps)(Home);
