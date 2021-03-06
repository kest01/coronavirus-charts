// @flow
import { List } from 'immutable';

const favoriteCountries = ['Russia', 'Ukraine', 'Belarus', 'US', 'Italy', 'Israel', 'China', 'Spain', 'Germany'];

type VirusFields = {
    confirmed: number,
    deaths: number,
    recovered: number,
    active: number,
}

export type DataItem = VirusFields & {|
    date?: string,
|}

export type Data = { [string]: Array<DataItem> }

export type CountrySummary = {
    country: string,
    total: VirusFields,
    last: VirusFields,
}

type ChartData = Array<Array<number>>

const timezoneOffset = new Date().getTimezoneOffset() * 60000;

export const filterEmptyRecords = (data: Data): Data => {
    Object.keys(data).forEach(value => {
        data[value] = data[value].filter(item => item.confirmed)
    });

    return data;
};

export const dataToGlobalViewByCountries = (data: Data): List<CountrySummary> => {
    const result: Array<CountrySummary> = [];
    Object.keys(data).forEach(value => {
        result.push(parseArrayData(value, data[value]))
    });

    return List(result);
};

export const dataToCountryList = (data: Data): List<string> => {
    return List(Object.entries(data).map(( [k] ) => k));
};

const parseArrayData = (country: string, data: Array<DataItem>): CountrySummary => {
    const lastTwoDays = data.slice(-2);
    let today: VirusFields, yesterday: VirusFields;
    if (lastTwoDays.length === 2) {
        today = lastTwoDays[1];
        yesterday = lastTwoDays[0];
    } else {
        today = lastTwoDays[0];
        yesterday = {confirmed: 0, recovered: 0, deaths: 0, active: 0}
    }
    return {
        country,
        total: {
            ...today,
            active: getActive(today)
        },
        last: {
            confirmed: today.confirmed - yesterday.confirmed,
            deaths: today.deaths - yesterday.deaths,
            recovered: today.recovered - yesterday.recovered,
            active: getActive(today) - getActive(yesterday),
        }
    }
};

export const getActive = (item: VirusFields): number => item.confirmed - item.recovered - item.deaths;

export const filterFavorite = (data: List<CountrySummary>): List<CountrySummary> =>
    data.filter(item => favoriteCountries.includes(item.country));

export const getCountryChartData = (countryItems: Array<DataItem>, itemValue: (item: VirusFields, prev?: VirusFields) => number, threshold: number = 0): ChartData => {
    let prevItem;
    return countryItems
        .filter(item => item.confirmed > threshold)
        .map(item => {
            const result = [Date.parse(item.date ? item.date : '') - timezoneOffset, itemValue(item, prevItem)];
            prevItem = item;
            return result;
        });
};

export const getChartDataRelative = (countryItems: Array<DataItem>, itemValue: (item: VirusFields, prev?: VirusFields) => number, threshold: number = 0): ChartData => {
    let prevItem;
    return countryItems
        .filter(item => item.confirmed > threshold)
        .map((item, i) => {
            const result = [i, itemValue(item, prevItem)];
            prevItem = item;
            return result;
        });
};

