import {toggle, idCheck} from './Logic/logic_Jared';

describe('tests that the toggle menu show works',() => {
    test('if given false, returns true',() => {
        expect(toggle(false)).toBe(true);
    })
})

describe('tests to see than an id is passed into the function',() => {
    test('if given id',() => {
        expect(idCheck(0)).toBe("number");
    })
})




/*
 
For postman endpoint testing.

const name = pm.response.json()

pm.test('description here', () => {
    pm.expect(expected variable).to.equal(expected result)
})

*/