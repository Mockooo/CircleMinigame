// Mady by Mocko

// All Variables
let Hardest = 1450;
let Easyest = 1250;
let minspeed = 0;
let maxspeed = 10;

let waitbeforeStart = 1000;
let waitinbetweeenround = 1000;
let OnGoing = false;

let speed = 0;

let MinRotation = 0;
let MaxRotation = 0;
let PlayerRotation = 0;
let CenterRotation = 359;
let Playing = null;

// Message Listener
window.addEventListener("message", (event) => {

    let data = event.data;
    let action = data.action;

    switch(action){
        case "setup": 
            minspeed = data.minspeed;
            maxspeed = data.maxspeed;
            Hardest = data.Hardest;
            Easyest = data.Easyest;
            break;
        case "start":
            rounds = data.rounds;
            trys = data.trys;
            waitbeforeStart = data.wait1;
            waitinbetweeenround = data.wait2;
            OnGoing = data.ongoing;
            Start();
            break;
        case "stop":
            End(false);
            break;
    }
})

// OnCLick and on KeyDown Event
document.onclick = function (data) {
    if (Playing == null) { return; }
    if (SeeifWin()) {
        Spot();
        if (OnGoing) {
            CenterRotation = PlayerRotation-1;
            clearInterval(Playing);
            Playing = null;
            setTimeout(() => {
                if (!Playing) {
                    Playing = setInterval(Player, speed);
                }
            } , waitinbetweeenround);
        } else {
            PlayerRotation = 0;
            $("#Player").css("rotate", PlayerRotation+"deg");
            clearInterval(Playing);
            Playing = null;
            setTimeout(() => {
            if (!Playing) {
                Playing = setInterval(Player, speed);
            }
            } , waitinbetweeenround);
        }
    } else {
        Spot();
        PlayerRotation = 0;
        $("#Player").css("rotate", PlayerRotation+"deg");
        clearInterval(Playing);
        Playing = null;
        setTimeout(() => {
            if (!Playing) {
                Playing = setInterval(Player, speed);
            }
        }, waitinbetweeenround);
    }
    return;
}

document.onkeydown = function (data) {
    if (Playing == null) { return; }
    if (data.which == 32) { // Space
        if (SeeifWin()) {
            Spot();
            if (OnGoing) {
                CenterRotation = PlayerRotation-1;
                clearInterval(Playing);
                Playing = null;
                setTimeout(() => {
                    if (!Playing) {
                        Playing = setInterval(Player, speed);
                    }
                } , waitinbetweeenround);
            } else {
                PlayerRotation = 0;
                $("#Player").css("rotate", PlayerRotation+"deg");
                clearInterval(Playing);
                Playing = null;
                setTimeout(() => {
                if (!Playing) {
                    Playing = setInterval(Player, speed);
                }
                } , waitinbetweeenround);
            }
        } else {
            Spot();
            PlayerRotation = 0;
            $("#Player").css("rotate", PlayerRotation+"deg");
            clearInterval(Playing);
            Playing = null;
            setTimeout(() => {
                if (!Playing) {
                    Playing = setInterval(Player, speed);
                }
            }, waitinbetweeenround);
        }
        return;
    }
};

Start();
// Functions
function Start() {
    $("#container").append(`
        <div class="Texts">
            <div class="Wraper">
                <div class="Speed">10</div>
                <div class="Description">SPD</div>
            </div>
        </div>
        <svg viewBox="0 0 500 500">
            <circle r="225" cx="250" cy="250" id="background" ></circle>
            <circle r="225" cx="250" cy="250" id="Spot" ></circle>
            <circle r="225" cx="250" cy="250" id="Player" ></circle>
        </svg>
    `);
    $("body").fadeIn("fast")
    Spot();
    setTimeout(() => {
        if (!Playing) {
            Playing = setInterval(Player, speed);
        }
    }, waitinbetweeenround);
}

function Spot() {
    var diffuculty = Math.round(Math.random()*(Hardest-Easyest)+Easyest);
    var Rotation =  Math.round(Math.random()*320);
    MinRotation = Rotation-5;
    MaxRotation = Rotation+GetMaxRotation(diffuculty);
    speed = Math.floor(Math.random()*(maxspeed-minspeed)+minspeed);
    $("#Spot").css("stroke-dashoffset", diffuculty);
    $("#Spot").css("rotate", Rotation+"deg");
    if (MaxRotation > CenterRotation) { CenterRotation = MaxRotation+5; }
    $(".Speed").text((speed-10)*(-1));
}

function Player() {
    PlayerRotation++;
    if (OnGoing) {
        if (PlayerRotation === 360) {
            PlayerRotation = 0;
        }
        if (PlayerRotation === CenterRotation) {
            if (trys > 0) {
                trys--;
            } else {
                End(false);
            }
        }
    } else {
        if (PlayerRotation === 360) {
            Spot();
            PlayerRotation = 0;
            clearInterval(Playing);
            Playing = null;
            setTimeout(() => {
                if (!Playing) {
                    Playing = setInterval(Player, speed);
                }
            }, waitbeforeStart);
        }
    }
    $("#Player").css("rotate", PlayerRotation+"deg");
}

function SeeifWin() {
    if (PlayerRotation-MinRotation > 0) {
        if (PlayerRotation-MinRotation < MaxRotation-MinRotation) {
            return true;
        }
    }
    return false;
}

function GetMaxRotation(diffuculty) {
    let dummy = (Hardest-diffuculty);
    let dummy2 = 0;
    if (dummy > 150) {
        dummy2 -= 5;
    }
    if (dummy < 100) {
        dummy2 += 5;
    }
    if (dummy < 60) {
        dummy2 += 5;
    }
    if (dummy < 10) {
        dummy2 -= 1;
    }
    while (dummy >= 10) {
        dummy = dummy-10;
        dummy2 += 3.5;
    }
    while (dummy > 0) {
        dummy = dummy-1;
        dummy2 += 0.5;
    }
    return dummy2;
}
