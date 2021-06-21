import React, { Component } from 'react'
import axios from 'axios';

export default class DemoAxios extends Component {

    state = {
        arrFilm: []
    }

    renderFilm = () =>{
        return this.state.arrFilm.map((film,index)=>{
            return  <div className="col-4" key={index}> 
                        <div className="card text-white bg-primary">
                            <img className="card-img-top" src={film.hinhAnh} alt />
                            <div className="card-body"> 
                                <h4 className="card-title">{film.tenPhim}</h4>
                            </div> 
                        </div>
                    </div>
        });
    }

    render() {
        return (
            <div className="container">
                <h3>Danh sách phim</h3>
                <div className="row">
                    {this.renderFilm()}
                </div>
            </div>
        )
    }

    async componentDidMount(){
        try{
            let result = await axios({
                url: 'https://movie0706.cybersoft.edu.vn/api/quanlyphim/laydanhsachphim?manhom=GP01',
                method: 'GET'
            });
            this.setState({
                arrFilm : result.data
            })
        }catch(errors){
            console.log("errors",errors.response.data);
        }
    }
}
