


function unionArray(arr1, arr2){
    var arr = [];
    arr1.forEach(function(el){
        arr.push(el);
    });
    arr2.forEach(function(el){
        arr.push(el);
    });
    return arr;
};

function mergeVertices(graph, v1, v2){
    if(graph[v1] && graph[v2]){
        graph[v1] = unionArray(graph[v1], graph[v2]);
        delete graph[v2];
        graph[v1] = _.without(graph[v1], v1, v2);
        _.each(graph, function(value, key){
            _.each(value, function(v, index){
                if(v == v2){
                    graph[key][index] = v1;
                }
            });
        });
    }
};

function getRandom(array){
    return Math.round(Math.random()*array.length);
};

function findMin(graph, v){

    if(_.keys(graph).length > 1){
        var v2 = graph[v][getRandom(graph[v])];

        if(graph[v].length < minCuts){
            minCuts = graph[v].length;
            console.log(minCuts);
        }

        mergeVertices(graph, v, v2);

        findMin(graph, v);

    }
};

function findPath(graph, s, d){

}



$(document).ready(function(){
    var count = 0;
    $.ajax({
        type: 'get',
        url: 'js/kargerMinCut.json',
        success: function(response){
            var graph = {};
            response.forEach(function(el){
                graph[el.shift()] = el;
            });


            minCuts = graph[1].length;
            for(var i = 1; i <= 200; i++){
                var string = JSON.stringify(graph);
                var gr = JSON.parse(string);
                findMin(gr, i);
            }
            console.log('end');
        }
    })
});