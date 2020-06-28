(function() {
    let patternToGuess = []
    let guessedPattern = []
    let level = 1
    let highestScore = 0
    let gameOver = false

    const values = ["green", "blue", "yellow", "red"]
    const successMessages = ["Well done!", "Awesome job!", "You're killing it!", "Nice! Keep it up", "Nice!", "Great work. Next One!"]
    const failMessages = ["Oops! Next time..", "Auch. That went wrong.", "Good run. Better luck next time :)", "Ah well.. Good effort though"]

    function startGame() {
        // while(level<4) {
            getNextPatternColor()
            // let timerInterval = setInterval(function() {
            //     let i = 5
            //     $("#message").text("Play in: "+ i)
            //     i= i-1
            //     if(i === 0){
            //         clearInterval(timerInterval)
            //     }
            // }, 1000)
            level++
        // }
    }  

    function getNextPatternColor() {
        patternToGuess.push(values[Math.floor(Math.random()*values.length)])
        console.log(patternToGuess)
        $("#" + patternToGuess[patternToGuess.length-1]).hide(50).show(50)
        new Audio("sounds/" + patternToGuess[patternToGuess.length-1] + ".mp3").play()
    }

    $(".color-button").click(function(){
        if(!gameOver) {
            let colorClicked = $(this).attr("data-value")
            new Audio("sounds/" + colorClicked + ".mp3").play()
            $("#"+colorClicked).animate({  textIndent: 0 }, {
                step: function() {
                  $(this).css('-webkit-transform','translateY(-.2rem)')
                  $(this).css('filter','brightness(50%)')
                },
                duration:'fast'
            },'swing').animate({  textIndent: 0 }, {
                step: function() {
                  $(this).css('-webkit-transform','translateY(.2rem)')
                  $(this).css('filter','brightness(100%)')
                },
                duration:'fast'
            },'swing')
    
            if(patternToGuess[guessedPattern.length] === colorClicked) {
                guessedPattern.push(colorClicked)
                console.log(guessedPattern)
                if(guessedPattern.length === patternToGuess.length) {
                    guessedPattern = []
                    $("#message").text(successMessages[Math.floor(Math.random()*successMessages.length)])
                    setTimeout(() => {
                        getNextPatternColor()
                    }, 1500);
                }        
            } else {
                gameOver = true
                new Audio("sounds/wrong.mp3").play()
                $("body").animate({  textIndent: 0 }, {
                    step: function() {
                      $(this).removeClass("bg-indigo-100")
                      $(this).addClass("bg-red-500")
                    },
                    duration:'fast'
                },'swing').animate({  textIndent: 0 }, {
                    step: function() {
                      $(this).removeClass("bg-red-500")
                      $(this).addClass("bg-indigo-100")
                    },
                    duration:'fast'
                },'swing')
                $("#message").text(failMessages[Math.floor(Math.random()*failMessages.length)])
            }
        }      
    })

    $("h1").on("click", startGame)
})()

