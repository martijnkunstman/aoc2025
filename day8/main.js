
let inputData = [];
let objectData = [];
let result1 = [];
let result2 = 0;

fetch(0 ? "sample.txt" : "input.txt")
    .then(response => response.text())
    .then(data => {
        //-------------------------- parse data --------------------------

        inputData = data.split("\r\n");

        for (let i = 0; i < inputData.length; i++) {
            //parse into array of numbers
            inputData[i] = inputData[i].split(",").map(Number);
            objectData[i] = { id: i, x: inputData[i][0], y: inputData[i][1], z: inputData[i][2], distances: [] };
        }

        //(x1-y1)^2 + (x2-y2)^2 + (x3-y3)^2

        for (let i = 0; i < inputData.length; i++) {
            for (let j = 0; j < inputData.length; j++) {
                if (i !== j) {
                    let dist = Math.pow(inputData[i][0] - inputData[j][0], 2) + Math.pow(inputData[i][1] - inputData[j][1], 2) + Math.pow(inputData[i][2] - inputData[j][2], 2);
                    objectData[i].distances.push({ id: j, dist: dist, parent: i });
                }
                else {
                    objectData[i].distances.push({ id: j, dist: 0, parent: i });

                }
            }
        }        

        let distances = [];
        for (let i = 0; i < objectData.length; i++) {
            for (let j = 0; j < objectData[i].distances.length; j++) {
                if (objectData[i].distances[j].dist !== 0) {
                    distances.push(objectData[i].distances[j]);
                }
            }
        }

        distances.sort((a, b) => a.dist - b.dist);
        //remove duplicates.... (could have done this earlier...)
        removeEveryOdd = (arr) => arr.filter((_, index) => index % 2 === 0);
        distances = removeEveryOdd(distances);
        //to be sure array splice does not f it up during console log....
        let distancesCOpy = JSON.parse(JSON.stringify(distances));
        console.log("points:");
        console.log(distancesCOpy[5436]);
        
        //840, 451 -> 5437
        //670, 316 -> 5436
        //743, 566 -> 5435
        //305, 61 -> 5434

        //670,316
        console.log(objectData[670].x * objectData[316].x);//8289474414 to high answer
        //743, 566
        console.log(objectData[743].x * objectData[566].x);//42047840 yeah!!! (wrong input (typo in number) 288509904 to high -> 42047840)
        //876 connects?

        //583, 415, 867

        distances = distances.slice(0, 5436);///!!!!!!!!!!!!!!!!!!!!!! 5436-1 is de connection... -> i get a 1000 point group!!!
        //find connected parent<->id groups
        let connectedGroups = [] ; //this should have been a set instead.... (but it works anyway...)
        //create groups....
        for (let i = 0; i < distances.length; i++) {
            let found = false;
            for (let j = 0; j < connectedGroups.length; j++) {
                if (connectedGroups[j].includes(distances[i].id)) {
                    found = true;
                }
                if (connectedGroups[j].includes(distances[i].parent)) {
                    found = true;
                }
            }
            if (!found) {
                connectedGroups.push([distances[i].id, distances[i].parent]);
                //remove from distances tro speed up algorithm
                distances.splice(i, 1);
            }
            for (let ii = 0; ii < distances.length; ii++) {
                for (let j = 0; j < connectedGroups.length; j++) {
                    if (connectedGroups[j].includes(distances[ii].id) || connectedGroups[j].includes(distances[ii].parent)) {
                        connectedGroups[j].push(distances[ii].parent);
                        connectedGroups[j].push(distances[ii].id);
                        connectedGroups[j] = [...new Set(connectedGroups[j])]; //with a set from the start i don't need to do this..
                        distances.splice(ii, 1); //speed up...
                        break; //speed up
                        //ii--; //don't need these....
                        //i--;
                    }
                }
            }
        }

        //remove duplicates in groups... (maybe overkill.. nut do it anyway to make sure...)
        for (let i = 0; i < connectedGroups.length; i++) {
            connectedGroups[i] = [...new Set(connectedGroups[i])];
        }

        //make array with lengths of groups...
        let groupLengths = connectedGroups.map(group => group.length);
        //order by length descending.....
        groupLengths.sort((a, b) => b - a);
        //debug to see if there are no double groups.
        console.log(connectedGroups);
        console.log("groupLengths:");
        console.log(groupLengths);

        console.log(distances);
        console.log("Result 2: " + (groupLengths[0] * groupLengths[1] * groupLengths[2]));

        //219539 -> too high (first answer -> duplicates in groups)

        console.log(objectData);
        //-------------------------- part 2 --------------------------
        // code here....

        // i made part 1 into part 2.


        console.log("Result 2: " + result2);
        //--------------------------- end ----------------------------
    })
    .catch(error => {
        console.error('Error fetching the file:', error);
    });