import {toggle, idCheck, inputCheck, accountCheck} from './Logic/logic_Jared';

describe('tests that the toggle menu show works',() => {
    test('if given false, returns true',() => {
        expect(toggle(false)).toBe(true);
    })
});

describe('tests to see than an id is passed into the function',() => {
    test('if given id',() => {
        expect(idCheck(0)).toBe("number");
    })
});

describe('tests that the input selector is correctly bringing back the right input', () => {
    test('if given e.target.name',() => {
        expect(inputCheck("email")).toBe("string");
    })
})

describe('tests that if an incorrect username or password is used, an 403 error is delivered', () => {
    test('if given an incorrect email/password', () => {
        expect(accountCheck()).toBe(true);
    })
});




/*
 
For postman endpoint testing.

const name = pm.response.json()

pm.test('description here', () => {
    pm.expect(expected variable).to.equal(expected result)
})

*/