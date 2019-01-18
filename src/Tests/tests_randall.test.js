import {toggle, checkInput, checkDateFormat} from "./Logic/logic_randall"
import moment from 'moment'

describe("tests the toggle functionality", () => {
    test('if given true, returns false', () => {
        var answer = toggle(true)
        expect(answer).toBe(false)
    })
})

describe('tests input on time slot', () => {
    test('input should be string',() => {
        expect(checkInput("input")).toBe("string");
    })
    test('input should be string',() => {
        expect(checkDateFormat("date")).toBe(moment("date").format("YYYY-MM-DD"));
    })
})
// let newDate = moment(date).format("YYYY-MM-DD");