var logNumber = 0;

var tableName ="localhost_access_log";

function changeTableName(tn){
    tableName = tn;
    $("#search").val('');
    $("#start_time").val('');
    $("#end_time").val('');
    switch (tableName) {
        //case "localhost_access_log":
        //    document.getElementById("searchCondition").innerHTML="搜索 ip：";
        //    break;
        //default:
        //    document.getElementById("searchCondition").innerHTML="日志级别：";
        case "mysqld":
            document.getElementById("searchCondition").innerHTML="日志级别：";
            document.getElementById("changeLogInfoName").innerHTML="mysql日志信息：";
            var mysql="<select id=\"search\" name=\"log_name\" style=\"width:150px;height:25px\">" +
                "<option value=\"\">ALL</option> " +
                "<option value=\"Warn\">Warning</option> " +
                "<option value=\"Note\" >Note</option> " +
                "<option value=\"ERROR\">ERROR</option> " +
                "</select>";
            $("#search").remove;
            $("#searchCondition").append(mysql);
            break;
        case "localhost":
            document.getElementById("searchCondition").innerHTML="日志级别：";
            document.getElementById("changeLogInfoName").innerHTML="localhost日志信息：";
            var local="<select id=\"search\" name=\"log_name\" style=\"width:150px;height:25px\">" +
                "<option value=\"\">ALL</option> " +
                "<option value=\"SEVERE\" >SEVERE</option> " +
                "<option value=\"WARNING\" >WARNING</option> " +
                "<option value=\"INFO\">INFO</option> " +
                "<option value=\"CONFIG\">CONFIG</option> " +
                "<option value=\"FINE\">FINE</option> " +
                "<option value=\"FINER\">FINER</option> " +
                "<option value=\"FINEST\">FINEST</option> " +
                "</select>";
            $("#search").remove;
            $("#searchCondition").append(local);
            break;
        case "hzcms":
            document.getElementById("searchCondition").innerHTML="日志级别：";
            document.getElementById("changeLogInfoName").innerHTML="hzcms日志信息：";
            var hz="<select id=\"search\" name=\"log_name\" style=\"width:150px;height:25px\">" +
                "<option value=\"\">ALL</option> " +
                "<option value=\"WARN\" >WARN</option> " +
                "<option value=\"ERROR\" >ERROR</option> " +
                "<option value=\"INFO\">INFO</option> " +
                "<option value=\"DEBUG\">DEBUG</option> " +
                "</select>";
            $("#search").remove;
            $("#searchCondition").append(hz);

            break;
        case "catalina" :
            document.getElementById("searchCondition").innerHTML="日志级别：";
            document.getElementById("changeLogInfoName").innerHTML="catalina日志信息：";

            var cata="<select id=\"search\" name=\"log_name\" style=\"width:150px;height:25px\">" +
                "<option value=\"\">ALL</option> " +
                "<option value=\"SEVERE\">SEVERE</option> " +
                "<option value=\"WARNING\" >WARNING</option> " +
                "<option value=\"INFO\">INFO</option> " +
                "<option value=\"CONFIG\">CONFIG</option> " +
                "<option value=\"FINE\">FINE</option> " +
                "<option value=\"FINER\">FINER</option> " +
                "<option value=\"FINEST\">FINEST</option> " +
                "</select>";
            //document.getElementById("searchCondition").innerHTML="搜索 ip：";
            $("#search").remove;
            $("#searchCondition").append(cata);
            break;
        default:
            var acc="<input  id=\"search\" name=\"GETIP\"  type=\"text\" style=\"width:150px;height:25px\">";
            document.getElementById("searchCondition").innerHTML="搜索 ip：";
            $("#search").remove;
            $("#searchCondition").append(acc);
            document.getElementById("changeLogInfoName").innerHTML="access日志信息:";

    }
}

