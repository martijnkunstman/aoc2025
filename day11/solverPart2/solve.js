//find all paths from 427 to 999 that do pass through 258 and 41
fetch('numberGraphInput.txt').then(response => response.text()).then(data => {
    const lines = data.split('\n');
    const graph = {};
    lines.forEach(line => {
        const [node, neighbors] = line.split(': ');
        graph[node.trim()] = neighbors ? neighbors.split(' ').map(n => Number(n)) : [];
    }   
    );
    console.log('Graph loaded:', graph);
    //now i got a nice number based graph where i have to find all paths from 427 to 999 that do pass through 258 and 41
    //find backwards paths from 999 to 427 that pass through 258 and 41

    //start at all 999 end nodes and walk backwards to 427 pass through 258 and 41
    const startNode = 999;
    const endNode = 427;
    const mustPassNodes = [258, 41];
   
    //code??? 
    //how many paths????
    
}).catch(error => console.error('Error fetching the graph data:', error));

