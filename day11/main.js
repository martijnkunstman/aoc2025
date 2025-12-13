
let inputData = [];
let result1 = 0;
let result2 = 0;
let connections = [];

/*
aaa: you hhh
you: bbb ccc
bbb: ddd eee
ccc: ddd eee fff
ddd: ggg
eee: out
fff: out
ggg: out
hhh: ccc fff iii
iii: out
*/

fetch(0 ? "sample.txt" : "input.txt")
    .then(response => response.text())
    .then(data => {
        //-------------------------- parse data --------------------------

        data = data.replaceAll("\r", "");
        inputData = data.split("\n");

        console.log(inputData);

        for (let i = 0; i < inputData.length; i++) {
            connections.push(inputData[i].split(" ").map(x => x.replace(":", "")));
        }
        console.log(connections);

        //-------------------------- part 1 -------------------------- 


        //now build an object and put all the keys in it and fill the keys with arrays of connected nodes
        let objectKeysAndConnections = {};
        for (let i = 0; i < connections.length; i++) {
            let node = connections[i][0];
            objectKeysAndConnections[node] = [];
        }

        console.log(objectKeysAndConnections);

        for (let i = 0; i < connections.length; i++) {
            let node = connections[i][0];
            for (let j = 1; j < connections[i].length; j++) {
                if (connections[i][j] == "out") {
                    objectKeysAndConnections[node].push("out");
                }
                else {
                    objectKeysAndConnections[node].push(objectKeysAndConnections[connections[i][j]]);
                }
            }
        }

        let count = 0;
        //loop through all the elements in the object start by you and find all the out values in there...

        function findOuts(node) {
            if (node == "out") {
                count++;
                return;
            }
            for (let i = 0; i < node.length; i++) {
                findOuts(node[i]);
            }
        }

        findOuts(objectKeysAndConnections["you"]);
        console.log("Result 1: " + count);

        //-------------------------- part 2 -------------------------- 

        /*
        svr: aaa bbb
        aaa: fft
        fft: ccc
        bbb: tty
        tty: ccc
        ccc: ddd eee
        ddd: hub
        hub: fff
        eee: dac
        dac: fff
        fff: ggg hhh
        ggg: out
        hhh: out
        */

        /*
        connections = [
            ["svr", "aaa", "bbb"],
            ["aaa", "fft"],
            ["fft", "ccc", 'svr'],
            ["bbb", "tty"],
            ["tty", "ccc"],
            ["ccc", "ddd", "eee"],
            ["ddd", "hub"],
            ["hub", "fff"],
            ["eee", "dac"],
            ["dac", "fff"],
            ["fff", "ggg", "hhh"],
            ["ggg", "out"],
            ["hhh", "out"],
        ];
        */


        let objectKeysAndConnections2 = {};
        for (let i = 0; i < connections.length; i++) {
            let node = connections[i][0];
            objectKeysAndConnections2[node] = {};
        }

        console.log(objectKeysAndConnections2);

        for (let i = 0; i < connections.length; i++) {
            let node = connections[i][0];
            for (let j = 1; j < connections[i].length; j++) {
                if (connections[i][j] == "out") {
                    //if (objectKeysAndConnections2[node]) {
                    objectKeysAndConnections2[node]["out"] = "out";
                    //}
                }
                else {
                    //if (objectKeysAndConnections2[node]) {
                    objectKeysAndConnections2[node][connections[i][j]] = objectKeysAndConnections2[connections[i][j]];
                    //}
                }
            }
        }

        console.log(objectKeysAndConnections2);

        count = 0;

        function findOuts2(node, visited) {
            //loop trhough all keys in node
            if (visited.length > 8) {
                console.log(visited);
                console.log("too deep");
                return; // prevent infinite loops
            }
            for (let key in node) {
                // console.log("key:");
                // console.log(key);
                // console.log("visited:");
                // console.log(visited);
                if (key == "out") {
                    if (visited.includes("fft") && visited.includes("dac")) {
                        count++;
                        console.log("found out, count: " + count);
                    }
                    return;
                }
                else if (!visited.includes(key)) {
                    visited.push(key);
                    findOuts2(node[key], visited);
                    visited.pop();
                }
                else {
                    //loop found
                    console.log("loop found");
                }
            }
        }

        // Start it off
        findOuts2(objectKeysAndConnections2["svr"], ["svr"]);
        console.log("Result 2: " + count);
  
        //--------------------------- end ----------------------------
    })
    .catch(error => {
        console.error('Error fetching the file:', error);
    });