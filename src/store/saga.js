import { all, call } from 'redux-saga/effects';
import LoginActionWatcher from '../container/LoginContainer/saga';
import branchActionWatcher from '../container/branchContainer/saga';
import dashboardActionWatcher from 'container/dashBoardContainer/saga';
//

// import FoDashboardActionWatcher from 'container/foManagementContainer/foDashboardContainer/saga';

function* rootSaga() {
  yield all([
    
    call(LoginActionWatcher),
    call(branchActionWatcher),
    call(dashboardActionWatcher),

  ]);
}

export default rootSaga;
