// Data Station
const Array_paten= [1,2,3,4,5,6,7,8,9];
let array = [];

// Undisplayed program

function Random(){
    while (array.length > 0) {
        array.pop();
    }
    console.log("array kosong " + array);
    while(array.length <= 8) {
        let rand = Array_paten[Math.floor(Math.random()*Array_paten.length)];
        if(array.includes(rand) == false){
            array.push(rand);
        }
    }
    $("div .grid").each(function(index){
        $(this).text(array[index]);
    })
}

// aside right function
let spin = 0;
$("#social-btn").on("click", function () {
    if(spin == 0){
        $("#social-btn").css("animation","roll-up 2s linear")
        console.log("roll-up");
        spin = 1;
    } else {
        $("#social-btn").css("animation","roll-down 2s linear")
        console.log("roll-down");
        spin = 0;
    }
})

$("#highscore").on("click", Random);