let is_name = (name) => {

    let isName = true;
    for (let i in name) {
        
        if(name[i] == '0' || name[i] == '1' || name[i] == '2' || name[i] == '3' || name[i] == '4' || name[i] == '5' ||
           name[i] == '6' || name[i] == '7' || name[i] == '8' || name[i] == '9'){
                isName = false;
           }
    }return isName;

}

let is_age = (age)=>{
    let isAge = true;
    if(age > 100 || age < 0){
        isAge = false;
    }
    return isAge;
} 

let is_email = (email)=>{

    let isEmail = false;
    let oneArroba = false;
    let oneDot = false;
    let arroba = 0;
    let dots = 0;
    for(let i in email){
        if(email[i] == '@'){
            arroba++;
        }else if(email[i] == '.'){
            dots++;
        }
    }
    if(arroba == 1){
        oneArroba = true;
    }
    if(dots >= 1){
        oneDot = true;
    }

    if(oneArroba == true && oneDot == true){
        isEmail = true;
    }
    return isEmail;
}

let isCorrect = (name,lastName,age,email)=>{

    if(is_name(name) == true && is_name(lastName) == true && is_age(age) == true && is_email(email) == true){
        return true;
    } else return false;
}

module.exports = {

    isName: is_name,
    isAge: is_age,
    isEmail: is_email,
    isValid: isCorrect
}