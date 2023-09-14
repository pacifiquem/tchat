import { getRandomNumber } from '../utils/helper'

test('Check if random number generator work', () => { 
    let max_num = 10;
    let min_num = 0;

    let random_num = getRandomNumber(min_num, max_num);

    expect(random_num).toBeGreaterThanOrEqual(min_num);
    expect(value).toBeLessThanOrEqual(max_num);
});