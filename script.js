
let words = "Before you can begin to determine what the composition of a particular paragraph will be,"
let inputArea = document.querySelector('.inputArea')
let timeArea = document.querySelector('.timerBox')
let errorArea = document.querySelector('.errorBox')
let mistake = 0
let startTime = 0
let currentWord = 0
let wordSpans;
let started = false;
let timeInterval;

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
timeArea.textContent = `0s`


document.addEventListener('keydown', event => {
    if (event.key == 'Shift') {
        return
    }
    if(started == false){
        startTime = Date.now()
        timeInterval = setInterval(function(){
            timeArea.textContent = `${(Date.now() - startTime) / 1000}s`
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
    currentWord += 1
    if (currentWord == wordSpans.length) {
        clearInterval(timeInterval)
    }
    
    wordSpans[currentWord].classList.add('currentWord')
})
errorArea.textContent = `${mistake}`
generateWords()