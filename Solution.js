
/**
 * @param {number} numberOfCities
 * @param {number[][]} connections
 * @return {number}
 */
var minReorder = function (numberOfCities, connections) {
    
    this.graph = new Map();
    this.ORIGINAL_INCOMING_EDGE = 1;
    this.NOT_ORIGINAL_INCOMING_EDGE = 0;
    
    initializeGraph(connections);

    return breadthFirstSearch(numberOfCities);
};

/**
 * @param {number} nodeID
 * @param {number} isOriginalIncomingEdge
 */
function Node(nodeID, isOriginalIncomingEdge) {
    this.nodeID = nodeID;
    this.isOriginalIncomingEdge = isOriginalIncomingEdge;
}

/**
 * @param {number} numberOfCities
 * @return {number}
 */
function breadthFirstSearch(numberOfCities) {

    const queue = new Queue();
    queue.enqueue(new Node(0, 0));

    const visited = new Array(numberOfCities).fill(false);
    visited[0] = true;

    let countEdgesToBeReversed = 0;

    while (!queue.isEmpty()) {
        
        let current = queue.dequeue();
        if (this.graph.has(current.nodeID) === false) {
            continue;
        }

        const next = this.graph.get(current.nodeID);
        for (let node of next) {
            if (visited[node.nodeID] === false) {
                visited[node.nodeID] = true;
                queue.enqueue(node);
                countEdgesToBeReversed += node.isOriginalIncomingEdge;
            }
        }
    }
    return countEdgesToBeReversed;
}

/**
 * @param {number[][]} connections
 * @return {void}
 */
function initializeGraph(connections) {

    for (let edge of connections) {

        const start = edge[0];
        const end = edge[1];

        if (this.graph.has(start) === false) {
            this.graph.set(start, []);
        }
        this.graph.get(start).push(new Node(end, this.ORIGINAL_INCOMING_EDGE));

        if (this.graph.has(end) === false) {
            this.graph.set(end, []);
        }
        this.graph.get(end).push(new Node(start, this.NOT_ORIGINAL_INCOMING_EDGE));
    }
}
