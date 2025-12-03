
let inputdata;
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
        //inputData = data.split("\r\n");
        inputData = data.split("\n"); //input
        //inputData = data.split("\n");
        //inputData = data.split(",");
        console.log(inputData);

        //-------------------------- part 1 --------------------------
        // code here....
        for (let a = 0; a < inputData.length; a++) {
            for (i = 99; i >= 0; i--) {
                //make a regex that looks for and 9 and then later or next an 9
                //take first char of string...
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
        // code here....


        for (let a = 0; a < inputData.length; a++) {
            stringtolookat = inputData[a];
            currentSplitNumber = 9;
            highestnumberof12chars = "";
            //find first highest number in strin
            //stringSplitByNumber(stringtolookat, currentSplitNumber);
            findFirstNumberInmString(stringtolookat, currentSplitNumber);
            console.log(a);

        }


        function findFirstNumberInmString(string, number) {
            if (highestnumberof12chars.length == 12) {
                result2 = result2 + parseInt(highestnumberof12chars);
                console.log("highestnumberof12chars v1: " + highestnumberof12chars);
                return;
            }
            //numbers remaining
            if (string.length == 12 - highestnumberof12chars.length) {
                highestnumberof12chars = highestnumberof12chars + string;
                result2 = result2 + parseInt(highestnumberof12chars);
                console.log("highestnumberof12chars v2: " + highestnumberof12chars);
                return;
            }


            let index = string.indexOf(number.toString());
            if (index == -1) {
                //console.log(string);
                number--;
                findFirstNumberInmString(string, number)
            }
            else {
                if (string.length - (index) < 12 - highestnumberof12chars.length) {
                    number--;
                    if (number < 0){
                        console.log("Error - no valid number found");
                        return;
                    }
                    findFirstNumberInmString(string, number);
                }
                else {
                    highestnumberof12chars = highestnumberof12chars + number.toString();
                    number = 9;
                    findFirstNumberInmString(string.substring(index + 1), number);
                }
                //console.log("highestnumberof12chars: " + highestnumberof12chars);
            }
        }
        console.log("Result 2: " + result2);
        //--------------------------- end ----------------------------
    })
    .catch (error => {
    console.error('Error fetching the file:', error);
});


