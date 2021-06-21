import {BrowserRouter,Route, Router, Switch} from 'react-router-dom'
import Header from './components/Header/Header'
import Home from './pages/Home/Home'
import Detail from './pages/Detail/Detail'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import DemoAxios from './pages/DemoAxios/DemoAxios'
import About from './pages/About/About'
import HomeTemplate from './templates/HomeTemplate/HomeTemplate'
import UserTemplate from './templates/UserTemplate/UserLogin'
import UseStateDemo from './pages/Hooks/UseStateDemo'
import UserEffectDemo from './pages/Hooks/UseEffectDemo'
import DanhSachSanPham from './pages/Hooks/HookRedux/DanhSachSanPham'
import Checkout from './pages/Checkout/Checkout'
import Task from './pages/Task/Task'
// import TodolistRFC from './pages/Todolistx/TodolistRFC'
// import TodolistRCC from './pages/Todolist/TodolistRCC'
import ToDoList from './pages/Todolist/ToDoList'

// Thư viện giúp chuyển hướng trang
import {createBrowserHistory} from 'history'

export const history = createBrowserHistory();

function App() {
  return (

    <Router history={history}>
      {/* <Header/> */}
      <Switch>
        <HomeTemplate component={Home} path='/home' />
        <HomeTemplate component={About} path='/about' />

        <HomeTemplate component={UseStateDemo} path='/usestate' />
        <HomeTemplate component={UserEffectDemo} path='/useeffect'/>
        <HomeTemplate component={DanhSachSanPham} path='/reduxhook' />

        <UserTemplate component={Login} path='/login' />


        {/* <Route render={(propsRoute)=>{ //propsRoute: là các thuộc tính .history, location, match
          return <div>
            <Header />
            <About {...propsRoute} />
            <hr />
            <footer>
              Đây là footer
            </footer>
          </div>
        }} exact path='/about'/> */}
        <HomeTemplate exact path='/checkout/:id' component={Checkout}/>

        <HomeTemplate exact path='/detail/:postId' component={Detail} />
        <HomeTemplate exact path='/login' component={Login} />
        <HomeTemplate exact path='/register' component={Register} />
        <HomeTemplate exact path='/axios' component={DemoAxios} />
        <HomeTemplate exact path='/home' component={Home} />
        {/* <HomeTemplate exact path='/' component={Home} /> */}


        <HomeTemplate exact path='/' component={ToDoList} />
        <HomeTemplate exact path='/todolist' component={ToDoList} />
        {/* <HomeTemplate exact path='/todolistrfc' component={TodolistRFC} /> */}
        {/* <HomeTemplate exact path='/todolistrcc' component={TodolistRCC} /> */}
      </Switch>
    </Router>
  );
}

export default App;
