$(function() {

  // Qiitaからrailsタグの記事を取得するAPIを実行
  function getCarInfo(){
    var weatherURL = 'http://weather.livedoor.com/forecast/webservice/json/v1?city=130010'
    return $.ajax({
      type : 'GET',
      url : 'https://json2jsonp.com/?url='+encodeURIComponent(weatherURL),
      dataType : 'jsonp',
      jsonp : 'callback',
    });
  }

  getCarInfo().done(function(result) {
    console.log(result);
    var json_forecasts = result.forecasts;
    console.log(json_forecasts);

    // var ulBrandList = $("#ul_brand_list")
    // json_brand.forEach(function(val){
    //   console.log(val.forecasts);
    //   ulBrandList.append('<li class="mdl-list__item">' + val.name + '</li>');
    // })


  }).fail(function(result) {
    console.log('JSON取得に失敗');
  });

});
