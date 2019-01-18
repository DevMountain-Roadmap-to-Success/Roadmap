import moment from 'moment'

export function toggle(value) {
    return !value
}

export function checkInput(value){
    return typeof value
}

export function checkDateFormat(format){
    return moment(format).format("YYYY-MM-DD")
}