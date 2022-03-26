
#include <unordered_map>
#include <queue>
#include <vector>
using namespace std;

class Solution {

    struct Node {
        int nodeID{};
        int isOriginalIncomingEdge{};
        Node(int nodeID, int isOriginalIncomingEdge) : nodeID{nodeID}, isOriginalIncomingEdge{isOriginalIncomingEdge}{};
    };

    unordered_map<int, vector<Node>> graph;
    inline static const int ORIGINAL_INCOMING_EDGE = 1;
    inline static const int NOT_ORIGINAL_INCOMING_EDGE = 0;

public:

    int minReorder(int numberOfCities, vector<vector<int>>&connections) {
        initializeGraph(connections);
        return breadthFirstSearch(numberOfCities);
    }

private:

    int breadthFirstSearch(int numberOfCities) {

        queue<Node> queue;
        queue.push(Node(0, 0));

        vector<bool> visited(numberOfCities, false);
        visited[0] = true;

        int countEdgesToBeReversed = 0;

        while (!queue.empty()) {

            Node current = queue.front();
            queue.pop();

            if (graph.find(current.nodeID) == graph.end()) {
                continue;
            }

            const vector<Node>& next = graph[current.nodeID];
            for (Node node : next) {
                if (visited[node.nodeID] == false) {
                    visited[node.nodeID] = true;
                    queue.push(node);
                    countEdgesToBeReversed += node.isOriginalIncomingEdge;
                }
            }
        }
        return countEdgesToBeReversed;
    }

    void initializeGraph(const vector<vector<int>>& connections) {

        for (const auto& edge : connections) {

            int start = edge[0];
            int end = edge[1];

            graph[start].push_back(Node(end, ORIGINAL_INCOMING_EDGE));
            graph[end].push_back(Node(start, NOT_ORIGINAL_INCOMING_EDGE));
        }
    }
};
