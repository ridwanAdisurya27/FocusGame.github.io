

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