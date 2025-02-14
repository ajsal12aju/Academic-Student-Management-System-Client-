// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import loginReducer from 'container/LoginContainer/slice';
import branchReducer from 'container/branchContainer/slice';
import dashBoardReducer from 'container/dashBoardContainer/slice';

// import commonMenu from 'container/commonMenuContainer/slice';
import customizationReducer from 'store/customizationReducer';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducer = combineReducers({
  menu: menu,
  login: loginReducer,
  branch: branchReducer,
  dashBoard: dashBoardReducer,
  
  customization: customizationReducer
});

export default reducer;
