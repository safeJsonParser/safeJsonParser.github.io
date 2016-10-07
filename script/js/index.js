/**
 * Created by TG on 6/29/16.
 */
$(document).ready(function(){
    var textArea = $("#jsonText");
    var parseArea = $("#jsonParse");

    $("button").click(function () {
        textContent = $.trim(textArea.val());
        obj = "";
        if(textContent!=null){
        	try{
        		obj = $.parseJSON(textContent);
        	}catch(err){
        		parseArea.empty();//clear parse textarea
        		parseArea.append('<p>...Error: '+ err.message +'</p>');//print json text into parse textarea
        		return;
        	}
        }
        
        console.log(obj);
        var printObject = function( obj, maxLevel, level ) {
            if ( typeof level == "undefined" ) {
                level = 0;
            }
            if ( typeof level == "undefined" ) {
                maxLevel = 0;
            }

            var str = '';

            // the first ul tag
            if ( level == 0 ) {
                str = '<ul>';
            }

            if ( maxLevel != 0 && level >= maxLevel ) {
                str += levelStr + '...</br>';
                return str;
            }

            for ( var p in obj ) {
                if ( typeof obj[p] != 'object') {
                    str += '<li class="dropdown"><span class="property">' +　p + '</span>: ' + obj[p] + ' </li>';
                } else {
                	if( obj[p] == null ){
                		str += '<li class="dropdown"><span class="property">' +　p + '</span>: ' + obj[p] + ' </li>';
                	}else{
                		str += '<li class="dropdown"><span class="property cursor">' +
                        p + '</span>: <span class="toggle">{<span class="ulExt">...</span><ul>' + printObject( obj[p], maxLevel, level + 1 ) + '</ul><span class="toggle">}</span></li>';
                	}
                }
            }

            // close the first ul tag
            if ( level == 0 ) {
                str += '</ul>';
            }
            return str;
        };

        parseArea.empty();//clear parse textarea
        parseArea.append(printObject(obj));//print json text into parse textarea

        // hide/show the content of ul tag by click
        // use toggle() function
        // add/remove css class toggleColor
        $('span.property').click(function() {
		   $(this).parent().find('ul').toggle();
		   $(this).parent().find('span.ulExt').toggle();
		   if($(this).parent().find('ul').is(':visible')){
		    	$(this).parent().find('span.toggle').removeClass('toggleColor');
		   }else{
		   		$(this).parent().find('span.toggle').addClass('toggleColor');
		   }
		});
    });
});