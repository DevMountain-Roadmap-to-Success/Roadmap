export var errorMessage;

export function errorCheck(error){
    return errorMessage = error
}

export function addTodoTest(date, time, task){
    return Object.assign({}, { date, time, task })

}
addTodoTest('2019-01-22', '3:00', 'stuff')

var edit = false
export function toggle(){
  return edit = !edit
}

export function upper(string){
    var name = string.toUpperCase()
    return name
}

upper('kim')