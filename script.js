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
  shuffle(arr).forEach((e) => {
    let div = document.createElement("div");
    div.classList.add("card");
    div.innerText = e;
    div.classList.add("hide");
    div.addEventListener("mousedown", onClick, { once: true });
    div.addEventListener("contextmenu", onRightClick);

    document.querySelector(".container").append(div);
  });
}
let winCounter = 0;
let bomCounter = 0;
let flagConter = 0;
function onClick(e) {
  if (e.which == 1) {
    e.target.classList.remove("hide");
    if (e.target.innerText == "bom") {
      alert("game over");
      location.reload();
    } else if (e.target.innerText == "blank") {
      winCounter++;
      if (winCounter == 5) {
        alert("you win");
      }
    }
  }
}
let temp = [];
function onRightClick(e) {
  if (flagConter < 4) {
    if (e.which == 3) {
      e.preventDefault();
      temp.push(e.target.innerText);
      if (e.target.innerText == "Flag") {
        e.target.innerText = temp[0];
        e.target.classList.add("hide");
        temp = [];
        flagConter--;
      } else {
        if (e.target.innerText == "bom") {
          bomCounter++;
          if (bomCounter == 4) {
            alert("ALl boms are flagged");
            temp = [];
            location.reload();
          }
        }
        e.target.innerText = "Flag";
        e.target.classList.remove("hide");
        flagConter++;
      }

      console.log(e.target.innerText);
    }
  } else {
    alert("You have crossed Flag limit");
    flagConter - 1;
  }
}
createGrid();
