let currCountry = "";

let insertdatafromAPI=document.getElementById('detail');

function startLoadingAPI()
    {let name1=window.location.search.split("=")[1];
//     console.log(name1);
//    console.log( `https://restcountries.com/v3.1/name/${name1}`);
    fetch(`https://restcountries.com/v3.1/name/${name1}`).then((apidata)=>{
        //console.log(apidata);
        return apidata.json();
})
.then((actualdata)=>{
    //console.log(actualdata);
    currCountry=actualdata;
    DisplayDetails(currCountry[0]);
    DisplayNeighbours(currCountry[0]);

})
.catch((err)=>{
    console.log("Error is : ${err}"+err);

})
}
function DisplayDetails(country){
    console.log(country);
    let str="";

        let currencyList="";
        if(country.currencies != undefined){
            for(let currency in country.currencies){
                currencyList+=(" "+country.currencies[currency].name);
            }
        }
        else{currencyList="No Currency"}

        let languagelist="";
        if(country.languages!=undefined){
            for(let lang in country.languages){
                languagelist+=(" "+country.languages[lang]);
            }
        }
        else{languagelist="No Official Language"}
        

        let str1 = `<div class="   row mx-0 my-0 px-0 py-0">
        <div class ="col-lg-1 col-md-1 col-sm-1 col-xs-1 mx-0 my-0 px-0 py-0 ">
           </div>
        <div class ="col-lg-10 col-md-10 col-sm-10 col-xs-10 mx-0 my-0 px-0 py-0">
            <div class="row my-1 mx-1 mt-2">
             <h3 class="mt-4" >${country.name.common}</h3>
                <div class="col-6 my-3 country-img">
                    <img src="${country.flags.svg}" class=" col-12 mx-0 px-0" >
                </div>
                <div class="col-6 mt-0 country-all">
               
                
                    <p class="mt-3" >Capital : ${country.capital}</p>
                    <p>Population : ${country.population}</p>
                    <p>Region : ${country.region}</p>
                    <p>Sub-region : ${country.subregion}</p>
                    <p>Area : ${country.area} sq km</p>
                    <p> Country Code : ${country.idd.root + country.idd.suffixes}</p>
                    <p>Language : ${languagelist}</p>
                    <p>Currencies : ${currencyList}</p>
                    <p>Timezones : ${country.timezones}</p>
                    
                </div>
            </div>
            
            </div>
        <div class ="col-lg-1 col-md-1 col-sm-1 col-xs-1 mx-0 my-0 px-0 py-0">
            </div> 
    </div> 
    </div>
            `; 
    
    insertdatafromAPI.innerHTML=str1;

}
function DisplayNeighbours(country){
    let countries="";
    gettingapis();
    function gettingapis()
    {
       
        fetch('https://restcountries.com/v3.1/all').then((apidata)=>{
            //console.log(apidata);
            return apidata.json();
    })
    .then((actualdata)=>{
        // console.log(actualdata);
        countries=actualdata;
        let str="";
    let insertneighbourfromAPI=document.getElementById('neighbours');
    
    for (let neighbour of country.borders){
        // console.log(countries);
        console.log(neighbour);
        let resultdata=countries.filter((cntry)=>{
            return cntry.cca3.includes(neighbour);
        });
        console.log(resultdata);
        let str1 = `

                <div class="col-4 my-2  country-img">
                <a href="detail.html?country=${resultdata[0].name.official}" >
                    <img id="detail-img"src="${resultdata[0].flags.svg}" class=" col-10 mx-1 my-2" >
                    </a>
                </div>
            `;
        str+=str1;
        }insertneighbourfromAPI.innerHTML=str;
    
    })
    .catch((err)=>{
        console.log("Error is : ${err}"+err);
    
    })
    }
}