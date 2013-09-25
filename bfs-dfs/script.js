

function BFS(graph, s, d){
    var queue = [], steps = 0, current = s, finalStep;

    graph[s].color = 'grey';

    queue.push(s);
    while(queue.length > 0){
        current = queue.shift();

        if(current == d){
           // return graph[current].step;
        }
        graph[current].vertexes.forEach(function(vertex){
            if(graph[vertex].color == 'white'){
                graph[vertex].color = 'grey';
                graph[vertex].step = graph[current].step + 1;
                graph[vertex].previous = current;
                queue.push(vertex);
                console.log(graph[vertex].step);
            }
        });
        graph[current].color = 'black';
    }

    return false;
}

function DFS(graph){
    var current = 1, finalStep, time = 0;
    visit(current);
    console.log(time);

    function visit(v){
        graph[v].color = 'grey';
        time++;
        graph[v].vertexes.forEach(function(vertex){
            if(graph[vertex].color == 'white'){
                graph[vertex].previous = v;
                visit(vertex);
            }
        });
        graph[v].color = 'black';
        console.log(graph[v].previous + " -> " + v);
    }

}

function invertGraph(graph){
    var newGraph = {};
    $.each(graph, function(vertex){
        newGraph[vertex] = _.clone(graph[vertex]);
        _.extend(newGraph[vertex], {vertexes:[]});
    });
    $.each(newGraph, function(newVertex){
        $.each(graph, function(oldVertex){

        });
    });
    return newGraph;
}