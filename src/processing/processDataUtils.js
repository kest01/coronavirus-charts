// @flow

type Data = { [string]: Array<DataItem> }

type DataItem = {|
    date?: string,
    confirmed: number,
    deaths: number,
    recovered: number
|}

type CountrySummary = {
    country: string,
    confirmed: number,
    deaths: number,
    recovered: number
}

export const dataToGlobalViewByCountries = (data: Data) => {
    const result: Array<CountrySummary> = [];
    Object.keys(data).forEach(value => {
        result.push({
            country: value,
            ...parseArrayData(data[value])
        })
    });

    return result
};

const parseArrayData = (data: Array<DataItem>): DataItem => data.slice(-1)[0];

/*
const parseArrayData = (data: Array<DataItem>): DataItem => data.reduce((acc: DataItem, item: DataItem): DataItem => {
    return {
        confirmed: acc.confirmed + item.confirmed,
        deaths: acc.deaths + item.deaths,
        recovered: acc.recovered + item.recovered
    }
});*/
