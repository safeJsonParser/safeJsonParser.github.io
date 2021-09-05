/**
 * Created by Truong Giang at 2016/09/26.
 * email: truonggiang.bka2010@gmail.com
 *
 * Updated by Truong Giang at 2021/09/05
 */
$(document).ready(function(){
  const textArea = $("#jsonFormat");
  const parseArea = $("#jsonParser");
  const maxLevelDefault = 100;

  $("#seeResultButton").click(function () {
    // STEP 1
    // get json format text from textarea
    // parser this text to json object
    let textContent = $.trim(textArea.val());
    let obj = {};
    if(textContent != null){
      try{
        obj = $.parseJSON(textContent);
      }catch(err){
        parseArea.empty();
        parseArea.append('<p>...Error: '+ err.message +'</p>');//print json text into parse textarea
        return;
      }
    }

    // STEP 2
    // show json object into json parser area
    /**
     * Return html to print json object to display
     * @param {object} obj - The title of the book.
     * @param {number} maxLevel - The max Level of json object, this can be display to screen
     * @param {number} level - The current level of json object
     */
    let printObject = function( obj, maxLevel, level ) {
      if ( typeof level == "undefined" ) {
        level = 0;
      }
      if ( typeof maxLevel == "undefined" ) {
        maxLevel = maxLevelDefault;
      }

      if ( maxLevel != 0 && level > maxLevel ) {
        return '';
      }

      let str = '<ul>';

      for ( const key in obj ) {
        if ( typeof obj[key] != 'object') {
          str += '<li class="dropdown"><span class="property">'
            +　key
            + '</span>: ' + obj[key] + ' </li>';
        } else {
          if( obj[key] == null ){ // null object
            str += '<li class="dropdown"><span class="property">'
              +　key
              + '</span>: ' + obj[key] + ' </li>';
          }else{
            str += '<li class="dropdown"><span class="property cursor">'
              + key
              + '</span>: <span class="toggle">{<span class="ulExt">...</span>'
              + printObject( obj[key], maxLevel, level + 1 )
              + '<span class="toggle">}</span></li>';
          }
        }
      }

      str += '</ul>';
      return str;
    };

    parseArea.empty();
    parseArea.append(printObject(obj));

    // STEP 3
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
