export function toggle(value) {
return !value
};

export function idCheck(value){
    return typeof value;
};

export function inputCheck(value){
    return typeof value;
};

export function accountCheck(status){
    if(status === 403) {return true}
};