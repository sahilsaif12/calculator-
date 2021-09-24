let time = document.getElementsByClassName('time')[0]
let tower = document.getElementsByClassName('tower')[0]
let battery = document.getElementsByClassName('battery')[0]
let spread = document.getElementsByClassName('spread')[0]
let bText = document.getElementsByClassName('text')[0]

//@ ----- time ------
setInterval(() => {
    let curTime = new Date()
    let h = curTime.getHours()
    let m = curTime.getMinutes()
    let x = h > 12 ? 'PM' : 'AM'
    if (m < 10) {
        m = "0" + m
    }
    if (h > 12) {
        h = h % 12
    }
    time.innerHTML = `${h}: ${m} ${x}`
}, 1000);

//@ ----- network-----
for (let i = 0; i < 4; i++) {
    tower.innerHTML += `<div class='block' style='--i:${i + 1};'></div>`
}

//@ ---- battery ----
setInterval(() => {
    navigator.getBattery().then((battery) => {
        spread.style.width = Math.floor(battery.level * 100) + "%"
        bText.innerHTML = Math.floor(battery.level * 100) + "%"
    })
}, 100);


//@---- btn clicked----
let number = document.querySelectorAll('.number')
for (let i = 0; i < number.length; i++) {
    number[i].addEventListener('click', () => {
        number[i].classList.add('clicked')
        setTimeout(() => {
            number[i].classList.remove('clicked')
        }, 300);
    })
}
let opr_button = document.querySelectorAll('.operator , .del , .bracket')
for (let i = 0; i < opr_button.length; i++) {
    opr_button[i].addEventListener('click', () => {
        if (opr_button[i].innerHTML == "(" || opr_button[i].innerHTML == ")" || opr_button[i].innerHTML == "Del") {
            opr_button[i].style.boxShadow = "inset 1px 1px 0 1px rgba(255, 255, 255, 0.299) ,inset -1px -1px 0 2px rgba(0, 0, 0, 0.849),0 0 13px rgba(0, 0, 0)"
            setTimeout(() => {
                opr_button[i].style.boxShadow = "inset 1px 1px 0 1px rgba(255, 255, 255, 0.299) ,inset -1px -1px 0 2px rgba(0, 0, 0, 0.849)"
            }, 200);
        }
        else {
            opr_button[i].style.boxShadow = " 0 0 20px rgba(0, 0, 0)"
            setTimeout(() => {
                opr_button[i].style.boxShadow = "none"
            }, 200);
        }

    })
}

//@ ------functionality------
let screen = document.getElementsByClassName('screen')[0]
for (let i = 0; i < number.length; i++) {
    // screen.innerHTML=""
    number[i].addEventListener('click', () => {
        if (number[i].innerHTML == "C") {
            screen.innerHTML = ""
        }
        else {
            screen.innerHTML += number[i].innerHTML
        }
    })
}
for (let i = 0; i < opr_button.length; i++) {
    opr_button[i].addEventListener('click', () => {
        if (opr_button[i].innerHTML == "Del") {
            if (screen.innerHTML.endsWith(" ")) {
                screen.innerHTML = screen.innerHTML.slice(0, -2)
            }
            else {
                screen.innerHTML = screen.innerHTML.slice(0, -1)
            }
        }
        else if (opr_button[i].innerHTML == "=") {
            let arr = screen.innerHTML.split(" ")
            screen.innerHTML = main(arr)
        }
        else {
            screen.innerHTML += " " + opr_button[i].innerHTML + " "
        }
    })
}
function main(arr) {
    if (arr.includes("÷") == true) {
        let i = arr.indexOf("÷")
        return (divide(Number(arr[i - 1]), Number(arr[i + 1])))
    }
    if (arr.includes("%") == true && arr.includes("×") == true) {
        let i = arr.indexOf("%")
        return per(Number(arr[i - 3]), Number(arr[i - 1]));
    }
    if (arr.includes("×") == true) {
        let i = arr.indexOf("×")
        return mul(Number(arr[i - 1]), Number(arr[i + 1]));
    }
    if (arr.includes("-") == true) {
        let i = arr.indexOf("-")
        return sub(Number(arr[i - 1]), Number(arr[i + 1]));
    }
    if (arr.includes("+") == true) {
        let i = arr.indexOf("+")
        return sum(Number(arr[i - 1]), Number(arr[i + 1]));
    }
    
}

function divide(x, y) {
    if (y == 0) {
        return "infinity"
    }
    else {
        return (x / y)
    }
}
function mul(x, y) {
    return (x * y)
}
function sub(x, y) {
    return (x - y)
}
function sum(x, y) {
    return (x + y)
}
function per(x, y) {
    console.log(x,y);
    return (x * y/100)
}
