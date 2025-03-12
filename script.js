class Pet{
    constructor(name, src){
        this.name = name;
        this.src = src;
        this.base = src.replace(/Pictures\//, "");
        this.base = this.base.replace(/(.png|.jpg|.jpeg)/, "");
        this.stage = parseInt(this.base.charAt(this.base.length - 1));
        if(!isNaN(this.stage)) this.base = this.base.substring(0, this.base.length - 1);
        this.hunger = 100;
        this.happiness = 100;
        this.thirst = 100;
        this.lvl = 1;
        this.xp = 0;
        this.isAlive = true;
        this.hungerClicker = 0;
        this.happinessClicker = 0;
        this.thirstClicker = 0;
    }
}

// init basic vars
let coins = 0;
let choosers = document.querySelectorAll(".galleryCell");
let clickers = 0;
let newPet = null;
let careType = "food";
let items = [];


function updateCountdown() {
    let loginElement = document.getElementById("login");
    if (!loginElement) return; // Prevent errors if element doesn't exist

    const now = new Date();
    const utc7Offset = -7 * 60;
    const utcNow = now.getTime() + now.getTimezoneOffset() * 60000;
    const localUtc7Time = new Date(utcNow + utc7Offset * 60000);

    let resetTime = new Date(localUtc7Time);
    resetTime.setUTCHours(12, 0, 0, 0); // Set to 12:00 PM UTC-7

    if (localUtc7Time > resetTime) {
        resetTime.setUTCDate(resetTime.getUTCDate() + 1);
    }

    let timeRemaining = resetTime - localUtc7Time;
    let hours = Math.floor(timeRemaining / (1000 * 60 * 60));
    let minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    loginElement.innerHTML = `<a href="dailyLogin.html">Daily login (Resets in ${hours}h ${minutes}m ${seconds}s)</a>`;
}

// Start countdown only after page loads
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("login")) {
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
});

// adding onclicks, changing page when pet was created
document.getElementById("next").onclick = () => {
    let pet = document.getElementById("pet");
    let namePicker = document.getElementById("namePicker")
    if(pet.getAttribute("src") == "Pictures/blank.png" || namePicker.value == ""){
        document.querySelector(".errmsg").classList.remove("hide");
    }
    else{
        // changing to display pet page
        document.querySelector(".errmsg").classList.add("hide");
        document.getElementById("gallery").classList.add("hide");
        namePicker.classList.add("hide");
        document.querySelector("label").innerText = namePicker.value;
        document.getElementById("next").classList.add("hide");
        document.querySelector("#bottomBar").classList.remove("hide");
        document.querySelector("#shopTab").classList.remove("hide");
        newPet = new Pet(namePicker.value, pet.getAttribute("src"));
        let stage = document.getElementById("Stage").childNodes;
        if(isNaN(newPet.stage)){
            stage[1].innerText = "Your pet is fully evolved!";
            stage[3].setAttribute("src", "Pictures/happycat.png")
        }
        else{
            let nextStage = "Pictures/" + newPet.base + (newPet.stage + 1) + ".png";
            stage[3].setAttribute("src", nextStage);
            stage[5].innerText = "Cost: 100 coins";
        }

        pet.onclick = addCoin;
        setInterval(incrementTime, 10000);
        // 900000 for 15 minutes

    }

}
for(let i = 0; i < choosers.length; i++){
    choosers[i].onclick = () => choosePet(choosers[i]);
}

// changing pet vars over time
function incrementTime(){
    newPet.xp += 100;
    if(newPet.xp >= 1000){
        newPet.lvl += 1;
        document.getElementById("petLvl").innerText = newPet.lvl;
        newPet.xp = 0;
    }

    coins += clickers + 1;
    newPet.hunger += newPet.hungerClicker;
    newPet.happiness += newPet.happinessClicker;
    newPet.thirst += newPet.thirstClicker;
    document.getElementById("xp").innerText = newPet.xp;
    document.getElementById("hunger").innerText = --newPet.hunger;
    document.getElementById("happiness").innerText = --newPet.happiness;
    document.getElementById("thirst").innerText = --newPet.thirst;
    document.getElementById("coins").innerText = coins;
}

// buying clicker items from store
function buyItem(event, purchase){
    if(coins >= 100){
        document.getElementById("itemErr").classList.add("hide");
        event.target.setAttribute("src", "Pictures/soldout.png");
        event.target.removeAttribute("onclick");
        clickers++;
        switch(purchase){
            case "foodbowl":
                newPet.hungerClicker++;
                items.push("Food bowl");
                document.getElementById("itemBag").innerText += " food bowl,";
                break;
            case "waterbottle":
                newPet.thirstClicker++;
                items.push("Water bottle");
                document.getElementById("itemBag").innerText += " water bottle,";
                break;
            case "mousetoy":
                newPet.happinessClicker++;
                items.push("Mouse toy");
                document.getElementById("itemBag").innerText += " mouse toy,";
                break;
        }
        coins -= 100;
        document.getElementById("coins").innerText = coins;
        document.getElementById("clickerNo").innerText = clickers;
    }
    else{
        document.getElementById("itemErr").classList.remove("hide");
    }
}

