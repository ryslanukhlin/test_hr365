import React from 'react';
import { Table } from 'antd';
import '../style/List.css';

const data = [];
for (let index = 20; index > 0; index--) {
    data.push({
        key: index,
        from: 'Советский р-н, Нижний Новгород, Нижегородская обл., 603022',
        where: 'Р159, 8-9, Нижний Новгород, Нижегородская обл., 603070',
    });
}

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
        render: () => <a>Выбрать</a>,
    },
];

const ListAdresses = ({ width }) => {
    return (
        <Table pagination={false} bordered style={{ width }} columns={columns} dataSource={data} />
    );
};

export default ListAdresses;
