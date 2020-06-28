(function() {
    const patternToGuess = []
    let level = 1
    let highestScore = 0
    let gameOver = false

    const values = ["green", "blue", "yellow", "red"]
    const successMessages = ["Well done!", "Awesome job!", "You're killing it!", "Nice! Keep it up", "Nice!", "Great work. Next One!"]
    const failMessages = ["Oops! Next time", "Auch. That went wrong.", "Good run. Better luck next time :)", "Ah well.. Good effort though"]

    // while(level<4) {
        
        level++
    // }
    
    function nextColorInPattern() {
        patternToGuess.push(values[Math.floor(Math.random()*values.length)])
        console.log(patternToGuess)
        $("#" + patternToGuess[patternToGuess.length-1]).hide(50).show(50)
        new Audio("sounds/" + patternToGuess[patternToGuess.length-1] + ".mp3").play()
    }

    $(document).on("click", nextColorInPattern)
})()

