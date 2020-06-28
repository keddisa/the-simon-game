(function() {
    let patternToGuess = []
    let guessedPattern = []
    let level = 1
    let highestScore = 0
    let gameOver = false
    let timerInterval

    const values = ["green", "blue", "yellow", "red"]
    const successMessages = ["Well done!", "Awesome job!", "You're killing it!", "Nice! Keep it up", "Nice!", "Great work. Next One!"]
    const failMessages = ["Oops! Next time..", "Auch!!", "Good run. Better luck next time :)", "Ah well.. Good effort though"]

    $("#buttons").hide()
    $("#end").hide()

    function startGame() {
        getNextPatternColor()
        startTimer()
    }  

    function startTimer () {
        let i = 3
        timerInterval = setInterval(function() {      
            $("#message").text("Play in: "+ i)
            console.log('interval')
            if(i === 0){
                clearInterval(timerInterval)
                animateGameOver()
            }
            i--
        }, 1000)
    }

    function getNextPatternColor() {
        patternToGuess.push(values[Math.floor(Math.random()*values.length)])
        console.log(patternToGuess)
        $("#" + patternToGuess[patternToGuess.length-1]).hide(50).show(50)
        new Audio("sounds/" + patternToGuess[patternToGuess.length-1] + ".mp3").play()
    }

    $(".color-button").click(function(){
        if(!gameOver) {
            clearInterval(timerInterval)
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
                    level++
                    $("#level-number").text(level)
                    guessedPattern = []
                    $("#message").text(successMessages[Math.floor(Math.random()*successMessages.length)])
                    setTimeout(() => {
                        getNextPatternColor()
                        startTimer()
                    }, 1500);
                }        
            } else {
                animateGameOver()              
            }
        }      
    })

    function animateGameOver() {
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
        highestScore = level
        $("#main-title").html("<strong>Game Over</strong>")
        $("#message").text(failMessages[Math.floor(Math.random()*failMessages.length)])
        $("#buttons").hide()
        $("#end").show()
        $("#score").text(level)
        $("#highest-score").text(highestScore)
        level = 1
    }

    $("#start").on("click", function(){
        $("#welcome").hide()
        $("#buttons").show()
        $("#main-title").html('<strong>Current Level: <span id="level-number">1</span></strong>')
        setTimeout(() => {
            startGame()
        }, 2000);
        
    })

    $("#re-play").on("click", function(){
        $("#end").hide()
        $("#buttons").show()
        $("#main-title").html('<strong>Current Level: <span id="level-number">1</span></strong>')
        $("#message").text("Let's go")
        setTimeout(() => {
            startGame()
        }, 2000);
        
    })
})()

