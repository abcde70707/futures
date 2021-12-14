function loadjson() {
  var cors = "https://joke-api-strict-cors.appspot.com/jokes/random";
  var output = "<tbody><tr>";
  var jsonurl = cors+"https://abcde70707.github.io/futures/期貨紀錄.json";
  var jsonurlobj = new XMLHttpRequest();
  jsonurlobj.open("get", jsonurl);
  jsonurlobj.send(null);
  jsonurlobj.onload = function () {
    if (jsonurlobj.status == 200) {
      var obj = JSON.parse(jsonurlobj.responseText);
      for (var i in obj) {
        output += "<td>" + obj[i].year + "/" + obj[i].month + "/" + obj[i].day + "<td>" + "<td>" + obj[i].point + "<td>" + "<td>" + obj[i].reason + "<td>";
      }
    }
  }
  output += "<tr><tbody>"
  document.getElementById("display").innerHTML = output;
}
function start() {
  loadjson();
}
window.addEventListener("load", start, false);
