// For stylizing
const navList = document.querySelector('.navList')
const navBtn = document.querySelector('.navBtn')
const navLinks = document.querySelectorAll('.navLi')


navBtn.addEventListener('click', () => {
  navBtn.classList.toggle('navBtnToggle')
  navList.classList.toggle('navActive')
  navLinks.forEach((item, index) => {
    const delay = index / 10 + 0.05
    if (item.style.animation)
      item.style.animation = ''
    else
      item.style.animation = `SlideIn 0.5s forwards ${delay}s`
  })
})

// Start of the API Fetch
const url = "https://api.openbrewerydb.org/breweries"


let longitudeCoordinates = 0; 
let latitudeCoordinates = 0;
let x = document.getElementById("demo");


// Controlled by a HTML button to invoke this function, which will generate lat/long 
async function getLocation() {
  if (navigator.geolocation) {
    await navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

// This function establishes our lat/long and passes the values into a variable
function showPosition(position) {

  longitudeCoordinates = position.coords.longitude
  latitudeCoordinates = position.coords.latitude

}

async function fetchBreweriesByDist () {
  
  // removeElementsByClass()

  let element = document.querySelector('.breweryList')



  await getLocation()

  await new Promise(r => setTimeout(r, 5000));

  console.log(`The long coordinates are ${longitudeCoordinates}`)
  console.log(`The lat coordinates are ${latitudeCoordinates}`)
  let queryParamsByDist = `${url}?by_dist=${latitudeCoordinates},${longitudeCoordinates}`
  console.log(queryParamsByDist)

  await fetch(queryParamsByDist)
    .then((response) => response.json())
    .then((data) => {

      for(let i = 0; i < data.length; i++) {
        console.log(data[i])

        let liTag = document.createElement('li')
        liTag.className = "liTag"
        liTag.innerText = data[i].name
        element.appendChild(liTag);

        let pTagStreet = document.createElement('p')
        pTagStreet.className = "liTag"
        pTagStreet.innerHTML = data[i].street + ", "
        liTag.appendChild(pTagStreet)

        let ptagZip = document.createElement('p')
        ptagZip.className = "liTag"
        ptagZip.innerHTML = data[i].postal_code
        liTag.appendChild(ptagZip)
      }
      console.log(data)
    })


}

function removeElementsByClass(className){
  const elements = document.getElementsByClassName("liTag");
  while(elements.length > 0){
      elements[0].parentNode.removeChild(elements[0]);
  }
}

