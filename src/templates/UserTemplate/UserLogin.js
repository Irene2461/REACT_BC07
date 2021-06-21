import {Route} from 'react-router'
import Header from '../../components/Header/Header';

// HOC: higher order component

export default function UserTemplate(props) {

    // props = {component: Home, path: '/home'}

    return (
        <Route path={props.path} exact render={(propsRoute)=>{
            return <div className="row">
                <div className="col-6">
                    <img style={{height: '100vh'}} src="https://picsum.photos/1000/1000" alt="..."/>
                </div>
                <div className="col-6">
                    <props.component {...propsRoute}/>
                </div>
            </div>
        }} />
    )
}


