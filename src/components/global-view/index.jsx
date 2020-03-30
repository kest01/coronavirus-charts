// @flow
import React from 'react';
import { useTable, useSortBy } from 'react-table'
import './index.scss'

const columns = [
        {
            Header: 'Country',
            accessor: 'country',
        },
        {
            Header: 'Confirmed',
            accessor: 'confirmed',
        },
        {
            Header: 'Deaths',
            accessor: 'deaths',
        },
        {
            Header: 'Recovered',
            accessor: 'recovered',
        },
    ];

type Props = {
    data: Array<any>,
};

export default function Table({ data }: Props) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
            columns,
            data,
        },
        useSortBy
    );

    return (
        <>
            <table className={"ReactTable"} {...getTableProps()}>
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            // Add the sorting props to control sorting. For this example
                            // we can add them into the header props
                            <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                {column.render('Header')}
                                {/* Add a sort direction indicator */}

                            {column.isSorted
                                ? column.isSortedDesc
                                    ? <span className="sort-asc"/>
                                    : <span className="sort-desc"/>
                                : ''}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {rows.map(
                    (row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (
                                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    )
                                })}
                            </tr>
                        )}
                )}
                </tbody>
            </table>
            <br />
        </>
    )
}