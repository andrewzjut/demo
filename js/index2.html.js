
var logNumber = 0;

function showLog(){

	var url_1 = "http://192.168.129.102/log/detail?tableName=localhost_access_log&filterWord=127.0.0.1";
    var url_2 = "http://192.168.129.102/log/detail?table=localhost_access_log&startTime=aa";
    var url = "http://localhost/redirect/"+url_1.substr(22);
    //http://192.168.129.102/log/detail?table=localhost_access_log&startTime=19/Jun/2015:00:00:01
    var filterWord = document.getElementById("search").value;
    //var tableName=document.getElementById("get_log_name").value;
    var tableName = document.getElementById("viewmoretablename").value;
    var start_time = document.getElementById("start_time").value;
    var end_time = document.getElementById("end_time").value;

    var url="http://localhost/redirect/log/detail?"
        + "tableName="  + tableName
        + "&startTime=" + start_time
        + "&endTime="   + end_time
        + "&filterWord="+ filterWord;

    var flag = true;
    switch (tableName) {
        case "mysqld":
            showMysqld(url,flag);
            break;
        case "localhost":
            showLocalhost(url,flag);
            break;
        case "hzcms":
            showHzcms(url,flag);
            break;
        case "catalina" :
            showCatalina(url,flag);
            break;
        default:
            showLocalhost_access_log(url,flag);
    }
}
function viewMore() {
    var filterWord = document.getElementById("search").value;
    var tableName = document.getElementById("viewmoretablename").value;
    var start_time = document.getElementById("start_time").value;
    var end_time = document.getElementById("end_time").value;

    var url="http://localhost/redirect/log/detail?"
        + "tableName="  + tableName
        + "&startTime=" + start_time
        + "&endTime="   + end_time
        + "&filterWord="+ filterWord
        + "&startKey=" + startKey;

    var flag=false;
    switch (tableName) {
        case "mysqld":
            showMysqld(url,flag);
            break;
        case "localhost":
            showLocalhost(url,flag);
            break;
        case "hzcms":
            showHzcms(url,flag);
            break;
        case "catalina" :
            showCatalina(url,flag);
            break;
        default:
            showLocalhost_access_log(url,flag);
    }
}
function showLocalhost_access_log(url,flag){
    $.getJSON(url,function(data){
        if(flag){
            $("#getJSON").empty();
            logNumber=0;
        }
        $.each(data,function(index,item){
            if(index == "entity"){
                if(item ==0){
                    $("#getJSON").append(
                        "<tr>" +"<td>"+ 1 +"</td>"
                        +"<td class=td-color>Server exception</td>"
                        + "</tr>")
                }else{
                    $.each(item,function(key,value){
                        if( key == "resultList"){
                            var pageSize = value.length;
                            startKey=value[pageSize-1].rowkey;
                            for(var j = 0;j<pageSize-1;j++ ){
                                $("#getJSON").append(
                                    "<tr>" +"<td>"+ ++logNumber +"</td>"
                                    + "<td>"
                                    + value[j].remoteHostName + " "
                                    + value[j].logicalUsername+ " "
                                    + value[j].remoteUser+ " "
                                    + value[j].dateTime + "  \""
                                    + value[j].requestFirstLine + "\"  "
                                    + value[j].httpStatus + " "
                                    + value[j].bytesSent
                                    + "</td>"
                                    + "</tr>"
                                );
                            }
                        }
                    })
                }

            }

        })
    })
}
function showMysqld(url,flag){

        $.getJSON(url,function(data){

            if(flag){
                $("#getJSON").empty();
                logNumber=0;
            }
            $.each(data,function(index,item){

                if(index == "entity"){
                    if(item ==0){
                        $("#getJSON").append(
                            "<tr>" +"<td>"+ 1 +"</td>"
                            +"<td class=td-color>Server exception</td>"
                            + "</tr>")
                    }else{
                        $.each(item,function(key,value){

                            if( key == "resultList"){
                                var pageSize = value.length;
                                    startKey=value[pageSize-1].rowkey;

                                for(var j = 0;j<pageSize-1;j++ ){
                                    $("#getJSON").append(
                                        "<tr>" +"<td>"+ ++logNumber +"</td>"
                                        + "<td>"
                                        + value[j].level + " "
                                        + value[j].dateTime+ " "
                                        + value[j].message+ " "
                                        + "</td>"
                                        + "</tr>"
                                    );
                                }
                            }
                        })
                    }

                }

            })
        })
}
function showLocalhost(url,flag){

        $.getJSON(url,function(data){

            if(flag){
                $("#getJSON").empty();
                logNumber=0;
            }
            $.each(data,function(index,item){

                if(index == "entity"){
                    if(item ==0){
                        $("#getJSON").append(
                            "<tr>" +"<td>"+ 1 +"</td>"
                            +"<td class=td-color>Server exception</td>"
                            + "</tr>")
                    }else{
                        $.each(item,function(key,value){
                            if( key == "resultList"){
                                var pageSize = value.length;
                                    startKey=value[pageSize-1].rowkey;

                                for(var j = 0;j<pageSize-1;j++ ){
                                    $("#getJSON").append(
                                        "<tr>" +"<td>"+ ++logNumber +"</td>"
                                        + "<td>"
                                        + value[j].level + " "
                                        + value[j].dateTime+ " "
                                        + value[j].localtion+ " "
                                        + value[j].message +
                                        + "</td>"
                                        + "</tr>"
                                    );
                                }
                            }
                        })
                    }

                }

            })
        })

}
function showHzcms(url,flag){

        $.getJSON(url,function(data){

            if(flag){
                $("#getJSON").empty();
                logNumber=0;
            }
            $.each(data,function(index,item){

                if(index == "entity"){
                    if(item ==0){
                        $("#getJSON").append(
                            "<tr>" +"<td>"+ 1 +"</td>"
                            +"<td class=td-color>Server exception</td>"
                            + "</tr>")
                    }else{
                        $.each(item,function(key,value){
                            if( key == "resultList"){
                                var pageSize = value.length;
                                    startKey=value[pageSize-1].rowkey;

                                for(var j = 0;j<pageSize-1;j++ ){
                                    $("#getJSON").append(
                                        "<tr>" +"<td>"+ ++logNumber +"</td>"
                                        + "<td>"
                                        + value[j].level + " "
                                        + value[j].dateTime+ " "
                                        + value[j].thread+ " "
                                        + value[j].location +  " "
                                        + value[j].message
                                        + "</td>"
                                        + "</tr>"
                                    );
                                }
                            }
                        })
                    }

                }

            })
        })

}
function showCatalina(url,flag) {

    $.getJSON(url, function (data) {

        if(flag){
            $("#getJSON").empty();
            logNumber=0;
        }
        $.each(data, function (index, item) {

            if (index == "entity") {
                if (item == 0) {
                    $("#getJSON").append(
                        "<tr>" + "<td>" + 1 + "</td>"
                        + "<td class=td-color>Server exception</td>"
                        + "</tr>")
                } else {
                    $.each(item, function (key, value) {
                        if (key == "resultList") {
                            var pageSize = value.length;
                                startKey=value[pageSize-1].rowkey;

                            for (var j = 0; j < pageSize - 1; j++) {
                                $("#getJSON").append(
                                    "<tr>" + "<td>" + ++logNumber + "</td>"
                                    + "<td>"
                                    + value[j].level + " "
                                    + value[j].dateTime + " "
                                    + value[j].localtion + " "
                                    + value[j].message + +"</td>"
                                    + "</tr>"
                                );
                            }
                        }
                    })
                }

            }

        })
    })
}