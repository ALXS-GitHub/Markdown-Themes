// This file contains the javascript code for the TOC page.

var plan = document.getElementsByTagName("plan");

var planContent = "";
planContent += "<p class='plan-title'>Plan</p>";

var headings = document.querySelectorAll("h2, h3, h4");
for (var i = 0; i < headings.length; i++) {
    var heading = headings[i];
    var level = parseInt(heading.tagName.charAt(1));
    var title = heading.textContent;
    var id = heading.getAttribute("id");
    
    // create the plan item element
    var planItem = document.createElement("p");
    planItem.innerHTML = "<span>▶</span> <a href=\"#" + id + "\">" + title + "</a>";
    planItem.classList.add(`plan-item-${level}`);
    planContent += planItem.outerHTML;
  }

// display the plan
if (plan.length !== 0) {
    plan[0].innerHTML = planContent;
}
console.log(planContent);