import React,{useState} from 'react'

export default function UseStateDemo(props) {

    const [state,setState] = useState({
        number: 1
    })
    // Tương đương class
    /**
     * this.state = {number: 1}
     */

    const [number,setNumber] = useState(1);

    const [imgSrc,setImg] = useState('./img/car/products/red-car.jpg');
    const changeColor = (color) =>{
        const newImgSrc = `./img/car/products/${color}-car.jpg`;
        setImg(newImgSrc);
    }

    return (
        <div className="container">
            Demo Usestate
            <h1>{number}</h1>
            <button onClick={()=>{
                setNumber(number+1);
            }}>+</button>
            <hr />
            <h1>{state.number}</h1>
            <button onClick={()=>{
                setState({
                    number: state.number + 1
                })
            }}>+</button>
            <hr />
            <h1>Bài tập chọn xe</h1>
            <div className="row">
                <div className="col-6">
                    <img className="w-100" src={imgSrc} alt="..." />
                </div>
                <div className="col-6">
                    <div className="row">
                        <div className="col-3">
                            <button onClick={()=>{changeColor('red')}} className="btn btn-danger">Red</button>
                        </div>
                        <div className="col-3">
                            <button onClick={()=>{changeColor('black')}} className="btn btn-dark">Đen</button>
                        </div>
                        <div className="col-3">
                            <button onClick={()=>{changeColor('silver')}} className="btn btn-grey">Silver</button>
                        </div>
                        <div className="col-3">
                            <button onClick={()=>{changeColor('steel')}} className="btn btn-secondary">Steel</button>
                        </div>
                    </div>
                </div>
            </div>
            
            
        </div>
    )
}
