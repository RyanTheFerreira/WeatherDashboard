var now = dayjs();
var currentDate = (now.format("MM/DD/YYYY"));
var city ="";
var citySearch = $("#citySearch");
var citySearchButton = $("#citySearchBtn");


function deleteItems(){
    localStorage.clear();
}