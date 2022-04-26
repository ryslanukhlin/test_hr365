const adressStore = {
    activeAplicationIndex: 0,
    download: true,
    applications: [
        {
            key: 1,
            from: 'Советский р-н, Нижний Новгород, Нижегородская обл., 603022',
            where: 'Р159, 8-9, Нижний Новгород, Нижегородская обл., 603070',
            startX: 56.30116748962799,
            startY: 43.978404912914186,
            endX: 56.33571457390624,
            endY: 43.928922206964785,
        },
        {
            key: 2,
            from: 'Арктическая ул., 7, Нижний Новгород, Нижегородская обл., 603032',
            where: 'г, Московское ш., д.122, Нижний Новгород, Нижегородская обл., 603028',
            startX: 56.27950253395768,
            startY: 43.94172305291914,
            endX: 56.31394361411643,
            endY: 43.89170600176525,
        },
        {
            key: 3,
            from: 'Советская пл., 5, Нижний Новгород, Нижегородская обл., 603122',
            where: 'пл. Минина и Пожарского, Нижний Новгород, Нижегородская обл., 603005',
            startX: 56.29654822266076,
            startY: 44.04093239803175,
            endX: 56.32639941652297,
            endY: 44.00342722879767,
        },
    ],
};

export const SET_ADRESS = 'SET_ADRESS';
export const SET_ACTIVE_INDEX = 'REQUEST_ACTIVE_INDEX';
export const SET_ADRESS_DOWNLOAD = 'SET_ADRESS_DOWNLOAD';
export const REQUEST_ADRESS = 'REQUEST_ADRESS';
export const SET_ADRESNAME = 'SET_ADRESNAME';

const adressReducer = (state = adressStore, action) => {
    switch (action.type) {
        case SET_ADRESS_DOWNLOAD:
            return { ...state, download: action.payload };
        case SET_ADRESS:
            return { ...state, geometry: action.payload };
        case SET_ACTIVE_INDEX:
            return { ...state, activeAplicationIndex: action.payload };
        case SET_ADRESNAME:
            return {
                ...state,
                applications: state.applications.map((item) => {
                    if (action.key === item.key)
                        if (action.start) item.from = action.payload;
                        else item.where = action.payload;
                    return item;
                }),
            };
        default:
            return state;
    }
};

export const requestAdress = (aplication) => ({
    type: REQUEST_ADRESS,
    payload: aplication,
});

export const setAdress = (geometry) => ({
    type: SET_ADRESS,
    payload: geometry,
});

export const setAdressDownload = (download = false) => ({
    type: SET_ADRESS_DOWNLOAD,
    payload: download,
});

export const setActiveIndex = (index) => ({
    type: SET_ACTIVE_INDEX,
    payload: index,
});

export const setAdressName = (adress, start, key) => ({
    type: SET_ADRESNAME,
    payload: adress,
    start,
    key,
});

export default adressReducer;
