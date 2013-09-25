times = 0;
members = 0;
method = 1;
methodName = ['first number', 'start-middle-finish median', 'last number', 'median', 'random'];

function findMedian(array, start, finish){
    var sum = 0, hop = 0, medium, min, median;
        median = start;

        for(var i = start; i<=finish; i++){
            hop++;
            sum+=array[i];
        }

        medium = sum/hop;
        min = Math.abs(array[start]-medium);

        for(var i = start; i<=finish; i++){
            if(Math.abs(array[i]-medium) < min){
                min = Math.abs(array[i]-medium);
                median = i;
            }
        }
    
    return median;
}

function split(array, start, finish){
    var temp, key, i = start + 1, arr=[], pivot, p1, p2, p3, strmed;

    switch(method){
        case 1:
            pivot = start;
            break;
        case 2:
            p1 = start;
            p2 = Math.floor(start + (finish-start)/2);
            p3 = finish;
            strmed = findMedian([array[p1], array[p2], array[p3]], 0, 2);
            switch(strmed){
                case 0:
                    pivot = p1;
                    break;
                case 1:
                    pivot = p2;
                    break;
                case 2:
                    pivot = p3;
                    break;
            }

            break;
        case 3:
            pivot = finish;
            break;
        case 4:
            pivot = findMedian(array, start, finish);
            break;
        case 5:
            pivot = Math.round(start + Math.random()*(finish-start));
            break;
    }

    temp = array[start];
    array[start] = array[pivot];
    array[pivot] = temp;

    key = array[start];
        
    times ++;
    members += (finish-start);

    for(var j = i; j <= finish; j++ ) {
        if(array[j] < key){
            temp = array[i];
            array[i] = array[j];
            array[j] = temp;
            i++;
        }
    }
    array[start] = array[i-1];
    array[i-1] = key;

    return i-1;
}

function quickSort(array, start, finish){
    var isSorted = false;

    if(start < finish){
        var pivot = split(array, start, finish);
        quickSort(array, start, pivot-1);
        quickSort(array, pivot+1, finish);
    }
}

$(document).ready(function(){
    var count = 0;
    $.ajax({
        type: 'get',
        url: 'js/QuickSort.json',
        success: function(response){
            var array = [];

            for(var i=1; i<=5; i++){
                method = i; 
                times = 0;
                members = 0;
                array = [];
                _.each(response, function(str){
                    array.push(parseFloat(str));
                });

                quickSort(array, 0, array.length-1);
                console.log(times, members, methodName[i-1]);
            }
                
            
            
        }
    })
});