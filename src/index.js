function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    bracketsCheck(expr);
    let expression = expr.split(" ").join('');
    let expressionArr = [];
    for (let i = 0; i < expression.length; i++) {
        if(!isNaN(expression[i])){
            let count = 0;
            let number = [];
            while(!isNaN(expression[i+count])){
                number.push(expression[i+count]);
                count++;
            }
            i+=count;  
            expressionArr.push(Number(number.join('')));
        }
        if (i >= expression.length) {
            break;
        }
        expressionArr.push(expression[i]);
    }
    
    return solver(expressionArr);
}

function bracketsCheck(expr) {
    let opened = 0;
    let closed = 0;
    for (let i = 0; i < expr.length; i++) {
        if (expr[i] == '(') {
            opened++;
        }
        if (expr[i] == ')') {
            closed++;
        }
    }
    if (opened != closed) {
        throw("ExpressionError: Brackets must be paired");
    }
}

function solver(exprArr) {
    while(exprArr.length != 1){
        while(exprArr.indexOf('(') != -1) {
            let start = null;
            let finish = null;        
            start = exprArr.indexOf('(');
            for (let i = start; i < exprArr.length; i++) {
                if (exprArr[i] == '(') {
                    start = i;
                }
                if (exprArr[i] == ')') {
                    finish = i;
                    break;
                }
            }
            finish = finish+1;
            let bracketsExpression = exprArr.slice(start+1, finish-1);
            exprArr.splice(start, finish-start,solver(bracketsExpression));
        }
        while(exprArr.indexOf('*') != -1 || exprArr.indexOf('/') != -1){
            if (exprArr.indexOf('*') != -1 && exprArr.indexOf('/') != -1) {
                if (exprArr.indexOf('*') < exprArr.indexOf('/')) {
                    exprArr.splice(exprArr.indexOf('*')-1, 3, exprArr[exprArr.indexOf('*')-1] * exprArr[exprArr.indexOf('*')+1]);
                }
                else{
                    exprArr.splice(exprArr.indexOf('/')-1, 3, exprArr[exprArr.indexOf('/')-1] / exprArr[exprArr.indexOf('/')+1]);
                }
            }
            else{
                if (exprArr.indexOf('*') != -1) {
                    exprArr.splice(exprArr.indexOf('*')-1, 3, exprArr[exprArr.indexOf('*')-1] * exprArr[exprArr.indexOf('*')+1]);
                }
                if (exprArr.indexOf('/') != -1) {
                    if (exprArr[exprArr.indexOf('/')+1] == 0) {
                        throw("TypeError: Division by zero.");
                    }
                    exprArr.splice(exprArr.indexOf('/')-1, 3, exprArr[exprArr.indexOf('/')-1] / exprArr[exprArr.indexOf('/')+1]);
                }
            }
        }
        while(exprArr.indexOf('+') != -1 && exprArr.indexOf('-') != -1) {
            if (exprArr.indexOf('+') < exprArr.indexOf('-')) {
                exprArr.splice(exprArr.indexOf('+')-1, 3, exprArr[exprArr.indexOf('+')-1] + exprArr[exprArr.indexOf('+')+1]);
            }
            else{
                exprArr.splice(exprArr.indexOf('-')-1, 3, exprArr[exprArr.indexOf('-')-1] - exprArr[exprArr.indexOf('-')+1]);
            }
        }
        if (exprArr.indexOf('+') != -1) {
            exprArr.splice(exprArr.indexOf('+')-1, 3, exprArr[exprArr.indexOf('+')-1] + exprArr[exprArr.indexOf('+')+1]);
        }
        if (exprArr.indexOf('-') != -1) {
            exprArr.splice(exprArr.indexOf('-')-1, 3, exprArr[exprArr.indexOf('-')-1] - exprArr[exprArr.indexOf('-')+1]);
        }
    }
    return Number(exprArr);
}
//console.log(expressionCalculator(" 88 - 72 + 55 * 57 "))
module.exports = {
    expressionCalculator
}