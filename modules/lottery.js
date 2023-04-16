import Player from "./player.js";

export default class Lottery {
    constructor (people) {
        this.people=people;
        this.players=[];
        this.winningCombination= [];
    }
//METODA ZA DOBIJANJE BROJEVA ZA LUTRIJU
getLotteryNumbers () {
    let lotteryNumbers= [];
    //dok su unutra manje od 4 broja, vrti, inace prestani vrtiti
    while(lotteryNumbers.length < 4) {
        //generiraj brojeve od 1 do 7
       const number= Math.floor(Math.random() * 7)+1;
       //ako broj ne postoji vec u arrayu, dodaj ga
       if (!lotteryNumbers.includes(number)) {
        lotteryNumbers.push(number);
       }
    }
    lotteryNumbers.sort();
    return lotteryNumbers;
    }

generatePlayers () {
    this.people.map((person)=>{
        const name=person.name;
        const surname=person.surname;
        const lotteryNumbers=this.getLotteryNumbers();
        const newPlayer = new Player(name, surname, lotteryNumbers);
        this.players.push(newPlayer);
    });
}

getWinningCombination () {
    this.winningCombination= this.getLotteryNumbers();
}
//metoda koja pokreće izvlačenje i poziva sve preduvjete i na temelju
//toga vraća jesam li dobio ili ne
startDrawing() {
//Kada sam definirao lutriju i ucitao ljude, prvo generiraj sve one koji sudjeluju u igri, tj playere
this.generatePlayers();
this.getWinningCombination();

return new Promise ((resolve, reject)=>{
    setTimeout(()=>{
        const winners=this.players.filter((player)=>{
            return player.lotteryNumbers.every(
                (value, index)=>value===this.winningCombination[index]);
        });
        const result= {
            winningCombination: this.winningCombination,
            winners,
        };

        if(winners.length>0)
        {
            resolve(result);
        } else {
        reject(result);
        }
    }, 2000);
})
    }
}