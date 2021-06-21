import React from 'react';
import moment from 'moment'
import { Tabs, Radio, Space } from 'antd';
import {NavLink} from 'react-router-dom';

const { TabPane } = Tabs;

export default class Demo extends React.Component {

  renderHeThongRap = () => {
    // Thêm dấu chấm hỏi để check xem dữ liệu đã gọi từ api lên chưa nếu rồi thì mới call map 
    return this.props.heThongRapChieu?.map((htr,index)=>{
      return <TabPane tab={<div>
        <img width="50" height="50" src={htr.logo} />
      </div>} key={index}>
        {htr.cumRapChieu.map((cumRap)=>{
          return <div> 
            <div className="d-flex flex-row mt-4 ml-2" key={index}>
              <div>
                <img src="https://picsum.photos/50/50" alt="..." />
              </div>
              <div className="ml-2">
                <p>{cumRap.tenCumRap}</p>
              </div>
            </div>
            <div className="ml-2">
              <div className="row">
                {/* Hàm slice (vị trí bắt đầu, số phần tử lấy)  */}
                {cumRap.lichChieuPhim.slice(0,12).map((lichChieu,index)=>{
                  return <div className="col-3 mt-2" key={index}>
                      <NavLink to={`/checkout/${lichChieu.maLichChieu}`}>{moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}</NavLink>
                  </div>
                })}
              </div>
            </div>
          </div>
        })}
      </TabPane>
    })
  }

  render() {
    console.log('props',this.props.heThongRapChieu)
    return (
      <>
        <Tabs tabPosition={'left'}>
          {this.renderHeThongRap()}
        </Tabs>
      </>
    );
  }
}
