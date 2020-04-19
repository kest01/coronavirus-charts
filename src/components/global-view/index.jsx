// @flow
import React from 'react';
import { useTable, useSortBy } from 'react-table'
import { List } from 'immutable';
import AddToComparisonButton from '../comparison/add-button'
import './index.scss'

import type {CountrySummary} from "../../processing/processDataUtils";


const formatDailyInc = (numberString) => {
    const number = parseInt(numberString);
    if (isNaN(number)) {
        return numberString;
    }
    if (number < 0) return number.toLocaleString('ru-RU');
    else if (number === 0) return '';
    else return '+' + number.toLocaleString('ru-RU');
};

const formatNumber = (numberString) => {
    const number = parseInt(numberString);
    if (isNaN(number)) {
        return numberString;
    }
    return number.toLocaleString('ru-RU');
};


const columns = [
        {
            Header: 'Country',
            accessor: 'country',
        },
        {
            Header: 'Total cases',
            accessor: 'total.confirmed',
            Cell: ({ cell }) => formatNumber(cell.value)
        },
        {
            Header: 'New cases',
            accessor: 'last.confirmed',
            Cell: ({ cell }) => formatDailyInc(cell.value)
        },
        {
            Header: 'Total deaths',
            accessor: 'total.deaths',
            Cell: ({ cell }) => formatNumber(cell.value)
        },
        {
            Header: 'Last deaths',
            accessor: 'last.deaths',
            Cell: ({ cell }) => formatDailyInc(cell.value)
        },
        {
            Header: 'Total recovered',
            accessor: 'total.recovered',
            Cell: ({ cell }) => formatNumber(cell.value)
        },
        {
            Header: 'Last recovered',
            accessor: 'last.recovered',
            Cell: ({ cell }) => formatDailyInc(cell.value)
        },
        {
            Header: 'Total active',
            accessor: 'total.active',
            Cell: ({ cell }) => formatNumber(cell.value)
        },
        {
            Header: 'Active change',
            accessor: 'last.active',
            Cell: ({ cell }) => formatDailyInc(cell.value)
        },
    ];

type Props = {
    data: List<CountrySummary>,
    openCountryDetailAction: (string) => void,
    addCountryToComparisonAction: (string) => void,
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
                                            <td {...cell.getCellProps()}>
                                                <button className={'open-country-button'} onClick={() => props.openCountryDetailAction(cell.row.values.country)}>{cell.render('Cell')}</button>
                                                <AddToComparisonButton onClick={() => props.addCountryToComparisonAction(cell.row.values.country)}/>
                                            </td>
                                        )
                                    } else {
                                        return (
                                            <td className={`global-table-column ${cell.value === 0 ? '' : 'global-table-column-' + i}`} {...cell.getCellProps()}>
                                                {cell.render('Cell')}
                                            </td>
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