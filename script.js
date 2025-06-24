const board = (function() {
    let boardArr = ["", "", "", "", "", "", "", "", ""];

    function clearBoard(){
        boardArr = ["", "", "", "", "", "", "", "", ""];
    }

    function setTile(value, mark){
        boardArr[value] = mark;
    }

    function checkWin(){
        for (let i = 0; i < 3; i++){
            //row check
            if (boardArr[i*3] === boardArr[i*3 + 1] && boardArr[i*3] === boardArr[i*3 + 2] && boardArr[i*3] !== "")
                return true;

            //column check
            if (boardArr[i] === boardArr[i + 3] && boardArr[i] === boardArr[i + 6] && boardArr[i] !== "")
                return true;
        }
        //diagonal check
        if ((boardArr[0] === boardArr[4] && boardArr[4] === boardArr[8] || boardArr[2] === boardArr[4] && boardArr[4] === boardArr[6]) && boardArr[4] !== "")
            return true;
        else
            return false;
    }

    return {clearBoard, setTile, checkWin};

})();

const game = (function(){
    const player1 = makePlayer("X");
    const player2 = makePlayer("O");
    let roundNum = 0;

    function makePlayer(inpMark){
        let mark = inpMark;
        let score = 0;
    
        function getMark(){
            return mark;
        }
    
        function increaseScore(){
            score++;
        }
    
        function getScore(){
            return score;
        }
    
        return {getMark, increaseScore, getScore};
    }

    function playRound(){
        if (roundNum === 9)
            return "tie";
        else if (roundNum % 2 === 0){
            board.setTile(parseInt(prompt("Enter tile number to play")), player1.getMark());
            if (board.checkWin()){
                player1.increaseScore();
                return "player1";
            }
        }
        else{
            board.setTile(parseInt(prompt("Enter tile number to play")), player2.getMark());
            if (board.checkWin()){
                player2.increaseScore();
                return "player2";
            }
        }
        return "continue";
    }

    function playGame(){
        let result;

        do{
            result = playRound();
            if (result === "player1")
                alert("Player 1 won");
            else if (result === "player2")
                alert("Player 2 won");
            else if (result === "tie")
                alert("TIE");

            roundNum++;
        } 
        while(result === "continue");

        roundNum = 0;
    }

    return {playGame};
})();