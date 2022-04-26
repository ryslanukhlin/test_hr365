import { takeEvery, call, put } from '@redux-saga/core/effects';
import { REQUEST_ADRESS, setAdress, setAdressDownload, setActiveIndex } from './adressReducer';
import { requestRouteData } from './adressRequest';

function* getDataRoute(requestAdress) {
    yield put(setAdressDownload(true));
    const data = yield call(requestRouteData.bind(null, requestAdress.payload));
    yield put(setActiveIndex(requestAdress.payload.key - 1));
    yield put(setAdress(data));
    yield put(setAdressDownload());
}

export function* watcherAdressSaga() {
    yield takeEvery(REQUEST_ADRESS, getDataRoute);
}
