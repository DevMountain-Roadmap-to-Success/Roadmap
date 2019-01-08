const {toggle} = require('./Logic/logic_Jared');

describe('tests the fake toggle show button', () => {
    test('if given false, returns true', () => {
        expect(toggle(false)).toBe(true);
    })
} );