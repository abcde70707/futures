var jsonUrl = "https://abcde70707.github.io/futures/期貨紀錄.json";
//印出全部資料
function loadjson() {
  var content;
  let countpoint = Number(0);
  let count = Number(0);
  $.getJSON(jsonUrl, function (data) {

    for (var i in data) {
      count++;
      countpoint += Number(data[i].point);
      var datamonth;
      if (Number(data[i].month) < 10) {
        datamonth = "0" + String(data[i].month);
      }
      else {
        datamonth = String(data[i].month);
      }
      var dataday;
      if (Number(data[i].day) < 10) {
        dataday = "0" + String(data[i].day);
      }
      else {
        dataday = String(data[i].day);
      }
      var dataweak;
      if (Number(data[i].weak) == 1) {
        dataweak = "一";
      }
      if (Number(data[i].weak) == 2) {
        dataweak = "二";
      }
      if (Number(data[i].weak) == 3) {
        dataweak = "三";
      }
      if (Number(data[i].weak) == 4) {
        dataweak = "四";
      }
      if (Number(data[i].weak) == 5) {
        dataweak = "五";
      }
      if (Number(data[i].point) > 0) {//點數大於0
        content +=
          "<tr>" +
          "<td>" + data[i].year + "/" + datamonth + " / " + dataday + " " + "(" + dataweak + ")" + "</td > " +
          "<td style='color:#FF0033;'>" + "+" + data[i].point + "</td>" +
          "<td>" + data[i].reason + "</td>" +
          "<td>" + "<input type='button' value='刪除'/>" + "</td>" +
          "</tr>";
      }
      else if (Number(data[i].point) < 0) {//點數小於0
        content +=
          "<tr>" +
          "<td>" + data[i].year + "/" + datamonth + " / " + dataday + " " + "(" + dataweak + ")" + "</td > " +
          "<td style='color:#00CC00;'>" + data[i].point + "</td>" +
          "<td>" + data[i].reason + "</td>" +
          "<td>" + "<input type='button' value='刪除'/>" + "</td>" +
          "</tr>";
      }
      else {//點數等於0
        content +=
          "<tr>" +
          "<td>" + data[i].year + "/" + datamonth + " / " + dataday + " " + "(" + dataweak + ")" + "</td > " +
          "<td style='color:white;'>" + data[i].point + "</td>" +
          "<td>" + data[i].reason + "</td>" +
          "<td>" + "<input type='button' value='刪除'/>" + "</td>" +
          "</tr>";
      }
    }
    document.getElementById("grandtotal").innerHTML = "累計: " + countpoint + "&nbsp;&nbsp;";
    document.getElementById("average").innerHTML = "平均: " + (countpoint / count).toFixed(2);
    $("tbody").empty();
    $("#display").append(content);
  });
}
//新增資料
function add() {
  var addyear = document.getElementById("year").value;
  var addmonth = document.getElementById("month").value;
  var addday = document.getElementById("day").value;
  var addweak = document.getElementById("weak").value;
  var addpoint = document.getElementById("point").value;
  var addreason = document.getElementById("reason").value;
  var adddata = {
    "year": addyear,
    "month": addmonth,
    "day": addday,
    "weak": addweak,
    "point": addpoint,
    "reason": addreason
  }
  $.getJSON('期貨紀錄.json', function (/*err, */data) {
    /*if (err) {
      return console.error(err);
    }*/
    var newdata = data.toString();
    newdata = JSON.parse(newdata);
    newdata.data.push(adddata);
    console.log(newdata.data);
    var str = JSON.stringify(newdata);
    /*fs.writeFile('期貨紀錄.json', str, function (err) {
      if (err) {
        console.error(err);
      }
      console.log('-----------新增成功-----------')
    })*/
  });
}
//清空資料輸入列
function clearadd() {
  document.getElementById("year").value = "";
  document.getElementById("month").value = "";
  document.getElementById("day").value = "";
  document.getElementById("weak").value = "";
  document.getElementById("point").value = "";
  document.getElementById("reason").value = "";
}
//清空日期查詢列
function clearsearch() {
  document.getElementById("years1").value = "";
  document.getElementById("months1").value = "";
  document.getElementById("days1").value = "";
  document.getElementById("years2").value = "";
  document.getElementById("months2").value = "";
  document.getElementById("days2").value = "";
}
//查詢日期期間
function search() {
  var fromyear = document.getElementById("years1").value;
  var frommonth = document.getElementById("months1").value;
  var fromday = document.getElementById("days1").value;
  var toyear = document.getElementById("years2").value;
  var tomonth = document.getElementById("months2").value;
  var today = document.getElementById("days2").value;
  $.getJSON(jsonUrl, function (data) {
    var content;
    var count = 0;
    var countpoint = 0;
    for (var i in data) {
      var datamonth;
      if (Number(data[i].month) < 10) {
        datamonth = "0" + String(data[i].month);
      }
      else {
        datamonth = String(data[i].month);
      }
      var dataday;
      if (Number(data[i].day) < 10) {
        dataday = "0" + String(data[i].day);
      }
      else {
        dataday = String(data[i].day);
      }
      var dataweak;
      if (Number(data[i].weak) == 1) {
        dataweak = "一";
      }
      if (Number(data[i].weak) == 2) {
        dataweak = "二";
      }
      if (Number(data[i].weak) == 3) {
        dataweak = "三";
      }
      if (Number(data[i].weak) == 4) {
        dataweak = "四";
      }
      if (Number(data[i].weak) == 5) {
        dataweak = "五";
      }

      var inrange = 0
      var now = Number(data[i].year) * 3000 + Number(data[i].month) * 100 + Number(data[i].day);
      var low = Number(fromyear) * 3000 + Number(frommonth) * 100 + Number(fromday);
      var high = Number(toyear) * 3000 + Number(tomonth) * 100 + Number(today);
      if (Number(now) >= Number(low) && Number(now) <= Number(high)) {
        count++;
        countpoint += Number(data[i].point);
        inrange = 1;
      }
      if (Number(inrange) == 1) {
        if (Number(data[i].point) > 0) {//點數大於0
          content +=
            "<tr>" +
            "<td>" + data[i].year + "/" + datamonth + " / " + dataday + " " + "(" + dataweak + ")" + "</td > " +
            "<td style='color:#FF0033;'>" + "+" + data[i].point + "</td>" +
            "<td>" + data[i].reason + "</td>" +
            "<td>" + "<input type='button' value='刪除'/>" + "</td>" +
            "</tr>";
        }
        else if (Number(data[i].point) < 0) {//點數小於0
          content +=
            "<tr>" +
            "<td>" + data[i].year + "/" + datamonth + " / " + dataday + " " + "(" + dataweak + ")" + "</td > " +
            "<td style='color:#00CC00;'>" + data[i].point + "</td>" +
            "<td>" + data[i].reason + "</td>" +
            "<td>" + "<input type='button' value='刪除'/>" + "</td>" +
            "</tr>";
        }
        else {//點數等於0
          content +=
            "<tr>" +
            "<td>" + data[i].year + "/" + datamonth + " / " + dataday + " " + "(" + dataweak + ")" + "</td > " +
            "<td>" + data[i].point + "</td>" +
            "<td>" + data[i].reason + "</td>" +
            "<td>" + "<input type='button' value='刪除'/>" + "</td>" +
            "</tr>";
        }
      }
    }
    if (count == 0)//沒有資料所以不顯示累計和平均
    {
      $("span").empty();
    }
    else {
      document.getElementById("grandtotal").innerHTML = "累計: " + countpoint + "&nbsp;&nbsp;";
      document.getElementById("average").innerHTML = "平均: " + (countpoint / count).toFixed(2);
    }
    $("tbody").empty();
    $("tbody").append(content);
  });
}
function start() {
  loadjson();
  var searchbutton = document.getElementById("searchbutton");
  searchbutton.addEventListener("click", search, false);
  var clearsearchbutton = document.getElementById("clearsearchbutton");
  clearsearchbutton.addEventListener("click", clearsearch, false);
  var addbutton = document.getElementById("addbutton");
  addbutton.addEventListener("click", add, false);
  var clearaddbutton = document.getElementById("clearbutton");
  clearaddbutton.addEventListener("click", clearadd, false);
  var printallbutton = document.getElementById("printallbutton");
  printallbutton.addEventListener("click", loadjson, false);
}
window.addEventListener("load", start, false);
