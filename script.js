// Write your JavaScript code here!
window.addEventListener("load", function(){
      
   let form = document.querySelector("form");
   
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response){
      response.json().then(function(json){
         console.log(json);
         const missionTarget = document.getElementById("missionTarget");
         missionTarget.innerHTML = `<h2>Mission Destination</h2>
         <ol>
            <li>Name: ${json[1].name}</li>
            <li>Diameter: ${json[1].diameter}</li>
            <li>Star: ${json[1].star}</li>
            <li>Distance from Earth: ${json[1].distance}</li>
            <li>Number of Moons: ${json[1].moons}</li>
         </ol>
         <img src="${json[1].image}">`;
      })
   });

   form.addEventListener("submit", function(event){
      let pilotName = document.querySelector("input[name = pilotName]");
      let copilotName = document.querySelector("input[name=copilotName]");
      let fuelLevel = document.querySelector("input[name=fuelLevel]");
      let cargoMass = document.querySelector("input[name=cargoMass]");

      let faultyItemsDiv = document.getElementById("faultyItems");
      let launchStatusHeader = document.getElementById("launchStatus");
      let fuelStatus = document.getElementById("fuelStatus");
      let cargoStatus = document.getElementById("cargoStatus");

      if (pilotName.value === "" || copilotName === "" || fuelLevel === "" || cargoMass === "") {
         alert ("All fields are required.");
         event.preventDefault();
      }

      if (isNaN(pilotName.value) === false || isNaN(copilotName.value) === false) {
         alert ("Please enter a valid name.");
         event.preventDefault();
      }
      if (isNaN(fuelLevel.value) === true || isNaN(cargoMass.value) === true) {
         alert ("Please enter a valid number.");
         event.preventDefault();
      }

      if (fuelLevel.value < 10000) {
         launchStatusHeader.innerHTML = "<h2>Shuttle not Ready for Launch</h2>";
         launchStatusHeader.style.color = "red";
         faultyItemsDiv.style.visibility = "visible";
         fuelStatus.innerHTML = `Fuel level not high enough for launch.`;
      }

      if (cargoMass.value > 10000) {
         faultyItemsDiv.style.visibility = "visible";
         launchStatusHeader.innerHTML = "<h2>Shuttle not Ready for Launch</h2>";
         launchStatusHeader.style.color = "red";
         cargoStatus.innerHTML = `Cargo mass too high for launch.`;
      }

      if (fuelLevel.value > 10000 && cargoMass.value < 10000) {
         launchStatusHeader.innerHTML = `Shuttle is ready for launch.`;
         launchStatusHeader.style.color = "green"; 
      }

      event.preventDefault();
   });

});
/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
