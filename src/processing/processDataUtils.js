// @flow

const favoriteCountries = ['Russia', 'Ukraine', 'Belarus', 'US', 'Italy', 'Israel', 'China', 'Spain', 'Germany'];

type Data = { [string]: Array<DataItem> }

type VirusFields = {
    confirmed: number,
    deaths: number,
    recovered: number,
    active: number,
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

export const dataToCountryList = (data: Data): Array<string> => {
    return Object.entries(data).map(( [k] ) => k);
};

const parseArrayData = (country: string, data: Array<DataItem>): CountrySummary => {
    const lastTwoDays = data.slice(-2);
    return {
        country,
        total: {
            ...lastTwoDays[1],
            active: getActive(lastTwoDays[1])
        },
        last: {
            confirmed: lastTwoDays[1].confirmed - lastTwoDays[0].confirmed,
            deaths: lastTwoDays[1].deaths - lastTwoDays[0].deaths,
            recovered: lastTwoDays[1].recovered - lastTwoDays[0].recovered,
            active: getActive(lastTwoDays[1]) - getActive(lastTwoDays[0])
        }
    }
};

const getActive = (item: VirusFields): number => item.confirmed - item.recovered - item.deaths

export const filterFavorite = (data: Array<CountrySummary>): Array<CountrySummary> =>
    data.filter(item => favoriteCountries.includes(item.country));

/*
const parseArrayData = (data: Array<DataItem>): DataItem => data.reduce((acc: DataItem, item: DataItem): DataItem => {
    return {
        confirmed: acc.confirmed + item.confirmed,
        deaths: acc.deaths + item.deaths,
        recovered: acc.recovered + item.recovered
    }
});*/
