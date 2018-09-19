let missed = 0; // to count your heart
const arrPhrases = [

  'The club is not the best place to find a lover',
  'So the bar is where I go',
  'Slip inside of your mind',
  'So I will start a revolution from my bed',
  'Do not look back in anger',
  'You and I are gonna live forever',
  'I am free to be whatever I',
  'Cause maybe you are gonna be the one that saves me',
  'Speaking words of wisdom let it be',
  'Take a sad song and make it better',

];

const overlay = document.getElementById('overlay');
const phraseDiv = document.getElementById('phrase');
const qwerty = document.getElementById('qwerty');
const resetBtn = document.querySelector('.btn__reset');
const ul = document.querySelector('#phrase ul');
const letters = document.getElementsByClassName('letter');
const show = document.getElementsByClassName('show');
const title = document.querySelector('.title');

//function to reset
const init = () =>{
  window.location.reload(true);
};

//function to get random phrase from arrPhrases
const getRandomAsArray = (arr) => {
  const index = Math.floor(Math.random()*Math.floor(10));
  return arr[index].toLowerCase().split('');

};

// function to display a phrase passed from getRandomAsArray
const addPhraseToDisplay = (arr) => {

  arr.map((val)=>{
    //const div = document.createElement('div');
    const li = document.createElement('li');
    //ul.appendChild(div);
    //div.appendChild(li);
    ul.appendChild(li);
    //div.style.display = 'inline-block';
    li.textContent = val;
    if(val !== " "){
      //div.classList.add("card");
      li.classList.add("letter");
    }else{
      li.classList.add("space");
    }
  });

};

// function to open letters in randomPhrase by adding 'show' class
const checkLetter = (val) => {

  let hit = null;
  Object.keys(letters).forEach((key)=>{

    const letter = letters[key].textContent;
    if (letter === val) {
      letters[key].classList.add("show");
      hit = val;
    }

  });
  return hit;
};

// function to remove your heart everytime you get it right
const losingHeart = () => {
  const img = document.querySelector('.tries');
  img.remove();
  missed +=1;
};

// logic function to check whether it meets win/lose condition
const checkWin = () => {
  if (missed >= 5) {
    overlay.style.display = "flex";
    overlay.classList.add("lose");
    title.textContent = 'You lost...';
    resetBtn.textContent = 'Reset Game';
  }else if (show.length === letters.length) {
    overlay.style.display = 'flex';
    overlay.classList.add("win");
    title.textContent = 'You won!';
    resetBtn.textContent = 'Reset Game';
  }
};


// EventListener for reset button
resetBtn.addEventListener("click",() => {
  if (resetBtn.textContent === 'Reset Game') {
    init();
  }
  overlay.style.display = 'none';
  const randomPhrase = getRandomAsArray(arrPhrases);
  addPhraseToDisplay(randomPhrase);

});


// EventListener for keyboard
qwerty.addEventListener("click", (e)=>{
  if (e.target.tagName === "BUTTON") {

    const pressed = e.target;
    pressed.classList.add("chosen");
    pressed.setAttribute("disabled", "disabled");
    const letterFound = checkLetter(pressed.textContent);

    if (letterFound === null) {
      losingHeart();
    }

    checkWin();

  }
});
