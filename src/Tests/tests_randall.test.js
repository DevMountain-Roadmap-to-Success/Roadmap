import {toggle} from "./Logic/logic_randall"

describe("tests the toggle functionality", () => {
    test('if given true, returns false', () => {
        var answer = toggle(true)
        expect(answer).toBe(false)
    })
})

// let newDate = moment(date).format("YYYY-MM-DD");