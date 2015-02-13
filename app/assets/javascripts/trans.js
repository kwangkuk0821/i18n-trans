$(document).ready(function() {
  //get_data format json
  var yml_data_before = null;
  var yml_data_after = null;
  var tree = $('#yml-list');
  var locale = null;
  
  function getJsonData() { 
    locale = $('#locale option:selected').text();
    $.post('/get_yml',{
        locale: locale,
      }).success(function(data) {
      yml_data_before = data;
      tree.html(createMenu(yml_data_before));
    });
  };

  function changeJsonData(obj, key, val) {
    for(i in obj) {
      if (!obj.hasOwnProperty(i)) continue;
      if (typeof(obj[i]) == 'object') {
         changeJsonData(obj[i],key,val);
      } else if (i == key) {
        obj[i] = val;
      }
    }
    return obj;
  }
  function createMenu(Jobject) {
    function makeForm(value) {
      var html = ''
      html +="<div class='translation'>"
      html +=  "<textarea name='value'>"
      html +=  value
      html +=  "</textarea>"
      html +=  "<input class='save' type='submit' value='제출'></input>"
      html +="</div>"

      return html
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
            html += "<li><h4>";
            html += key;
            html += "</h4></li>";
            html += makeTag(val,false);
          }else {
            html += "<li><h4>";
            html += key
            html += "</h4></li>";
            html += makeForm(val);
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

  window.onload = function() {
    $('#yml-list').on('click', '.save', function() {
      var key = $(this).parent().prev().text();
      var value = $(this).parent().find('textarea').val();
      yml_data_after = changeJsonData(yml_data_before, key, value);

      $.post('/save_yml', {
        locale: locale,
        data: yml_data_after,
      }).done(function() {
        getJsonData();
        alert("성공");
      });
    });
  }
  getJsonData();
});
