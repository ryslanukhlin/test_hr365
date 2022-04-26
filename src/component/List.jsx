import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Select } from 'antd';
import { requestAdress, setAdressName } from '../store/adress/adressReducer';
import { requestAdressData } from '../store/adress/adressRequest';

import '../style/List.css';

const SelectAdresses = ({ aplication, start }) => {
    const dispatch = useDispatch();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);
    const [list, setList] = useState();

    useEffect(() => {
        (async () => {
            try {
                const list = await requestAdressData(
                    start
                        ? [aplication.startX, aplication.startY]
                        : [aplication.endX, aplication.endY],
                );
                setList(list);
            } catch (e) {
                setError(e.message);
            }
            setLoading(false);
        })();
    }, []);

    const onChangeAdressName = (adress) => {
        dispatch(setAdressName(adress, start, aplication.key));
    };

    if (error) return <div>{start ? aplication.from : aplication.where}</div>;

    return (
        !loading && (
            <Select
                loading={loading}
                defaultValue={list[0].full_name}
                className="select"
                onChange={onChangeAdressName}>
                {list.map((option) => (
                    <Select.Option key={option.id} value={option.full_name} />
                ))}
            </Select>
        )
    );
};

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
            render: (_, aplication) => <SelectAdresses aplication={aplication} start={true} />,
        },
        {
            title: 'Куда',
            dataIndex: 'where',
            render: (_, aplication) => <SelectAdresses aplication={aplication} start={false} />,
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
