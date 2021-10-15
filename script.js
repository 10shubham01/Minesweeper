let arr = [
  "blank",
  "bom",
  "bom",
  "bom",
  "blank",
  "blank",
  "bom",
  "blank",
  "blank",
];
function shuffle(array) {
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}
function createGrid() {
  shuffle(arr).forEach((e, i) => {
    let div = document.createElement("div");
    div.classList.add("card");
    div.innerText = e;
    div.classList.add("hide");
    setTimeout(() => {
      div.classList.add("animate");
    }, i * 300);
    div.addEventListener("mousedown", onClick);
    div.addEventListener("contextmenu", onRightClick);
    document.querySelector(".container").append(div);
  });
}

let bomCounter = 0;
let flagCounter = 0;

function onClick(e) {
  if (e.which == 1) {
    e.target.classList.remove("hide");
    if (e.target.innerText == "bom") {
      popUp(" Bom : Game Over");
      setTimeout(() => {
        location.reload();
      }, 2000);
    }
  } else {
    return;
  }
}
let temp = [];
function onRightClick(e) {
  if (flagCounter < 4) {
    if (e.which == 3) {
      e.preventDefault();
      temp.push(e.target.innerText);
      if (e.target.innerText == "Flag") {
        e.target.innerText = temp[0];
        e.target.classList.add("hide");
        temp = [];
        flagCounter--;
      } else {
        if (e.target.innerText == "bom") {
          bomCounter++;
          if (bomCounter == 4) {
            popUp("ALl boms are flagged you win !");
            temp = [];
            setTimeout(() => {
              location.reload();
            }, 1000);
          }
        }
        e.target.innerText = "Flag";
        e.target.classList.remove("hide");
        flagCounter++;
      }
    }
  } else {
    alert("You have crossed Flag limit ");
    flagCounter = flagCounter - 1;
  }
}
function popUp(message) {
  return (document.querySelector("body").innerHTML =
    "<h1>" + message + "<h1/>");
}
createGrid();
