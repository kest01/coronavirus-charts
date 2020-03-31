// @flow

type Data = { [string]: Array<DataItem> }

type VirusFields = {
    confirmed: number,
    deaths: number,
    recovered: number
}

type DataItem = VirusFields & {|
    date?: string,
|}

type CountrySummary = {
    country: string,
    total: VirusFields,
    last: VirusFields,
}

export const dataToGlobalViewByCountries = (data: Data) => {
    const result: Array<CountrySummary> = [];
    Object.keys(data).forEach(value => {
        result.push(parseArrayData(value, data[value]))
    });

    return result
};

const parseArrayData = (country: string, data: Array<DataItem>): CountrySummary => {
    const lastTwoDays = data.slice(-2);
    return {
        country,
        total: lastTwoDays[1],
        last: {
            confirmed: lastTwoDays[1].confirmed - lastTwoDays[0].confirmed,
            deaths: lastTwoDays[1].deaths - lastTwoDays[0].deaths,
            recovered: lastTwoDays[1].recovered - lastTwoDays[0].recovered,
        }
    }
};

/*
const parseArrayData = (data: Array<DataItem>): DataItem => data.reduce((acc: DataItem, item: DataItem): DataItem => {
    return {
        confirmed: acc.confirmed + item.confirmed,
        deaths: acc.deaths + item.deaths,
        recovered: acc.recovered + item.recovered
    }
});*/
