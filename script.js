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

let coins = 0;
let choosers = document.querySelectorAll(".galleryCell");
let clickers = 0;
let newPet = null;
let careType = "food";
let items = [];
document.getElementById("next").onclick = () => {
    let pet = document.getElementById("pet");
    let namePicker = document.getElementById("namePicker")
    if(pet.getAttribute("src") == "Pictures/blank.png" || namePicker.value == ""){
        document.querySelector(".errmsg").classList.remove("hide");
    }
    else{
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

function addCoin(){
    coins += newPet.lvl;
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
function choosePet(pet){
    let display = document.getElementById("pet");
    let petImg = pet.getAttribute("src");
    display.setAttribute("src", petImg);
}

function changeCare(careName){
    let careTabs = document.getElementsByClassName("care");
    for(let i = 0; i < careTabs.length; i++){
        careTabs[i].classList.remove("activeTabLink");
    }
    document.getElementById(careName).classList.add("activeTabLink");
    careType = careName;
}
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