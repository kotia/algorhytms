function dejcstra(array, s){
    var v = _.where(array, {"vertex": s})[0],
        queue = [],
        vertex;
    v.dist = 0;

    v.nodes.forEach(function(node){
        vertex = _.where(array, {vertex: node[0]})[0];
        vertex.dist = node[1];
        queue.push([node[0], node[1]]);
    });
    v.color = 'black';
    queue.sort(sortArray);

    while(queue.length > 0){
        vertex = _.where(array, {vertex: queue.pop()[0]})[0];
        if(vertex.color == 'white'){
            vertex.nodes.forEach(function(node){
                var vert = _.where(array, {vertex: node[0]})[0];
                if(vert.color == "white"){
                    var nodeDist = vertex.dist + node[1];
                    if(vert.dist > nodeDist){
                        vert.dist = nodeDist;
                    }
                    queue.push([node[0], vert.dist]);
                }


            });
            queue.sort(sortArray);
            vertex.color = "black";
        }
    }

}


function sortArray(a,b){
    return parseFloat(b[1])-parseFloat(a[1]);
}

function sort(a,b){
    return parseFloat(a)-parseFloat(b);
}

function cloneObj(graph){
    var json = JSON.stringify(graph);
    return JSON.parse(json);
}




$(document).ready(function(){
    var count = 0;
    $.ajax({
        type: 'get',
        url: 'js/dijkstraData.json',
        success: function(response){
            var array = [7,37,59,82,99,115,133,165,188,197],string = "";
            dejcstra(response, 1);
            array.forEach(function(node){
                var vertex = _.where(response, {vertex:node})[0];
                string+=vertex.dist+",";
            });
            console.log(string);


        }
    })
});