document.querySelector('.searcher').addEventListener('submit', async (event)=>{
  event.preventDefault();

  let input = document.querySelector('#searchInput').value

  if(input !== ''){
        clearInfo();
        showWarning('Loading...'); 

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=7a34c09d2dfe11d0e5753e3cd003851c&units=metric&lang=pt_br`
        
        let results = await fetch(url);
        let json = await results.json();
        console.log(json)
        if(json.cod === 200) {
          showInfo({
            name: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempIcon: json.weather[0].icon,
            windSpeed: json.wind.speed,
            windAngle: json.wind.deg 
        })    
    } else {
      clearInfo()
      showWarning("We couldn't find this location!")
    }
  } else {
    clearInfo();
  }
})
  
function showInfo(json){
  showWarning('')

  document.querySelector('.title').innerHTML = `${json.name}, ${json.country} `
  document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`
  document.querySelector('.windInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`
  
  document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)
  
  document.querySelector('.windPoint').style.transform = `rotate(${json.windAngle-90}deg)`
  
  document.querySelector('.result').style.display = 'block'
}

function clearInfo() {
  showWarning('');
  document.querySelector('.result').style.display = 'none'
}

function showWarning(msg) {
  document.querySelector('.Warning').innerHTML = msg;
}