// setup redux
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {FilmReducer} from './reducers/FilmReducer';
import {QuanLySanPhamReducer} from './reducers/QuanLySanPhamReducer';
// Cài đặt redux thunk middlewarere
import reduxThunk from 'redux-thunk'

const rootReducer = combineReducers({
    // Chứa các state của toàn ứng dụng
    FilmReducer : FilmReducer,
    QuanLySanPhamReducer
})

export const store = createStore(rootReducer,applyMiddleware(reduxThunk)); 