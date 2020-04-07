import * as proc from './processDataUtils.js';
import { List } from 'immutable';

describe('Test filterEmptyRecords() method',()=> {

    it('Check filterEmptyRecords() with empty lines', () => {
        const result = proc.filterEmptyRecords({'Russia': [{
                "date": "2020-1-22",
                "confirmed": 0,
                "deaths": 0,
                "recovered": 0
            }, {
                "date": "2020-1-23",
                "confirmed": 1,
                "deaths": 0,
                "recovered": 0
            }]
        });
        expect(result['Russia']).toHaveLength(1);
        expect(result['Russia'][0].confirmed).toBe(1);
    });

    it('Check filterEmptyRecords() without empty lines', () => {
        const result = proc.filterEmptyRecords({'Russia': [{
                "date": "2020-1-22",
                "confirmed": 1,
                "deaths": 0,
                "recovered": 0
            }, {
                "date": "2020-1-23",
                "confirmed": 2,
                "deaths": 0,
                "recovered": 0
            }]
        });
        expect(result['Russia']).toHaveLength(2);
    });
});

describe('Test dataToGlobalViewByCountries() method',()=> {
    it('Check dataToGlobalViewByCountries() with two lines', () => {
        const result = proc.dataToGlobalViewByCountries({'Russia': [{
                "date": "2020-1-22",
                "confirmed": 10,
                "deaths": 5,
                "recovered": 3
            }, {
                "date": "2020-1-23",
                "confirmed": 15,
                "deaths": 7,
                "recovered": 5
            }]
        });
        expect(result).toEqual(List([{"country": "Russia", "last": {"active": 1, "confirmed": 5, "deaths": 2, "recovered": 2}, "total": {"active": 3, "confirmed": 15, "date": "2020-1-23", "deaths": 7, "recovered": 5}}]));
    });

    it('Check dataToGlobalViewByCountries() with one lines', () => {
        const result = proc.dataToGlobalViewByCountries({'Russia': [{
                "date": "2020-1-23",
                "confirmed": 10,
                "deaths": 5,
                "recovered": 3
            }]
        });
        expect(result).toEqual(List([{"country": "Russia", "last": {"active": 2, "confirmed": 10, "deaths": 5, "recovered": 3}, "total": {"active": 2, "confirmed": 10, "date": "2020-1-23", "deaths": 5, "recovered": 3}}]));
    });
});

it('Check getCountryChartData()', () => {
    const result = proc.getCountryChartData(
        [{
            "date": "2020-1-22",
            "confirmed": 10,
            "deaths": 5,
            "recovered": 3
        }, {
            "date": "2020-1-23",
            "confirmed": 15,
            "deaths": 7,
            "recovered": 5
        }],
        item => item.confirmed
    );
    expect(result).toEqual([[1579640400000, 10], [1579726800000, 15]]);
});

it('Check getChartDataRelative()', () => {
    const result = proc.getChartDataRelative(
        [{
            "date": "2020-1-22",
            "confirmed": 10,
            "deaths": 5,
            "recovered": 3
        }, {
            "date": "2020-1-23",
            "confirmed": 15,
            "deaths": 7,
            "recovered": 5
        }],
        item => item.confirmed
    );
    expect(result).toEqual([[0, 10], [1, 15]]);
});

it('Check dataToCountryList()', () => {
    const result = proc.dataToCountryList({'Russia': [{}], 'Ukraine': [{}]});
    expect(result).toEqual(List(['Russia', 'Ukraine']));
});

it('Check filterFavorite()', () => {
    const result = proc.filterFavorite(List([{"country": "Russia"}, {"country": "Ukraine"}, {"country": "Afghanistan"}]));
    expect(result).toEqual(List([{"country": "Russia"}, {"country": "Ukraine"}]));
});
