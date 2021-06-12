const express = require("express");
// const app = express();
mongoose = require("mongoose");
const Character = require("./../models/Character")
const router = express.Router();

const connectionString = "mongodb+srv://mojanazwauzytkownika:mojehaslouzytkownika@cluster0.rrhsm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(connectionString, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false
    }).then(() => {
        console.log("Połączono z bazą danych")
    },
        error => {
            console.log("Błąd połączenia: " + error)
        }
)

if (Character.length){
    Character.collection.drop() //usunięcie kolekcji - tylko wersja dev - zeby za kazdym uruchomieniem nie dodawało mi tych samych dokumentów do bazy
}

Character.create([
    {name: "Marcin Dłubis", age: 32, rank: "marszałek"},
    {name: "Jan Kowalski", age: 43, rank: "komandor"},
    {name: "Jacek Nowak", age: 69, rank: "komandor"},
    {name: "Jacek Kowalski", age: 23, rank: "porucznik"},
    {name: "Aleksander Macedoński", age: 23, rank: "komandor"},
    {name: "Marian Ozimek", age: 39, rank: "pułkownik"}
])


router.get("/", (req,res) => {
    res.render("index",{
        title: "Tytuł strony"
    })
})

module.exports = router;