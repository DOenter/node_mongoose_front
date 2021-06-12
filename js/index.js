console.log("został wczytany zewnętrzny plik")

document.getElementById("btn").addEventListener("click",example)

function example(){

    fetch("/posts",{
        method: "GET"
    }).then(function(response){
        if (response){
            response.json().then( function(data){
                console.log(data)
                document.getElementById("danePobrane1").innerHTML = data[5].name;
                document.getElementById("danePobrane2").innerHTML = data[5].age;
                document.getElementById("danePobrane3").innerHTML = data[5].rank;
            })
        }
    })

}