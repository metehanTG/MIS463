class DataList {
    constructor(containerId, inputId, listId, options) {
        this.containerId = containerId;
        this.inputId = inputId;
        this.listId = listId;
        this.options = options;
    }

    create(filter = "") {
        const list = document.getElementById(this.listId);
        const filterOptions = this.options.filter(
            d => filter === "" || d.text.includes(filter)
        );

        if (filterOptions.length === 0) {
            list.classList.remove("active");
        } else {
            list.classList.add("active");
        }

        list.innerHTML = filterOptions
            .map(o => `<li id=${o.value}>${o.text}</li>`)
            .join("");
    }

    addListeners(datalist) {
        const container = document.getElementById(this.containerId);
        const input = document.getElementById(this.inputId);
        const list = document.getElementById(this.listId);
        container.addEventListener("click", e => {
            if (e.target.id === this.inputId) {
                container.classList.toggle("active");
            } else if (e.target.id === "datalist-icon") {
                container.classList.toggle("active");
                input.focus();
            }
        });

        input.addEventListener("input", function (e) {
            if (!container.classList.contains("active")) {
                container.classList.add("active");
            }

            datalist.create(input.value);
        });

        list.addEventListener("click", function (e) {
            if (e.target.nodeName.toLocaleLowerCase() === "li") {
                input.value = e.target.innerText;
                container.classList.remove("active");
            }
        });
    }
}

const data = [
    { value: "1", text: "111 - 111" },
    { value: "2", text: "222 - 222" },
    { value: "3", text: "333 - 333" },
    { value: "4", text: "444 - 444" },
    { value: "5", text: "555 - 555" },
    { value: "6", text: "666 - 666" },
    { value: "7", text: "777 - 777" },
    { value: "8", text: "888 - 888" }
];

const datalist = new DataList(
    "datalist",
    "datalist-input",
    "datalist-ul",
    data
);
datalist.create();
datalist.addListeners(datalist);

const pageHeight = window.innerHeight;
const scrollDownButton = document.querySelector('.button-down');
scrollDownButton.addEventListener('click', function () {
    window.scroll({
        top: pageHeight,
        left: 0,
        behavior: 'smooth'
    });
})

const next1Button = document.querySelector('#next1');
next1Button.addEventListener('click', function () {
    window.scroll({
        top: pageHeight * 2,
        left: 0,
        behavior: 'smooth'
    });
})

const next2Button = document.querySelector('#next2');
next2Button.addEventListener('click', function () {
    window.scroll({
        top: pageHeight * 3,
        left: 0,
        behavior: 'smooth'
    });
})

const back1button = document.querySelector('#back1');
back1button.addEventListener('click', function () {
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
})


const back2button = document.querySelector('#back2');
back2button.addEventListener('click', function () {
    window.scroll({
        top: pageHeight,
        left: 0,
        behavior: 'smooth'
    });
})

function init() {
    const sliders = document.getElementsByClassName("tick-slider-input");

    for (let slider of sliders) {
        slider.oninput = onSliderInput;

        updateValue(slider);
        updateValuePosition(slider);

        setTicks(slider);
    }
}

function onSliderInput(event) {
    updateValue(event.target);
    updateValuePosition(event.target);
    updateLabels(event.target);
    updateProgress(event.target);
}


function updateValuePosition(slider) {
    let value = document.getElementById(slider.dataset.valueId);
    const percent = getSliderPercent(slider);

    const sliderWidth = slider.getBoundingClientRect().width;
    const valueWidth = value.getBoundingClientRect().width;
    const handleSize = slider.dataset.handleSize;

    let left = percent * (sliderWidth - handleSize) + handleSize / 2 - valueWidth / 2;

    left = Math.min(left, sliderWidth - valueWidth);
    left = slider.value === slider.min ? 0 : left;

    value.style.left = left + "px";
}

function setTicks(slider) {
    let container = document.getElementById(slider.dataset.tickId);
    const spacing = parseFloat(slider.dataset.tickStep);
    const sliderRange = slider.max - slider.min;
    const tickCount = sliderRange / spacing + 1; // +1 to account for 0

    for (let ii = 0; ii < tickCount; ii++) {
        let tick = document.createElement("span");

        tick.className = "tick-slider-tick";

        container.appendChild(tick);
    }
}

function onResize() {
    const sliders = document.getElementsByClassName("tick-slider-input");
    for (let slider of sliders) {
        updateValuePosition(slider);
    }
}

window.onload = init;
window.addEventListener("resize", onResize);    