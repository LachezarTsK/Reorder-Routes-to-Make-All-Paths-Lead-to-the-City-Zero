
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Queue;

public class Solution {

    private static record Node(int nodeID, int isOriginalIncomingEdge) {}
    private Map<Integer, List<Node>> graph;
    
    private static final int ORIGINAL_INCOMING_EDGE = 1;
    private static final int NOT_ORIGINAL_INCOMING_EDGE = 0;

    public int minReorder(int numberOfCities, int[][] connections) {
        initializeGraph(connections);
        return breadthFirstSearch(numberOfCities);
    }

    private int breadthFirstSearch(int numberOfCities) {

        Queue<Node> queue = new LinkedList<>();
        queue.add(new Node(0, 0));

        boolean[] visited = new boolean[numberOfCities];
        visited[0] = true;

        int countEdgesToBeReversed = 0;

        while (!queue.isEmpty()) {

            Node current = queue.poll();
            if (graph.containsKey(current.nodeID) == false) {
                continue;
            }

            List<Node> next = graph.get(current.nodeID);
            for (Node node : next) {
                if (visited[node.nodeID] == false) {
                    visited[node.nodeID] = true;
                    queue.add(node);
                    countEdgesToBeReversed += node.isOriginalIncomingEdge;
                }
            }
        }
        return countEdgesToBeReversed;
    }

    private void initializeGraph(int[][] connections) {

        graph = new HashMap<>();
        for (int[] edge : connections) {

            int start = edge[0];
            int end = edge[1];

            graph.putIfAbsent(start, new ArrayList<>());
            graph.get(start).add(new Node(end, ORIGINAL_INCOMING_EDGE));

            graph.putIfAbsent(end, new ArrayList<>());
            graph.get(end).add(new Node(start, NOT_ORIGINAL_INCOMING_EDGE));
        }
    }
}
