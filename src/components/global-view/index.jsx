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
            Header: 'Total cases',
            accessor: 'total.confirmed',
        },
        {
            Header: 'New cases',
            accessor: 'last.confirmed',
        },
        {
            Header: 'Total deaths',
            accessor: 'total.deaths',
        },
        {
            Header: 'Last deaths',
            accessor: 'last.deaths',
        },
        {
            Header: 'Total recovered',
            accessor: 'total.recovered',
        },
        {
            Header: 'Last recovered',
            accessor: 'last.recovered',
        },
        {
            Header: 'Total active',
            accessor: 'total.active',
        },
        {
            Header: 'Active change',
            accessor: 'last.active',
        },
    ];

type Props = {
    data: Array<any>,
    openCountryDetailAction: (string) => void,
};

export default function Table(props: Props) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
            columns,
            data: props.data,
            initialState: {
                sortBy: [{ id: 'total.confirmed', desc: true }]
            }
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
                {rows.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell, i) => {
                                    if (i === 0) {
                                        return (
                                            <td {...cell.getCellProps()}><a href="#" onClick={() => props.openCountryDetailAction(cell.row.values.country)}>{cell.render('Cell')}</a></td>
                                        )
                                    } else {
                                        return (
                                            <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        )
                                    }
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