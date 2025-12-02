let inputdata;
let result1 = 0;
let result2 = 0;
//fetch("sample.txt")
//let inputdata;
fetch("input.txt")
    .then(response => response.text())
    .then(data => {
        inputdata = data.split(",");
        for (let i = 0; i < inputdata.length; i++) {
            inputdata[i] = inputdata[i].split("-");
            inputdata[i][0] = parseInt(inputdata[i][0]);
            inputdata[i][1] = parseInt(inputdata[i][1]);
        }
         //----------------------------------------------------
        for (let i = 0; i < inputdata.length; i++) {
            let counter = 0;
            for (let j = inputdata[i][0]; j <= inputdata[i][1]; j++) {
                let current = inputdata[i][0] + counter;
                let string = current.toString();
                let firstpart = string.substring(0, Math.floor(string.length / 2));
                let secondpart = string.substring(Math.floor(string.length / 2));
                if (firstpart ==secondpart) {
                    result1 = result1 + parseInt(firstpart + secondpart);
                }
                counter++;
            }
        }
        console.log("Result 1: " + result1);
        //----------------------------------------------------
        for (let i = 0; i < inputdata.length; i++) {
            let counter = 0;
            for (let j = inputdata[i][0]; j <= inputdata[i][1]; j++) {
                let current = inputdata[i][0] + counter;
                if (checkRepeatingDigits(current)) {
                    result2 = result2 + current;
                }
                counter++;
            }
            console.log(counter);
        }
        console.log("Result 2: " + result2);
         //----------------------------------------------------
    })
    .catch(error => {
        console.error('Error fetching the file:', error);
    });

function checkRepeatingDigits(number) {
    let string = number.toString();
    for (let i = 1; i < string.length; i++) {
        let regex = new RegExp(".{1," + i + "}", "g");
        let temparray = string.match(regex);
        let allEqual = temparray.every(val => val === temparray[0]);
        if (allEqual) {
            return true;
        }
    }
    return false;
}   