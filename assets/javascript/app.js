class question {

    constructor(questionText, optionList, answer, img) {

        this.question = questionText;
        this.optionList = optionList;
        this.answer = answer;
        this.img = img;
        this.timeleft = 10;
        this.correct = false;

    }

    presentQuestion() {

        var question = $("<p id='questionText'>" + this.question + "</p>");

        var options = $("<ul id='optionList'>\
        <li>"+ this.optionList[0] + "</li>\
        <li>"+ this.optionList[1] + "</li>\
        <li>"+ this.optionList[2] + "</li>\
        <li>"+ this.optionList[3] + "</li>\
        </ul>");

        $("#triviaDiv").append(question, options);

    }

    judgeAnswer(guess) {

        this.correct = (this.answer === guess);

        console.log(this.correct);

        if (this.correct) {

            $("#optionList").empty();

            var correctAnswer = $("<h3>Great job! That is the correct answer.</h3><p>" + this.answer + "</p>");

            $("#triviaDiv").append(correctAnswer);

        } else {

            $("#optionList").empty();

            var wrongAnswer = $("<h3>That was wrong! This is the correct answer.</h3><p>" + this.answer + "</p>");

            $("#triviaDiv").append(wrongAnswer);

        }

        this.timeleft = -1;

    }

    timeOver() {

        $("#optionList").empty()

        var timeOver = $("<h3>What are you a sloth!?! This is the correct answer.</h3><p>" + this.answer + "</p>");

        $("#triviaDiv").append(timeOver);

    }

    decrement() {

        this.timeleft--;

    }

}

class game {

    constructor() {

        $("#start-btn").remove();

        this.correct = 0;
        this.wrong = 0;

        this.q1 = new question("When was the first episode of Doctor Who aired?", ["1923", "1963", "1940", "1950"], "1963");

        this.q2 = new question("Who was the Doctor's first companion in  the series starring David Tennant", ["Rose Tyler", "Martha Jones", "Clara Oswald", "Rory Williams"], "Rose Tyler");

        this.q3 = new question("Who is the Doctor's arch nemesis?", ["The Daleks", "The Cybermen", "The Silurian", "The Master"], "The Master");

        this.qList = [this.q1, this.q2, this.q3];

        this.i = 0;

        this.questions(0);

    }

    questions(index) {

        $("#triviaDiv").empty();

        var _self = this;

        var _qList = this.qList;

        var _q = _qList[index];

        _q.presentQuestion();

        $("#triviaDiv").prepend("<h2 id='timer'>Time Left: " + _q.timeleft + "</h2>");

        $("li").on("click", function () {
            _q.judgeAnswer($(this).text());

        });

        var timer = setInterval(function () {

            _q.decrement();

            $("#timer").text("Time Left: " + _q.timeleft);

            if (_q.timeleft < 1) {
                clearInterval(timer);
                if (_q.timeleft < 0) {
                    $("#timer").empty();
                } else {
                    $("#timer").text("Time's Up!");
                }

                if (_q.correct) {
                    _self.correctAnswer();
                } else {
                    _self.wrongAnswer();
                }
                
                if (_self.i < _qList.length-1) {
                    ++ _self.i;
                    console.log(_self.i);
                    _self.questions(_self.i);
                } else {
                    $("#triviaDiv").empty();
                    $("#triviaDiv").append("<h2>Game over!</h2>\
                    <ul><li>Correct: " + _self.correct+"</li>\
                    <li>Wrong: " + _self.wrong+"</li></ul>");
                    $("#correct").empty();
                    $("#wrong").empty();
                    $("#triviaDiv").append("<button id='start-btn' onclick='new game()'>Start Trivia Game</button>");
                }
            }
        }, 1000);

    }

    correctAnswer() {

        this.correct++;

        $("#correct").text("Correct: " + this.correct);

    }

    wrongAnswer() {

        this.wrong++;

        $("#wrong").text("Wrong: " + this.wrong);

    }

}