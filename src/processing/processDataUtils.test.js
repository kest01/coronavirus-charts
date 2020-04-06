import * as proc from './processDataUtils.js';

describe('Test filterEmptyRecords() method',()=> {

    it('Check first tab selected on loading', () => {
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
        })
        expect(result['Russia']).toHaveLength(1);
        expect(result['Russia'][0].confirmed).toBe(1);
    });
});