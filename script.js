let words = [
    { word: "Apple", translation: "Яблуко" },
    { word: "Banana", translation: "Банан" },
    { word: "Carrot", translation: "Морква" },
    { word: "Orange", translation: "Апельсин" },
    { word: "Grape", translation: "Виноград" },
    { word: "Strawberry", translation: "Полуниця" },
    { word: "Plum", translation: "Слива" },
    { word: "Watermelon", translation: "Кавун" },
    { word: "Melon", translation: "Диня" },
    { word: "Pomegranate", translation: "Гранат" },
    { word: "Lemon", translation: "Лимон" },
    { word: "Apricot", translation: "Абрикос" }
];

let usedIndexes = [];

let currentIndex = 0;
let indexWord = 0;
let correctCount = 0;
let incorrectCount = 0;

$(document).ready(function () {

    $("#ButtonOk").on("click", function () {
        let inputNickValue = $("#InputNick").val();
        if (inputNickValue === "") {
            alert("Рядок з нікнеймом не може бути пустим!");
        } else {
            $("#Modal").css("display", "none");
            $("#UserName").text(inputNickValue);
        }
    });

    $("#ButtonRestart").on("click", function (){
        $("#WinnerWindow").css("display", "none");
        usedIndexes = [];
        currentIndex = 0;
        indexWord = 0;
        correctCount = 0;
        incorrectCount = 0;
        $("#correct-count").text("0");
        $("#incorrect-count").text("0");
        $('#MainH').text('DuoRoma');
    });

    function getRandomWord() {
        return words[Math.floor(Math.random() * words.length)];
    }

    function showNextWord() {
        let wordObject = getRandomWord();
        
        let newIndex = words.indexOf(wordObject);
        while (usedIndexes.includes(newIndex)) {
            wordObject = getRandomWord();
            newIndex = words.indexOf(wordObject);
        }

        $('#CardBox').text(wordObject.word);
        $('#AnswerInput').val('');

        console.log(newIndex);

        usedIndexes.push(newIndex);
        currentIndex = newIndex;
        indexWord++;
        
        $('#MainH').text('DuoRoma - Крок ' + indexWord + '/' + words.length);
    }
    
    showNextWord();

    $('#CardBox').on('click', function () {
        let userAnswer = $('#Answer').val().trim().toLowerCase();
        let correctAnswer = words[currentIndex].translation.toLowerCase();

        console.log(currentIndex);

        console.log(correctAnswer);

        if(userAnswer == "")
        {
            alert("Надайте відповідь");
            return;
        }

        if (userAnswer === correctAnswer) {
            correctCount++;
        } else {
            incorrectCount++;
        }

        $('#correct-count').text(correctCount);
        $('#incorrect-count').text(incorrectCount);

        $('#Answer').val('');

        if (indexWord < words.length) {
            showNextWord();
        } else {
            $("#WinnerWindow").css("display", "flex");
            $("#LabelWinner").text('Рівень знань мови: ' + ((correctCount / words.length) * 100).toFixed(2) + '%');
        }
    });
});

    