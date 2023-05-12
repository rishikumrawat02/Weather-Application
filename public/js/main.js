const cityName = document.getElementById("cityName");
const submit = document.getElementById("submitButton");

const city_name = document.getElementById("city_name");

const temp = document.getElementById("temp");
const temp_status = document.getElementById("temp_status");

const datahide = document.querySelector('.middlelayer');


const getInfo = async(event) => {
    event.preventDefault();
    let cityVal = cityName.value;   
    if(cityVal === ""){
     city_name.innerText= "Plz enter the city name";
     datahide.classList.add('data_hide');
    }else{
        try{
            datahide.classList.remove('data_hide');
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=0bbc873cc2b8e9c5a8086afeee632427`;
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];

            
            city_name.innerText= `${arrData[0].name},${arrData[0].sys.country}`;
            temp.innerText = arrData[0].main.temp+"°C";
            const tempMood= arrData[0].weather[0].main;    
            
            if(tempMood=="Clear"){
                temp_status.innerHTML = '<i class="fas fa-sun" style="color: #eccc68;"></i>';

            }else if(tempMood=="Clouds"){
                temp_status.innerHTML = '<i class="fas fa-cloud" style="color: #f1f2f6;"></i>';

            }else if(tempMood=="Rain"){
                temp_status.innerHTML = '<i class="fas fa-cloud-rain" style="color: #a4b0be;"></i>';

            }else{
                temp_status.innerHTML = '<i class="fas fa-cloud-rain" style="color: #a4b0be;"></i>';
            }

        }catch{
            city_name.innerText= "Enter the valid city name";
            datahide.classList.add('data_hide');
        }       
    }
};

const curDate = document.getElementById("date");
let currentTime = new Date();
const getCurrentDay = () => {
    var weekDay = new Array(7);
    weekDay[0] = "Sunday";
    weekDay[1] = "Monday";
    weekDay[2] = "Tuesday";
    weekDay[3] = "Wednesday";
    weekDay[4] = "Thursday";
    weekDay[5] = "Friday";
    weekDay[6] = "Saturday";

    let Day = weekDay[currentTime.getDay()];
    return Day;
}

const getCurrentTime = () => {
    var months = ["Jan", "Feb", "March", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    var month = months[currentTime.getMonth()];
    var date = currentTime.getDate();
    var year = currentTime.getFullYear();

    let hours = currentTime.getHours();
    let mins = currentTime.getMinutes();
    let periods = "AM";

    if (hours > 11) {
        periods = "PM";
        if (hours > 12) hours -= 12;
    }
    if (mins < 10) {
        mins = "0" + mins;
    }
    return `${month} ${date},${year} | ${hours}:${mins} ${periods}`;
};
curDate.innerHTML = getCurrentTime() + " | " + getCurrentDay();

submit.addEventListener("click",getInfo);

