
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
  answer = answer.replace("\\n", "\\\\n");
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
  console.log(answerRegex);
  var tbody = document.getElementById("samples").getElementsByTagName('tbody')[0];
  for (let row of tbody.rows){
    // check whether row should or should not match:
    if (row.cells[0].innerText.includes("Don't")){
      var matchOrNot = false;
    } else {
      var matchOrNot = true;
    }

    //var text = row.cells[1].innerText;  // this creates trouble with the whitespace
    var text = row.cells[1].innerHTML;
    // remove the highlighting spans:
    var text = text.replace(/<\/?span[^>]*>/g, "");
    // temporarily remove the <pre> tags and make sure tabs are represented as tabs:
    var prefix = false;
    if (text.includes("<pre>")){
        prefix = true;
        text = text.replace(/<\/?pre>/g, "");
        //text = text.replace(/  +/g, "	");  // tabs
    }
    text = text.replace("<br>", "\n");
    console.log(text);

    // get the (first) match of the user's answerRegex with the current row's text string
    var regexMatch = text.match(answerRegex);  // output: array of matches
    if (regexMatch){
      regexMatch = regexMatch[0];
    }
    console.log(regexMatch);
    // get the current row's desired match:
    var desiredMatch = row.cells[1].getAttribute("match");
    // fix newline and tab characters present in the match attribute string:
    desiredMatch = desiredMatch.replace(/\\n/g, "\n");
    desiredMatch = desiredMatch.replace(/\\t/g, "\t");

    let entirely = " (entirely)";
    if (matchType === "partial_match"){
      entirely = "";
    }
    // check whether the match of the user's regex is the desired match
    // to decide whether her solution is correct for the current row:
    if (regexMatch === desiredMatch && matchOrNot === true){
      let msg = `Correct: your pattern matches this string${entirely}`;
      row.cells[2].innerHTML = `<span class="CORRECT" title="${msg}">&#10004</span>`; // "TRUE";
    } else if (regexMatch !== desiredMatch && matchOrNot === false){
      let msg = `Correct: your pattern does not${entirely} match this string, as expected`;
      row.cells[2].innerHTML = `<span class="CORRECT" title="${msg}">&#10004</span>`; // "TRUE";
    } else if (regexMatch === desiredMatch && matchOrNot === false){
      let msg = `Wrong: your pattern matches this string${entirely} but it should not match it`;
      row.cells[2].innerHTML = `<span class="FALSE" title="${msg}">&#10008</span>`; // "FALSE";
    } else if (regexMatch !== desiredMatch && matchOrNot === true){
      let msg = `Wrong: your pattern does not match this string but it should match it${entirely}`;
      row.cells[2].innerHTML = `<span class="FALSE" title="${msg}">&#10008</span>`; // "FALSE";
    }

    // Highlight matched characters (odd and matches in different colors):
    //var replRegex = new RegExp(answer, "g");
    var replRegex = XRegExp(answer, "g");
    var match_no = 0;
    var highlighted = text.replace(replRegex, function(match){
      match_no += 1;
      if (match_no % 2){  // odd-numbered matches
        return '<span class="matched_odd">' + match + '</span>';
      } else {            // even-numbered matches
        return '<span class="matched_even">' + match + '</span>';
      }
    });

    // restore the <pre> and <br> tags:
    if (prefix) {
      highlighted = "<pre>"+highlighted+"</pre>";
    }
    highlighted = highlighted.replace("\n", "<br>");

    // put the highlighted text back into the html:
    row.cells[1].innerHTML = highlighted;

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
