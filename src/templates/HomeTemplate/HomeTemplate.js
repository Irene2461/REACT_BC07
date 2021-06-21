import {Route} from 'react-router'
import Header from '../../components/Header/Header';

// HOC: higher order component

export default function HomeTemplate(props) {

    // props = {component: Home, path: '/home'}

    return (
        <Route path={props.path} exact render={(propsRoute)=>{
            return <div>
                <Header />
                <props.component {...propsRoute} />
            </div>
        }} />
    )
}

