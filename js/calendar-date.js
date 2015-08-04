$('.input_cxcalendar').each(function(){
        var a = new Calendar({
            targetCls: $(this),
            type: 'yyyy-mm-dd HH:MM:SS',
            wday:0
        },function(val){
            console.log(val);
        });
    });



