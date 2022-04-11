function hide() {
    let a = document.querySelector('.first-infa')
    let b = document.querySelector('.second-infa')
    let c = document.querySelector('.third-infa')
    a.style.display = 'none'
    b.style.display = 'none'
    c.style.display = 'none'
}


function show(i) {
    let a = document.querySelector(`.${i}`)
    hide()
    a.style.display = 'flex'
}

const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
let imgofpoqoda = document.querySelector('.f-poqoda-icon>img')

function poisk() {
    let cityName =  document.querySelector('.poiskovik label input:first-child').value
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;
    fetch(url).then(data => data.json())
         // .then(console.log)
        .then(data2 => {
            cityName = data2.name;
            //first-info
            document.querySelector('.f-qradus > h2').innerText = `${Math.round(data2.main.temp - 274)}`
            document.querySelector('.f-qorod > p').innerText = `${cityName}`
            let iconcod = data2.weather[0].icon
            let iconurl =  "http://openweathermap.org/img/w/" + iconcod + ".png";
            imgofpoqoda.src = iconurl
            //second-info
            document.querySelector('.s-qorod > h2').innerText = `${cityName}`
            document.querySelector('.tempr > p').innerText = `${Math.round(data2.main.temp - 274)}`
            document.querySelector('.chustv-tempr > p').innerText = `${Math.round(data2.main.feels_like - 274)}`
            document.querySelector('.oblachnost > p').innerText = `${data2.weather[0].main}`
            let sunrisetime = new Date(data2.sys.sunrise*1000 - (14400-data2.timezone)*1000)
            let sunsettime = new Date(data2.sys.sunset*1000- (14400-data2.timezone)*1000)
            document.querySelector('.vosxod > p').innerText = `${sunrisetime.getHours()}:${sunrisetime.getMinutes()}`
            document.querySelector('.zakat > p').innerText = `${sunsettime.getHours()}:${sunsettime.getMinutes()}`


            console.log(data2)
        }).catch(err => alert('Нет такого города-_-'))

}



window.addEventListener('keyup', (event) => {
    if (event.keyCode ===13) {
        let a = document.querySelector('.poiskovik label input:first-child').value
        if (a.length !== 0) {
            poisk()
        }
        show('first-infa')
        // iconofpoqoda.innerHTML = ''
    }
})


function like(){
    let a = document.querySelector('#qorod').innerText
    let count = document.querySelectorAll('.added-city>ul>li')
    let list = [];
    count.forEach(li =>{ list.push(li.innerText)})
    if (list.includes(a)) {

    } else {
        let place = document.querySelector('.added-city>ul')
        place.innerHTML += `<li onclick="FastShow('${a}')">${a}</li>`
        localStorage.setItem(list.length, a)
    }


}

function FastShow(i) {
    document.querySelector('.poiskovik label input:first-child').value = i
    show('first-infa')
    poisk()
}

function forlocalstor() {
    for (let i = 0; i<localStorage.length ;i++) {
        let key = localStorage.key(i)
        let a = localStorage.getItem(key)
        let place = document.querySelector('.added-city>ul')
        let b = a;
        place.innerHTML += `<li onclick="FastShow('${b}')">${a}</li>`

    }
}

forlocalstor()
// localStorage.clear()










