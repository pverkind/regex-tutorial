
/*XRegExp.addToken(
  /\\d/,
  () => "\\p{N}}",
  {scope: 'all'}
);
var n = XRegExp("\d");
console.log(XRegExp('\\d').test('abc十三๕٥'));
console.log('abc十三๕٥'.match(/\p{N}+/u));*/

var solutionInput = document.getElementById('solution_input');
function checkSolution(e) {
  var correctAnswer = true;
  var answer = solutionInput.value;
  var matchType = document.getElementById("exercise").getAttribute("type");
  // check whether the entire line should be matched or only part of it:
  // and convert the user's answer into a regular expressions object accordingly,
  // adding a capture group for:
  if (matchType === "partial_match"){
    //var answerRegex = new RegExp(answer, "g");
    var answerRegex = XRegExp(answer, "g");
  } else {
    //var answerRegex = new RegExp("^"+answer+"$");
    var answerRegex = XRegExp("^"+answer+"$");
  }
  var tbody = document.getElementById("samples").getElementsByTagName('tbody')[0];
  for (let row of tbody.rows){
    // check whether row should or should not match:
    if (row.cells[0].innerText.includes("Don't")){
      var matchOrNot = false;
    } else {
      var matchOrNot = true;
    }

    var text = row.cells[1].innerText;

    // get the (first) match of the user's answerRegex with the current row's text string
    var regexMatch = text.match(answerRegex);  // output: array of matches
    if (regexMatch){
      regexMatch = regexMatch[0];
    }
    // get the current row's desired match:
    var desiredMatch = row.cells[1].getAttribute("match");

    // check whether the match of the user's regex is the desired match
    // to decide whether her solution is correct for the current row:
    if (regexMatch === desiredMatch && matchOrNot === true){
      row.cells[2].innerHTML = '<span class="CORRECT">&#10004</span>'; // "TRUE";
      //row.cells[2].style = "color:ForestGreen;font-weight: bold;"
    } else if (regexMatch !== desiredMatch && matchOrNot === false){
      row.cells[2].innerHTML = '<span class="CORRECT">&#10004</span>'; // "TRUE";
      //row.cells[2].innerHTML = "&#10004"; // "TRUE";
      //row.cells[2].style = "color:ForestGreen;font-weight: bold;"
    } else {
      row.cells[2].innerHTML = '<span class="FALSE">&#10008</span>'; // "TRUE";
      //row.cells[2].innerHTML = "&#10060"; // "FALSE";
      //row.cells[2].innerHTML = "&#10008"; // "FALSE";
      //row.cells[2].style = "color:red;font-weight: bold;"
      // if one row is incorrect, the entire solution is wrong:
      correctAnswer = false;
    }

    // Highlight matched characters (odd and matches in different colors):
    //var replRegex = new RegExp(answer, "g");
    var replRegex = XRegExp(answer, "g");
    var match_no = 0;
    row.cells[1].innerHTML = text.replace(replRegex, function(match){
      match_no += 1;
      if (match_no % 2){  // odd-numbered matches
        return '<span class="matched_odd">' + match + '</span>';
      } else {            // even-numbered matches
        return '<span class="matched_even">' + match + '</span>';
      }
    });

    // activate the next lesson button if the solution was correct:
    if (correctAnswer === true){
      document.getElementById('next_button').disabled = false;
    } else {
      document.getElementById('next_button').disabled = true;
    }
  }
}
solutionInput.addEventListener("keyup", checkSolution);
function showHint(e){
  document.getElementById('hint').style.display = "block";
  document.getElementById('solution').style.display = "none";
  document.getElementById('solution_button').disabled = false;
  document.getElementById('solution_button').title = "get the solution";
  //document.getElementById('hintOrSolution').innerHTML = 'click <a onclick="showSolution()" href="javascript:void(0);">here</a> to see the solution'
}
function showSolution(e){
  document.getElementById('solution').style.display = "block";
  document.getElementById('hint').style.display = "none";
  //document.getElementById('hintOrSolution').innerHTML = 'click <a onclick="showHint()" href="javascript:void(0);">here</a> to see a hint'
  document.getElementById('solution_input').value = document.getElementById('solution_input').getAttribute("solution");
  checkSolution();
}
