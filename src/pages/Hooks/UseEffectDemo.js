import React, {useEffect,useState} from 'react'

export default function UseEffectDemo(props) {
    let [like,setLike] = useState(1);
    let [number,setNumber] = useState(1);
    // Thực hiện như componentDidMount (Chạy 1 lần sau khi giao diện render)
    useEffect(()=>{
        console.log("componentDidMount");
        // Chỗ này thường gọi API

        return () =>{
            console.log("Giống componentWillunmount"); // dùng để huỷ các interval, clear các hàm
        }
    },[])

    // Chạy vô tận do có sự thay đổi của like
    // useEffect(()=>{
    //     console.log("thay didmount và didupdate");
    //     setLike(like+1)
    // })

    useEffect(()=>{
        console.log("componentDidUpdate");
    },[number])

    return (
        <div className="container">
            <h3>UseEffect</h3>
            <h1>{like} like</h1>
            <button onClick={()=>{
                setLike(like + 1)
            }} className="btn btn-success">+</button>
            <button onClick={()=>{
                setLike(like - 1)
            }} className="btn btn-success">-</button>
        </div>
    )
}
