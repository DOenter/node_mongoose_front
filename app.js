const express = require("express");
const app = express();
mongoose = require("mongoose");
const Character = require("./models/Character")

const PORT = 3800;
const connectionString = "mongodb+srv://mojanazwauzytkownika:mojehaslouzytkownika@cluster0.rrhsm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

app.use(express.urlencoded({extend: true}));
app.use(express.json());

async function run(){
    await mongoose.connect(connectionString, {
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
    await Character.collection.drop() //usunięcie kolekcji - tylko wersja dev - zeby za kazdym uruchomieniem nie dodawało mi tych samych dokumentów do bazy
    await Character.create([
        {name: "Marcin Dłubis", age: 32, rank: "marszałek"},
        {name: "Jan Kowalski", age: 43, rank: "komandor"},
        {name: "Jacek Nowak", age: 69, rank: "komandor"},
        {name: "Jacek Kowalski", age: 23, rank: "porucznik"},
        {name: "Aleksander Macedoński", age: 41, rank: "komandor"},
        {name: "Marian Ozimek", age: 39, rank: "pułkownik"}
    ])

    const docs = await Character.find({rank: "komandor"})
    console.log(docs)
};

run().catch( error => console.log(error));

app.listen(PORT, () => {
    console.log("Aplikacja działa na porcie", PORT)
})