// onclick, adding coins, xp, taking care of pet, etc
function addCoin(){
    coins += newPet.lvl;
    // adding xp to pet
    newPet.xp++;
    if(newPet.xp == 1000){
        newPet.lvl++;
        newPet.xp = 0;
        document.getElementById("petLvl").innerText = newPet.lvl;
    }
    document.getElementById("xp").innerText = newPet.xp;
    document.getElementById("coins").innerText = coins;
    switch (careType){
        case "food":
            if(newPet.hunger <= 99)
                document.getElementById("hunger").innerText = ++newPet.hunger;
            break;
        case "water":
            if(newPet.thirst <= 99)
                document.getElementById("thirst").innerText = ++newPet.thirst;
            break;
        case "play":
            if(newPet.happiness <= 99)
                document.getElementById("happiness").innerText = ++newPet.happiness;
            break;
    }

}
// displaying pet based on player choice
function choosePet(pet){
    let display = document.getElementById("pet");
    let petImg = pet.getAttribute("src");
    display.setAttribute("src", petImg);
}

// evolving pet in exchange for coins
function evolve(event){
    if(!isNaN(newPet.stage) && coins < 100){
        document.getElementById("evoErr").classList.remove("hide");
    }
    else if(!isNaN(newPet.stage)){
        document.getElementById("evoErr").classList.add("hide");
        let target = event.target;
        let siblings = target.parentNode.childNodes;
        target.setAttribute("src", "Pictures/happycat.png")
        siblings[1].innerText = "Your pet is fully evolved!";
        siblings[5].innerText = "";

        let newSrc = "Pictures/" + newPet.base + (newPet.stage + 1) + ".png";
        document.getElementById("pet").setAttribute("src", newSrc);
        // addding lvl to pet
        newPet.lvl += 3;
        document.getElementById("petLvl").innerText = newPet.lvl;

        coins -= 100;
        document.getElementById("coins").innerText = coins;
    }

}
// changing whether player increases happiness, food, or water lvls
// with clicks
function changeCare(careName){
    let careTabs = document.getElementsByClassName("care");
    for(let i = 0; i < careTabs.length; i++){
        careTabs[i].classList.remove("activeTabLink");
    }
    document.getElementById(careName).classList.add("activeTabLink");
    careType = careName;
}

// function for tabs for stat display
function changeStatsTabs(event, tabName){
    var i, tabcontent, tablinks;
    
    tabcontent = document.querySelectorAll(".stats.tabcontent");
    for(i = 0; i < tabcontent.length; i++){
        tabcontent[i].style.display = "none";
    }

    tablinks = document.querySelectorAll(".stats.tablinks");
    for(i = 0; i < tablinks.length; i++){
        if(tablinks[i].innerText == tabName){
            tablinks[i].classList.add("activeTabLink");
        }
        else{
            tablinks[i].classList.remove("activeTabLink");

        }
    }

    document.getElementById(tabName).style.display = "block";
    
    event.currentTarget.classList.add("active");
}

// function for tabs for shop display
function changeShopTabs(event, tabName){
    var i, tabcontent, tablinks;
    
    tabcontent = document.querySelectorAll(".shop.tabcontent");
    for(i = 0; i < tabcontent.length; i++){
        tabcontent[i].style.display = "none";
    }

    tablinks = document.querySelectorAll(".shop.tablinks");
    for(i = 0; i < tablinks.length; i++){
        if(tablinks[i].innerText == tabName){
            tablinks[i].classList.add("activeTabLink");
        }
        else{
            tablinks[i].classList.remove("activeTabLink");

        }
        //tablinks[i].className = tablinks[i].className.replace("  active", "");
    }

    document.getElementById(tabName).style.display = "block";
    
    event.currentTarget.classList.add("active");
}

// Function to handle daily reward claims
function claimDailyReward(amount) {
    if (!newPet) {
        alert("You need to select a pet first!");
        return;
    }

    let lastClaimDate = localStorage.getItem("lastClaimDate") || "";
    let today = new Date().toISOString().split("T")[0];

    if (lastClaimDate === today) {
        alert("You can only claim one reward per day. Come back after reset time!");
        return;
    }

    newPet.addCoins(amount);
    localStorage.setItem("lastClaimDate", today);
}