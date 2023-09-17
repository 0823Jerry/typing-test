import {db, app, getFirestore, collection, addDoc, query, where, getDocs, orderBy, limit, provider, getAuth, signInWithPopup, GoogleAuthProvider} from "./firebase.js";
async function addRecord(){
    await addDoc(collection(db, "records"), {
        name: name.value,
        time: time,
        createAt: Date.now(),
        email: auth.currentUser.email

    });
}

const auth = getAuth();
console.log(auth)

let signInButton = document.querySelector('.signIn')
signInButton.addEventListener('click', signIn)
function signIn(){
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
})
}


let words = "Before you can begin to determine what the composition of a particular paragraph will be,"
let inputArea = document.querySelector('.inputArea')
let timeArea = document.querySelector('.timerBox')
let name = document.querySelector('.name')
let errorArea = document.querySelector('.errorBox')
let resetButton = document.querySelector('.reset')
let leaderboard = document.querySelector('.leaderboard')
let bestScore = document.querySelector('.bestScore')
let mistake = 0
let startTime = 0
let time = 0
let currentWord = 0
let wordSpans;
let started = false;
let finish = false;
let timeInterval;
resetButton.addEventListener('click', reset)
function reset(){
    inputArea.innerHTML = ''
    clearInterval(timeInterval)
    timeArea.textContent = `0s`
    errorArea.textContent = `0`
    mistake = 0
    startTime = 0
    time = 0
    currentWord = 0
    wordSpans;
    started = false;
    finish = false;
    generateWords()
}
function generateWords(){
    words.split('').forEach(
        word => {
            let wordSpan = document.createElement('span')
            wordSpan.textContent = word
            inputArea.appendChild(wordSpan)
        }
    )
    wordSpans = inputArea.getElementsByTagName('span')
    wordSpans[0].classList.add('currentWord')
}

async function leaderBoard(){
    const q = query(collection(db, "records"), orderBy("time", "asc"), limit(10));

    const querySnapshot = await getDocs(q);
    let i = 1
    querySnapshot.forEach((doc) => {
      let wordSpan = document.createElement('div')
      wordSpan.classList.add('topPlayers')
      wordSpan.textContent = i + ". " + doc.data().name + " " + doc.data().time
      leaderboard.appendChild(wordSpan)
      i++
    });
}

async function bestRecord(){
    console.log(auth)
    console.log(auth.currentUser)
    const q = query(collection(db, "records"), orderBy("time", "asc"), limit(1), where('email', '==', auth.currentUser.email));

    const querySnapshot = await getDocs(q);
    let i = 1
    querySnapshot.forEach((doc) => {
      let wordSpan = document.createElement('div')
      wordSpan.classList.add('topPlayers')
      wordSpan.textContent = doc.data().name + " " + doc.data().time
      bestScore.appendChild(wordSpan)
      i++
    });
}

timeArea.textContent = `0s`

function handleKeyDown(event){
    if (event.key == 'Shift' || finish == true) {
        return
    }
    if(started == false){
        startTime = Date.now()
        timeInterval = setInterval(function(){
            time = (Date.now() - startTime) / 1000
            timeArea.textContent = `${time}s`
        }, 100) 
        started = true
    }
    if (event.key == 'Backspace') {
        wordSpans[currentWord].classList.remove('currentWord')
        currentWord -= 1
        if (wordSpans[currentWord].classList.contains('correct')) {
            wordSpans[currentWord].classList.remove('correct')
            wordSpans[currentWord].classList.add('currentWord')
        }
        else{
            wordSpans[currentWord].classList.remove('incorrect')
            wordSpans[currentWord].classList.add('currentWord')
            mistake -= 1
            errorArea.textContent = `${mistake}`
        }
        return
    }

    if (event.key == wordSpans[currentWord].textContent) {
        wordSpans[currentWord].classList.add('correct')
    }
    else {
        wordSpans[currentWord].classList.add('incorrect')
        mistake += 1
        errorArea.textContent = `${mistake}`
    }
    wordSpans[currentWord].classList.remove('currentWord')
    if (currentWord == wordSpans.length - 1) {
        finish = true
        clearInterval(timeInterval)
        addRecord()
        return
    }
    currentWord += 1
    wordSpans[currentWord].classList.add('currentWord')
}
inputArea.addEventListener('keydown', handleKeyDown)
errorArea.textContent = `${mistake}`
generateWords()
leaderBoard()

function getBestRecord(){
    setTimeout(function(){
        if(auth.currentUser){
            bestRecord()
        }else{
            getBestRecord()
        }
    }, 1000)
}
getBestRecord()