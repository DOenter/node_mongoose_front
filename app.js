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

    if (Character.length){
        await Character.collection.drop() //usunięcie kolekcji - tylko wersja dev - zeby za kazdym uruchomieniem nie dodawało mi tych samych dokumentów do bazy
    }

    await Character.create([
        {name: "Marcin Dłubis", age: 32, rank: "marszałek"},
        {name: "Jan Kowalski", age: 43, rank: "komandor"},
        {name: "Jacek Nowak", age: 69, rank: "komandor"},
        {name: "Jacek Kowalski", age: 23, rank: "porucznik"},
        {name: "Aleksander Macedoński", age: 23, rank: "komandor"},
        {name: "Marian Ozimek", age: 39, rank: "pułkownik"}
    ])

    //przykład 1 - znajdź wszystkich o statusie rank:"komandor"
    // const docs = await Character.find({rank: "komandor"})
    // console.log(docs)
    //przykład 2
    // const docs = await Character.findOneAndUpdate({name: "Jacek Nowak"},{age: "47"})
    // const findID = await Character.find();
    // const docs = await Character.findByIdAndUpdate({_id: findID[3]._id},{rank: "pułkownik"})
    // console.log(docs)
    //przykład 3 - UPDATE MANY
    // const docs = await Character.updateMany({age: 23},{age:25})
    // const docs = await Character.updateMany({},{employment: true})
    //przykład 4 - ADD DOCUMENT TO COLLECTIOn
    // const insterDoc = new Character({name: "Wojciech Surma", rank: "szeregowy"})
    // await insterDoc.save(( err, someVal) => {
    //     if (err) return console.error(err)
    //     console.log(someVal.name + " - zapisano do kolekcji")
    // })
    // const docs = await Character.find();
    // console.log(docs)
    //Przykład 5
    // const docs = await Character.deleteOne({name: "Jacek Kowalski"})

    // 5a

    // const docs = await Character.deleteMany({age: 23})
    const findID = await Character.find();
    await Character.findByIdAndRemove(findID[0]._id)
};

run().catch( error => console.log(error));

app.listen(PORT, () => {
    console.log("Aplikacja działa na porcie", PORT)
})