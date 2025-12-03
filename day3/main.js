
let inputData = [];
let result1 = 0;
let result2 = 0;
let highestnumberof12chars = "";
let stringtolookat = "";
let currentSplitNumber = 9;

fetch(0 ? "sample.txt" : "input.txt")
    .then(response => response.text())
    .then(data => {

        //-------------------------- parse data --------------------------

        console.log(data);
        //inputData = data.split("\r\n");//sample
        inputData = data.split("\n"); //input
        console.log(inputData);

        //-------------------------- part 1 --------------------------

        for (let a = 0; a < inputData.length; a++) {
            for (i = 99; i >= 0; i--) {

                let number1 = i.toString().charAt(0);
                let number2 = i.toString().charAt(1);

                let regEx = new RegExp(number1 + ".*" + number2, "g");
                let tempp = inputData[a].match(regEx);
                if (tempp != null) {
                    result1 = result1 + i;
                    break;
                }
            }
        }

        console.log("Result 1: " + result1);

        //-------------------------- part 2 --------------------------

        for (let a = 0; a < inputData.length; a++) {
            stringtolookat = inputData[a];
            currentSplitNumber = 9;
            highestnumberof12chars = "";
            findFirstNumberInmString(stringtolookat, currentSplitNumber);
        }

        function findFirstNumberInmString(string, number) {
            if (highestnumberof12chars.length == 12) {
                result2 = result2 + parseInt(highestnumberof12chars);
                return;
            }
            let index = string.indexOf(number.toString());
            if (index == -1) {
                findFirstNumberInmString(string, number - 1)
            }
            else {
                if (string.length - index < 12 - highestnumberof12chars.length) {
                    findFirstNumberInmString(string, number - 1);
                }
                else {
                    highestnumberof12chars = highestnumberof12chars + number;
                    findFirstNumberInmString(string.substring(index + 1), 9);
                }
            }
        }

        console.log("Result 2: " + result2);

        //--------------------------- end ----------------------------

    })
    .catch(error => {
        console.error('Error fetching the file:', error);
    });


