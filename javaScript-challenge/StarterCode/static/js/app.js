// from data.js
var tableData = data;



var date = [];
var city = [];
var state = [];
var country = [];
var shape = [];
var duration = [];
var comments = [];

var tbody = d3.select("tbody");

data.forEach(function(data) {
  console.log(data);
  var row = tbody.append("tr");

    Object.entries(data).forEach(function([key, value]) {
    console.log(key, value);
    var cell = row.append("td");
    cell.text(value);
  });
});

function searchfunction() {
  // Declare variables
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('datetime');
  filter = input.value.toUpperCase();
  ul = document.getElementById("myUL");
  li = ul.getElementsByTagName('li');

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("ul")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

var filterButton = d3.select(".btn");

filterButton.on("click", searchfunction)