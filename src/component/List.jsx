import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'antd';
import { requestAdress } from '../store/adress/adressReducer';

import '../style/List.css';

const ListAdresses = ({ width }) => {
    const dispatch = useDispatch();
    const { applications, activeAplicationIndex } = useSelector((state) => state.adressReducer);

    const pickAplication = (key) => {
        dispatch(requestAdress(applications[key - 1]));
    };

    const columns = [
        {
            title: 'Откуда',
            dataIndex: 'from',
            key: 'from',
        },
        {
            title: 'Куда',
            dataIndex: 'where',
            key: 'where',
        },
        {
            title: '',
            key: 'action',
            render: (item) => <a onClick={pickAplication.bind(null, item.key)}>Выбрать</a>,
        },
    ];

    return (
        <Table
            pagination={false}
            bordered
            style={{ width }}
            columns={columns}
            dataSource={applications}
            rowClassName={(record, index) => (activeAplicationIndex === index ? 'active_row' : '')}
        />
    );
};

export default ListAdresses;
