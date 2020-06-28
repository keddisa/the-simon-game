(function() {
    const patternToGuess = []
    let level = 1
    let highestScore = 0
    let gameOver = false

    const values = ["green", "blue", "yellow", "red"]
    const successMessages = ["Well done!", "Awesome job!", "You're killing it!", "Nice! Keep it up", "Nice!", "Great work. Next One!"]
    const failMessages = ["Oops! Next time..", "Auch. That went wrong.", "Good run. Better luck next time :)", "Ah well.. Good effort though"]

    // while(level<4) {
        
        level++
    // }

    function nextColorInPattern() {
        patternToGuess.push(values[Math.floor(Math.random()*values.length)])
        console.log(patternToGuess)
        $("#" + patternToGuess[patternToGuess.length-1]).hide(50).show(50)
        new Audio("sounds/" + patternToGuess[patternToGuess.length-1] + ".mp3").play()
    }

    $(".color-button").click(function(){
        let colorClicked = $(this).attr("data-value")
        new Audio("sounds/" + colorClicked + ".mp3").play()
        $("#"+colorClicked).animate({  textIndent: 0 }, {
            step: function() {
              $(this).css('-webkit-transform','translateY(-.2rem)')
              $(this).css('filter','brightness(50%)')
            },
            duration:'1'
        },'swing').animate({  textIndent: 0 }, {
            step: function() {
              $(this).css('-webkit-transform','translateY(.2rem)')
              $(this).css('filter','brightness(100%)')
            },
            duration:'1'
        },'swing')
    })

    $("h1").on("click", nextColorInPattern)
})()

