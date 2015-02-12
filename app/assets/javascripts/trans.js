$(document).ready(function() {
  //get_data format json
  var yml_data = null;
  var tree = $('#yml-list');
  $.get('/get_en').success(function(data) {
    yml_data = data;
    tree.html(createMenu(yml_data));
  });

  function createMenu(Jobject) {
    function makeInput(value) {
      var input_html = ''
      input_html += "<input type='text' name='value' value='"
      input_html += value
      
    }
    function makeTag(data, initTag) {
      if(!initTag){
        var html = "<ul>";
      }else {
        var html = "";
      }
      $.each(data, function(key,val){
        if(val == null) {
          val ="null"
        }
        if(val != null) {
          if(typeof val === "object"){
            html += "<li>";
            html += ""+key +":" + makeTag(val,false);
            html += "</li>";
          }else {
            html += "<li>";
            html += ""+key +": "+ "<input type='text' value='" + val + "'></input>";
            html += "</li>";
          }
        }
      });
      if(!initTag)
        html += "</ul>";
      return html;
    };
   
    var html = "";
    if (typeof Jobject === "object")
      html += makeTag(Jobject,true);
    else
      html += ""+Jobject;
    return html;
  }
});
