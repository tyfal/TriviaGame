class question {

    constructor(questionText, optionList, answer, img) {

        this.question = questionText;
        this.optionList = optionList;
        this.answer = answer;
        this.img = img;
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

        var _self = this;

        var timeleft = 5;

        $("#triviaDiv").prepend("<h2 id='timeLeft'>" + timeleft + "</h2>");

        var timer = setInterval(function () {
            timeleft -= 1;
            $("#timeLeft").text(timeleft);
            if (timeleft <= 0) {
                clearInterval(timer);
                _self.timeOver();
            }
            $("li").on("click", function () {
                $("li").off("click");
                clearInterval(timer);
                _self.judgeAnswer(this);
            });
        }, 1000);

    }

    judgeAnswer(selection) {

        var selectTxt = $(selection).text();

        if (selectTxt === this.answer) {

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

        this.q1.presentQuestion();

        // for (var i = 0; i < this.qList.length; i++) {

        //     this.qList[i].presentQuestion();

        //     if (this.qList[i].correct) {

        //         this.correctAnswer();

        //     } else {

        //         this.wrongAnswer();

        //     }

        // }

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