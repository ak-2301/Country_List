let countriesList = "";
let timezone="";
let insertdatafromAPI=document.getElementById('box');
function startLoadingAPI()
{
    fetch('https://restcountries.com/v3.1/all').then((apidata)=>{
        console.log(apidata);
        return apidata.json();
})
.then((actualdata)=>{
    console.log(actualdata);
    countriesList=actualdata;
    DisplayCountries(countriesList);

})
.catch((err)=>{
    console.log("Error is : ${err}"+err);

})
}
const currentDate = new Date();

// Get the day, month, year, hours, and minutes from the Date object
const day = currentDate.getDate();
const monthIndex = currentDate.getMonth();
const year = currentDate.getFullYear();
const hours = currentDate.getHours();
const minutes = currentDate.getMinutes();

// Array of month names
const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

// Format the day with appropriate suffix (e.g., "23rd")
const formattedDay = day + getDaySuffix(day);

// Get the month name
const month = monthNames[monthIndex];

// Format the time with leading zeros if needed
const formattedHours = hours.toString().padStart(2, "0");
const formattedMinutes = minutes.toString().padStart(2, "0");

// Construct the final formatted date and time string
const formattedDateTime = `${formattedDay} ${month} ${year}, ${formattedHours}:${formattedMinutes}`;

// Function to get the day suffix (e.g., "23rd")
function getDaySuffix(day) {
  if (day >= 11 && day <= 13) {
    return "th";
  }

  const lastDigit = day % 10;
  switch (lastDigit) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

function DisplayCountries(countries){
    let str="";
    

    for( let country in countries){
        if(countries[country].timezones!=undefined){
            var currentTime=new Date($.now());
            timezone = countries[country].timezones[0].substring(4).split(':');
            timezone = (parseInt(timezone[0])*60+parseInt(timezone[1]))*60000;
            timezone = new Date(currentTime.getTime()+timezone-19800000);
            timezone= timezone.toLocaleString();
            // console.log(timezone);
        }

        let currencyList="";
        if(countries[country].currencies != undefined){
            for(let currency in countries[country].currencies){
                currencyList+=(" "+countries[country].currencies[currency].name);
            }
        }
        else{currencyList="No Currency"}

        let str1 = `<div class="row my-1 border border-dark">
            <div class="col-4 my-1 country-img">
                <img src="${countries[country].flags.svg}" class=" col-12 " >
            </div>
            <div class="col-8 mt-1 country-info">
                <h5>${countries[country].name.common}</h5>
                <p class="my-0">Currency: ${currencyList}</p>
                <p class="my-0">Current Date and Time: ${formattedDateTime}  </p>
                 <button type="button" class="btn-map col-5"> <a href="${countries[country].maps.googleMaps}" target="_blank">Show Map</a></button>
                 <button type="button" class="btn-detail col-5"><a href="detail.html?country=${countries[country].name.common}" target="_blank">Details</a></button>
                  
            </div>
        </div>
            `; 
            str+=str1;
    }
    insertdatafromAPI.innerHTML=str;

}
function search(){
    let input=document.getElementById('search1').value.toUpperCase();
    console.log(input);
    let resultdata=countriesList.filter((country)=>{
        return country.name.official.toUpperCase().includes(input);
    });
    DisplayCountries(resultdata);
    console.log(resultdata);
    console.clear;
    
    
}
