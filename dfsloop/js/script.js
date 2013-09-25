
function DFSLoop(graph, type, order){
    var t, s, hops= [], stacks = 0, timeout, lengthArr = [];

    if(type == 1){

        t = 0; s = null;
        var queue = [];
        for(var i = max; i>=1; i--){
            if(graph[i].color == 'white'){
                s = i;
                fillQueue(graph, i);
            }
        }
        return queue.reverse();
    } else {
        t = 0; s = null;
        order.forEach(function(el){

            if(graph[el].color == 'white'){
                hops = [];

                s = el;
                DFS(graph, el);
                lengthArr.push(hops.length);
            }
        });
        lengthArr.sort(sort);
        for(var i = lengthArr.length; i>=lengthArr.length-11; i--){
            if(lengthArr[i]) console.log(lengthArr[i]);
        }
    }

    function DFS(graph, i){
        var q = [i];



        while(q.length > 0){
            var vert = q.pop(), tempArr = [];

            hops.push(vert);
            t++;
            graph[vert].color = 'black';
            graph[vert].previous = s;
            graph[vert].step = t;

            _.each(graph[vert].vertexes, function(vertex, index){
                if(graph[vertex].color == 'white'){
                    tempArr.push(vertex);
                }
            });

            tempArr.reverse();

            _.each(tempArr, function(node){
                q.push(node);
            });


        }
    }

    function fillQueue(graph, i){
        var q = [], sc = 0, sc2 = 0, tempArr = [];

        sc2++;
        if(sc2 > 10000){
            sc2 = 0;
            console.log(i);
        }

        $.each(graph[i].vertexes, function(index, vertex){
            q.push(vertex);
        });

        q.reverse();

        if(!_.contains(queue, parseInt(i))){
            queue.push(i);
        }

        while(q.length > 0){
            sc++;
            tempArr = [];
            if(sc > 10000){
                sc = 0;
                console.log(q.length);
            }

            var vert = q.pop();
            if(!_.contains(queue, parseInt(vert))){
                queue.push(vert);
                $.each(graph[vert].vertexes, function(index, vertex){
                   if(graph[vertex].color == 'white'){
                       tempArr.push(vertex);
                   }
                });
                tempArr.reverse();
                tempArr.forEach(function(node){
                    if(!_.contains(q, node)){
                        q.push(node);
                    }
                });
            }

        }
    }

}



function getOrder(graph){
    var arr = [], arr2 = [];
    $.each(graph, function(key, value){
        arr.push([key, value.step]);
    });
    arr.sort(function(a,b){return b[1]-a[1]});
    arr.forEach(function(el){
        arr2.push(parseFloat(el[0]));
    });
    return arr2;
}



function sortArray(a,b){
    return a[0]-b[0];
}

function sort(a,b){
    return parseFloat(a)-parseFloat(b);
}

function buildGraph(array){
    var graph = {}, activeElement = 1;

    array.forEach(function (el) {
        var elVal = el[0];
        if (elVal > activeElement + 1) {
            for (var i = activeElement + 1; i < elVal; i++) {
                graph[i] = {};
                graph[i].vertexes = [];
                graph[i].color = 'white';
                graph[i].previous = null;
                graph[i].step = 0;
                activeElement++;
            }
        }

        if (elVal == activeElement + 1) {
            activeElement++;
        }
        if (!graph[elVal]) {
            graph[elVal] = {};
            graph[elVal].vertexes = [el[1]];
            graph[elVal].color = 'white';
            graph[elVal].previous = null;
            graph[elVal].step = 0;
        } else {
            graph[elVal].vertexes.push(el[1]);
        }
    });

    if(!graph[875710]){
        for (var i = 875710; i <= 875714; i++) {
            graph[i] = {};
            graph[i].vertexes = [];
            graph[i].color = 'white';
            graph[i].previous = null;
            graph[i].step = 0;
            activeElement++;
        }
    }



    
    
    



    $.each(graph, function(key, value){
        value.vertexes.sort(sort);
    });

    return graph;
}

function invertGraph(array){
    var invertedGraph = [];

    array.forEach(function(el){
        el.reverse();
    });

    array.sort(sortArray);
}

function findMax(array){
    var max = 0;
    array.forEach(function(el){
        if(el[0] > max){
            max = el[0];
        }
        if (el[1] > max){
            max = el[1];
        }
    });
    return max;
}


max = 875714;

$(document).ready(function(){
    var count = 0;
    $.ajax({
        type: 'get',
        url: 'js/SCC.json',
        success: function(response){
            console.log('loaded');
            var graph, invertedGraph;
            console.log('sorted');
            graph = buildGraph(response);

            console.log('graph builded');
            invertGraph(response);
            console.log('graph inverted');
            invertedGraph = buildGraph(response);
            console.log('inverted graph builded');
            var order = DFSLoop(invertedGraph, 1);
            console.log('inverted graph looped');
            
            console.log('order got');
            DFSLoop(graph, 2, order);


        }
    })
});