var tableName ="localhost_access_log";
var viewMoreCount = 0;
var pageSize;
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
            var mysql="<select id=\"search\" name=\"log_name\" style=\"width:150px;height:25px;background-color:#efefef;border:1px solid #555;padding:1px 5px\">" +
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
            var local="<select id=\"search\" name=\"log_name\" style=\"width:150px;height:25px;background-color:#efefef;border:1px solid #555;padding:1px 5px\">" +
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
            var hz="<select id=\"search\" name=\"log_name\" style=\"width:150px;height:25px;background-color:#efefef;border:1px solid #555;padding:1px 5px\">" +
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

            var cata="<select id=\"search\" name=\"log_name\" style=\"width:150px;height:25px;background-color:#efefef;border:1px solid #555;padding:1px 5px \">" +
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
            var acc="<input  id=\"search\" name=\"GETIP\"  type=\"text\" style=\"width:150px;height:25px;background-color:#efefef ;border:1px solid #555;padding:1px 5px\">";
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

        var logNumber = 0;
        var flag = true;
        loadData(url,flag,logNumber);
        viewMoreCount = 0;
}

function viewMore() {
    var filterWord = document.getElementById("search").value;
    var start_time = document.getElementById("start_time").value;
    var end_time = document.getElementById("end_time").value;
    viewMoreCount ++;
    var url="http://localhost/redirect/log/detail?"
        + "tableName="  + tableName
        + "&startTime=" + start_time
        //+ "&endTime="   + end_time
        + "&filterWord="+ filterWord
        + "&startKey=" + startKey;
    var flag=false;

    //var logTable = document.getElementById("getJSON");
    //var logNumber = logTable.rows.length;
    logNumber = 40*viewMoreCount;
    loadData(url,flag,logNumber)

}
function loadData(url,flag,logNumber){
        $.ajax({
            url:url,
            async:false,
            type:'get',
            dataType:'json',
            success:function(data){
                if(flag){
                    $("#getJSON").empty();
                    //logNumber=0;
                }
                onScroll();
                $.each(data,function(index,item){
                    if(index == "entity"){
                        if(item ==0){
                            //$("#getJSON").append(
                            //    "<tr>" +"<td>"+ ++logNumber +"</td>"
                            //    +"<td class=td-color>Server exception</td>"
                            //    + "</tr>")
                            document.getElementById("displayOrNot").style.display="none";
                        }else{
                            $.each(item,function(key,value){
                                if( key == "resultList"){
                                    pageSize = value.length;
                                    if(pageSize <41 ){
                                        document.getElementById("displayOrNot").style.display="none";

                                    }else{
                                        document.getElementById("displayOrNot").style.removeProperty('display');

                                    }
                                    startKey=value[pageSize-1].rowkey;

                                    for(var j = 0;pageSize<41?j<=pageSize-1:j<pageSize-1;j++ ){
                                        ++logNumber;
                                        var accessTable="<tr>" +"<td>"+ logNumber +"</td>"
                                            + "<td>"
                                            + value[j].remoteHostName + " "
                                            + value[j].logicalUsername+ " "
                                            + value[j].remoteUser+ " ["
                                            + value[j].dateTime + "]  \""
                                            + value[j].requestFirstLine + "\"  "
                                            + value[j].httpStatus + " "
                                            + value[j].bytesSent
                                            + "</td>"
                                            + "</tr>";
                                        var localhostTable="<tr>" +"<td>"+ logNumber +"</td>"
                                            + "<td>"
                                            + value[j].dateTime + " "
                                            + value[j].location + " " +"<br/>"
                                            + value[j].level + ": "
                                            + value[j].message
                                            + "</td>"
                                            + "</tr>";
                                        var hzcmsTable= "<tr>" +"<td>"+ logNumber +"</td>"
                                            + "<td>"
                                            + value[j].dateTime+ " ["
                                            + value[j].thread+ "] "
                                            + value[j].level + " ["
                                            + value[j].location +  "] - "
                                            + value[j].message
                                            + "</td>"
                                            + "</tr>";
                                        var mysqlTable="<tr>" +"<td>"+ logNumber +"</td>"
                                            + "<td>"
                                            + value[j].dateTime+ " ["
                                            + value[j].level + "] "
                                            + value[j].message+ " "
                                            + "</td>"
                                            + "</tr>";
                                        var catalinaTable= "<tr>" + "<td>" + logNumber + "</td>"
                                            + "<td>"
                                            + value[j].dateTime + " "
                                            + value[j].location + " "+"<br/>"
                                            + value[j].level + ": "
                                            + value[j].message  +"</td>"
                                            + "</tr>";
                                        switch (tableName) {
                                            case "mysqld":
                                                $("#getJSON").append(mysqlTable);
                                                break;
                                            case "localhost":
                                                $("#getJSON").append(localhostTable);
                                                break;
                                            case "hzcms":
                                                $("#getJSON").append(hzcmsTable);
                                                break;
                                            case "catalina" :
                                                $("#getJSON").append(catalinaTable);
                                                break;
                                            default:
                                                $("#getJSON").append(accessTable);
                                        }

                                    }
                                }
                            })
                        }

                    }

                });
            }
        })
}










