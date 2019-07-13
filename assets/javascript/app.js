class question {

    constructor(questionText, optionList, answer, img) {

        this.question = questionText;
        this.optionList = optionList;
        this.answer = answer;
        this.img = img;
        this.timeleft = 10;

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

    judgeAnswer() {

        if (this.correct) {

            $("#optionList").empty();

            var correctAnswer = $("<h3>Great job! That is the correct answer.</h3><p>" + this.answer + "</p>");

            $("#triviaDiv").append(correctAnswer);

            this.correct = true;

        } else {

            $("#optionList").empty();

            var wrongAnswer = $("<h3>You're so dumb! This is the correct answer.</h3><p>" + this.answer + "</p>");

            $("#triviaDiv").append(wrongAnswer);

            this.correct = false;

        }

    }

    timeOver() {

        $("#optionList").empty()

        var timeOver = $("<h3>What are you a sloth!?! This is the correct answer.</h3><p>" + this.answer + "</p>");

        $("#triviaDiv").append(timeOver);

    }

    decrement() {

        this.timeleft --;

    }

}

class game {

    constructor() {

        this.correct = 0;
        this.wrong = 0;

        this.q1 = new question("When was the first episode of Doctor Who aired?", ["1923", "1963", "1940", "1950"], "1963");

        this.q2 = new question("Who was the Doctor's first companion in  the series starring David Tennant", ["Rose Tylor", "Martha Jones", "Clara Oswald", "Rory Williams"], "Rose Tyler");

        this.q3 = new question("Who is the Doctor's arch nemesis?", ["The Daleks", "The Cybermen", "The Silurian", "The Master"], "The Master");

        this.qList = [this.q1, this.q2, this.q3];

        this.questions()

    }

    questions() {

        var _self = this;

        var _qList = this.qList;

        _qList[0].presentQuestion();

        $("#triviaDiv").prepend("<h2 id='timer'>Time Left: "+_qList[0].timeleft+"</h2>");

        var timer = setInterval(function() {
            _qList[0].decrement();
            $("#timer").text("Time Left: "+_qList[0].timeleft);
            if(_qList[0].timeleft === 0) {
                clearInterval(timer);
                $("h2").text("Time Up!");
                
            }
        },1000);

    }

    correctAnswer() {

        this.correct++;

        $("correct").text = "Correct: " + this.correct;

    }

    wrongAnswer() {

        this.wrong++;

        $("wrong").text = "wrong: " + this.wrong;

    }

}