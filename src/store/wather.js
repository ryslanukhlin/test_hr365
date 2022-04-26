import { all } from '@redux-saga/core/effects';
import { watcherAdressSaga } from './adress/adressAction';

export default function* rootSaga() {
    yield all([watcherAdressSaga()]);
}
