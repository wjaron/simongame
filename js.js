document.addEventListener("DOMContentLoaded", function (event) {

    var startbutton = document.getElementById('startbutton');
    var melody = [];
    var counter = 20;
    var score = 0;
    var currentScore = 0;
    var sound1 = document.getElementById('sound1');
    var sound2 = document.getElementById('sound2');
    var sound3 = document.getElementById('sound3');
    var sound4 = document.getElementById('sound4');
    var playbox = document.getElementById('playbox');
    var playbutton1 = document.getElementById('button1');
    var playbutton2 = document.getElementById('button2');
    var playbutton3 = document.getElementById('button3');
    var playbutton4 = document.getElementById('button4');
    var gameStatus = false;
    var label = document.getElementById('label');
    label.innerHTML = ' ';
    var timeoutID1;
    var timeoutID2;
    var restart = document.getElementById('restart');
    var strictMode = false;
    var strictbutton = document.getElementById('strictbutton');
    var checkLightStart = document.getElementById('checkLightStart');
    var checkLightStrict = document.getElementById('checkLightStrict');

    function playXTime(howMuch) {
        var j = 0;
        limit = howMuch;
        var currentSound;
        var color;
        setTimeout(function () {
            label.innerHTML = score + 1;
        }, 1000);

        function playSound() {

            currentSound = melody[j];
            color = melody[j];
            if (color === 1) playbutton1.setAttribute('style', 'background-color:lightgreen');
            if (color === 2) playbutton2.setAttribute('style', 'background-color:pink');
            if (color === 3) playbutton3.setAttribute('style', 'background-color:white');
            if (color === 4) playbutton4.setAttribute('style', 'background-color:lightblue');
            if (currentSound === 1) {
                currentSound = sound1;
            }
            if (currentSound === 2) {
                currentSound = sound2;
            }
            if (currentSound === 3) {
                currentSound = sound3;
            }
            if (currentSound === 4) {
                currentSound = sound4;
            }
            currentSound.play();
            currentSound.addEventListener("ended", changeBckg, false);
        }

        function changeBckg() {

            if (color === 1) playbutton1.setAttribute('style', 'background-color:green');
            if (color === 2) playbutton2.setAttribute('style', 'background-color:red');
            if (color === 3) playbutton3.setAttribute('style', 'background-color:yellow');
            if (color === 4) playbutton4.setAttribute('style', 'background-color:blue');
        }

        setTimeout(function showSound() {
            if (j < limit) {
                playSound();
                j++;
                setTimeout(showSound, 1000);
            }
        }, 1000);
    }


    startbutton.addEventListener("click", function () {

        if (gameStatus === false) {
            melody = [];
            for (var i = 0; i < counter; i++) {
                var sound = Math.floor((Math.random() * 4) + 1);
                melody.push(sound);
            }
            console.log(melody);
            playXTime(score + 1);
            gameStatus = true;
            checkLightStart.style.backgroundColor = 'lime';

        }
    }, false);


    function checkSound(a, b) {

        var clickedbutton = a;
        var correctSound = melody[b];
        if (clickedbutton === "button1" && correctSound === 1) return true;
        if (clickedbutton === "button2" && correctSound === 2) return true;
        if (clickedbutton === "button3" && correctSound === 3) return true;
        if (clickedbutton === "button4" && correctSound === 4) return true;
        return false;
    }

    var check;
    playbox.addEventListener("click", function (a) {
        var button = a.target.id;

        if (button === "button1") {
            playbutton1.setAttribute('style', 'background-color:lightgreen');
            currentSound = sound1;
        }
        if (button === "button2") {
            playbutton2.setAttribute('style', 'background-color:pink');
            currentSound = sound2;
        }
        if (button === "button3") {
            playbutton3.setAttribute('style', 'background-color:white');
            currentSound = sound3;
        }
        if (button === "button4") {
            playbutton4.setAttribute('style', 'background-color:lightblue');
            currentSound = sound4;
        }
        if (button !== "playbox" && button !== "label") {
            currentSound.play();
            currentSound.addEventListener("ended", function () {
                if (button === "button1") playbutton1.setAttribute('style', 'background-color:green');
                if (button === "button2") playbutton2.setAttribute('style', 'background-color:red');
                if (button === "button3") playbutton3.setAttribute('style', 'background-color:yellow');
                if (button === "button4") playbutton4.setAttribute('style', 'background-color:blue');
            }, false);
        }

        if (gameStatus === true && button !== "playbox" && button !== "label") {
            check = checkSound(button, currentScore);
            if (check === true) {
                currentScore++;
                label.innerHTML = 'Good';
                timeoutID1 = setTimeout(function () {
                    label.innerHTML = currentScore + "/" + (score + 1);
                }, 1000);
            } else {
                label.innerHTML = 'Wrong';
                currentScore = 0;
                if (strictMode === false) {
                    setTimeout(function () {
                        setTimeout(playXTime(score + 1), 1000);
                    }, 1000);
                } else {
                    setTimeout(function () {
                        setTimeout(restartGame(), 1000);
                    }, 1000);
                }
            }
            check = false;
            if (currentScore === score + 1) {

                label.innerHTML = currentScore + " / " + (score + 1);
                timeoutID2 = setTimeout(function () {
                    label.innerHTML = '+1';
                }, 1000);

                score++;
                currentScore = 0;
                if (score < counter) {
                    setTimeout(function () {
                        setTimeout(playXTime(score + 1), 1000);
                    }, 1000);
                }
            }
            if (score === counter) {
                label.innerHTML = 'You Win!';
                clearTimeout(timeoutID1);
                clearTimeout(timeoutID2);
                checkLightStart.style.backgroundColor = 'gray';
                gameStatus = false;
                score = 0;
            }
        }
    }, false);

    function restartAll() {
        melody = [];
        currentScore = 0;
        score = 0;
        gameStatus = false;
        label.innerHTML = ' ';
        strictMode = false;
        checkLightStart.style.backgroundColor = 'gray';
        checkLightStrict.style.backgroundColor = 'gray';
    }

    restart.addEventListener("click", function () {

        restartAll();
    }, false);

    strictbutton.addEventListener("click", function () {
        if (strictMode === false) {
            strictMode = true;
            checkLightStrict.style.backgroundColor = 'red';
        } else {
            strictMode = false;
            checkLightStrict.style.backgroundColor = 'gray';
        }
    }, false);

});