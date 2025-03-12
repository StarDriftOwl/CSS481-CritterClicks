
let choosers = document.querySelectorAll(".galleryCell");
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
        pet.onclick = addCoin;
    }

}
for(let i = 0; i < choosers.length; i++){
    choosers[i].onclick = () => choosePet(choosers[i]);
}


function addCoin(){
    console.log("add coin");
}
function choosePet(pet){
    let display = document.getElementById("pet");
    let petImg = pet.getAttribute("src");
    display.setAttribute("src", petImg);
}