function showLog(){
    var filterWord = document.getElementById("search").value;
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
    //var tableName = document.getElementById("viewmoretablename").value;
    var start_time = document.getElementById("start_time").value;
    var end_time = document.getElementById("end_time").value;

    var url="http://localhost/redirect/log/detail?"
        + "tableName="  + tableName
        + "&startTime=" + start_time
        //+ "&endTime="   + end_time
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
                        "<tr>" +"<td>"+ ++logNumber +"</td>"
                        +"<td class=td-color>Server exception</td>"
                        + "</tr>")
                }else{
                    $.each(item,function(key,value){
                        if( key == "resultList"){
                            var pageSize = value.length;
                                if(pageSize <41 ){
                                    document.getElementById("displayOrNot").style.display="none";
                                    //pageSize =pageSize+1;
                                }else{
                                    document.getElementById("displayOrNot").style.removeProperty('display');
                                }
                            startKey=value[pageSize-1].rowkey;

                            for(var j = 0;pageSize<41?j<=pageSize-1:j<pageSize-1;j++ ){
                                $("#getJSON").append(
                                    "<tr>" +"<td>"+ ++logNumber +"</td>"
                                    + "<td>"
                                    + value[j].remoteHostName + " "
                                    + value[j].logicalUsername+ " "
                                    + value[j].remoteUser+ " ["
                                    + value[j].dateTime + "]  \""
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
                            "<tr>" +"<td>"+ ++logNumber +"</td>"
                            +"<td class=td-color>Server exception</td>"
                            + "</tr>")
                    }else{
                        $.each(item,function(key,value){

                            if( key == "resultList"){
                                var pageSize = value.length;
                                if(pageSize <41 ){
                                    document.getElementById("displayOrNot").style.display="none";
                                }else{
                                    document.getElementById("displayOrNot").style.removeProperty('display');
                                }
                                    startKey=value[pageSize-1].rowkey;
                                    for(var j = 0;pageSize<41?j<=pageSize-1:j<pageSize-1;j++ ){
                                        $("#getJSON").append(
                                            "<tr>" +"<td>"+ ++logNumber +"</td>"
                                            + "<td>"
                                            + value[j].dateTime+ " ["
                                            + value[j].level + "] "
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
                            "<tr>" +"<td>"+ ++logNumber +"</td>"
                            +"<td class=td-color>Server exception</td>"
                            + "</tr>")
                    }else{
                        $.each(item,function(key,value){
                            if( key == "resultList"){
                                var pageSize = value.length;
                                if(pageSize <41 ){
                                    document.getElementById("displayOrNot").style.display="none";
                                }else{
                                    document.getElementById("displayOrNot").style.removeProperty('display');
                                }
                                    startKey=value[pageSize-1].rowkey;
                                for(var j = 0;pageSize<41?j<=pageSize-1:j<pageSize-1;j++ ){
                                    $("#getJSON").append(
                                        "<tr>" +"<td>"+ ++logNumber +"</td>"
                                        + "<td>"
                                        + value[j].dateTime + " "
                                        + value[j].location + " " +"<br/>"
                                        + value[j].level + ": "
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
                            "<tr>" +"<td>"+ ++logNumber +"</td>"
                            +"<td class=td-color>Server exception</td>"
                            + "</tr>")
                    }else{
                        $.each(item,function(key,value){
                            if( key == "resultList"){
                                var pageSize = value.length;
                                if(pageSize <41 ){
                                    document.getElementById("displayOrNot").style.display="none";
                                }else{
                                    document.getElementById("displayOrNot").style.removeProperty('display');
                                }
                                    startKey=value[pageSize-1].rowkey;
                                for(var j = 0;pageSize<41?j<=pageSize-1:j<pageSize-1;j++ ){
                                    $("#getJSON").append(
                                        "<tr>" +"<td>"+ ++logNumber +"</td>"
                                        + "<td>"
                                        + value[j].dateTime+ " ["
                                        + value[j].thread+ "] "
                                        + value[j].level + " ["
                                        + value[j].location +  "] - "
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
                        "<tr>" + "<td>" + ++logNumber + "</td>"
                        + "<td class=td-color>Server exception</td>"
                        + "</tr>")
                } else {
                    $.each(item, function (key, value) {
                        if (key == "resultList") {
                            var pageSize = value.length;

                                startKey=value[pageSize-1].rowkey;
                            if(pageSize <41 ){
                                document.getElementById("displayOrNot").style.display="none";
                            }else{
                                document.getElementById("displayOrNot").style.removeProperty('display');
                            }
                            for(var j = 0;pageSize<41?j<=pageSize-1:j<pageSize-1;j++ ){
                                $("#getJSON").append(
                                    "<tr>" + "<td>" + ++logNumber + "</td>"
                                    + "<td>"
                                    + value[j].dateTime + " "
                                    + value[j].location + " "+"<br/>"
                                    + value[j].level + ": "
                                    + value[j].message  +"</td>"
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