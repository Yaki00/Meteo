window.addEventListener("load",()=>{
    document.querySelector(".loader").classList.add("loader--hidden")
})


const sortie = document.querySelector(".sortie")
let btnpousse = document.querySelector(".btnpousse")
const Fahrenheit = document.getElementById("Fahrenheit")
const Celsius = document.getElementById("Celsius")
let codepostale = document.getElementById("codepostale")
let city = document.getElementById("city")

let codepostale2 = 0
let unit = "metric";


async function getData(textenvoie,unit){
    let url ="";
    if (codepostale2 == 0){
        url = `https://api.openweathermap.org/data/2.5/weather?q=${textenvoie}&units=${unit}&lang=fr&limit=1&appid=bd38e6554579059ccac0b482ca78a3d1`
    }else{
        url = `https://api.openweathermap.org/data/2.5/weather?zip=${textenvoie},FR&units=${unit}&appid=bd38e6554579059ccac0b482ca78a3d1`
    }   
    let res = await fetch(url)
    .then(response => response.json())
    .then(data => {
    
        console.log(data);
        console.log(codepostale2)
        let temp = data.main.temp
        let icon = data.weather[0].icon
        let description = data.weather[0].description
        let ville = data.name
        console.log(icon)

        let formule = document.createElement("h2")
        formule.textContent = "A"
        formule.classList.add("mot")
        sortie.appendChild(formule)

        let laville = document.createElement("h2")
        laville.textContent = ville
        laville.classList.add("ville")
        sortie.appendChild(laville)

        let temperature = document.createElement("h2")
        temperature.textContent = temp
        temperature.classList.add("temp")
        sortie.appendChild(temperature)

        let cel = document.createElement("h2")
        cel.textContent = "°C"
        cel.classList.add("cel")
        sortie.appendChild(cel)

        let iicon = document.createElement("img")
        iicon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`
        iicon.classList.add("imagenuage")
        sortie.appendChild(iicon)

        let descri = document.createElement("h2")
        descri.textContent = description
        descri.classList.add("descri")
        sortie.appendChild(descri)

    })
    .catch(error => {
        console.error('Une erreur s\'est produite :', error);
        let err = document.createElement("h1")
        err.textContent = "Merci d'ecrire une ville exsistante, vérifier la syntaxe"
        sortie.appendChild(err)
    });


}


btnpousse.addEventListener("click", function() {
    sortie.innerHTML = "";
    let textenvoie = document.querySelector(".textenvoie").value
    getData(textenvoie,unit);

  });


Celsius.addEventListener("click",function(){
    sortie.innerHTML = "";
    let textenvoie = document.querySelector(".textenvoie").value
    unit = "metric"
    getData(textenvoie,unit);
})

Fahrenheit.addEventListener("click",function(){
    sortie.innerHTML = "";
    let textenvoie = document.querySelector(".textenvoie").value
    unit = "standar"
    getData(textenvoie,unit);
})

codepostale.addEventListener("click", function(){
    sortie.innerHTML = "";
    codepostale.classList.add("couleursbtn")
    city.classList.remove("couleursbtn")
    let textenvoie = document.querySelector(".textenvoie").value
    codepostale2 = 1
    getData(textenvoie,unit);

})
  
city.addEventListener("click", function(){
    sortie.innerHTML = "";
    city.classList.add("couleursbtn")
    codepostale.classList.remove("couleursbtn")
    let textenvoie = document.querySelector(".textenvoie").value
    codepostale2 = 0
    getData(textenvoie,unit);

})