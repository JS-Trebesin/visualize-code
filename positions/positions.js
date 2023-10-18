const boxes = {
    first: document.getElementById("first-box"),
    second: document.getElementById("second-box"),
    third: document.getElementById("third-box"),
}

const dropdowns = {
    first: document.getElementById("dropdown-first-box"),
    second: document.getElementById("dropdown-second-box"),
    third: document.getElementById("dropdown-third-box"),
}

const resetButton = document.getElementById("reset"),
    marginButton = document.getElementById("marginOnOff")

resetButton.addEventListener("click", resetSettings)

const selects = document.querySelectorAll(".select")

selects.forEach(selectInput => {
    selectInput.addEventListener("change", () => {
        let selectedOption = selectInput.value
        switch (selectInput.id) {
            case "position-select-one":
                boxes.first.style.position = selectedOption
                break
            case "position-select-two":
                boxes.second.style.position = selectedOption
                break
            case "position-select-three":
                boxes.third.style.position = selectedOption
                break
        }
    })
})

const radios = document.querySelectorAll(".input-direction")

const ranges = document.querySelectorAll("input[type='range']")
ranges.forEach(rangeInpt => {
    rangeInpt.addEventListener("input", () => {
        let parent = rangeInpt.parentElement
        let uncle = parent.previousElementSibling
        let cousinInput = uncle.firstElementChild
        let cousinSelect = uncle.querySelector("select")
        let cousinRangeValue = uncle.querySelector(".range-value")
        let box = findWhichBoxBelongsTo(rangeInpt) // first second third
        let direction = findWhichRadioIsSet(cousinInput) // top bottom left right
        let unit = cousinSelect.value
        unit = unit === "percent" ? "%" : unit
        cousinRangeValue.innerText = rangeInpt.value
        console.log(direction)
        console.log(boxes[box])
        console.log(`${rangeInpt.value}${unit}`)
        switch (direction) {
            case "top":
                boxes[box].style.top = `${rangeInpt.value}${unit}`
                break
            case "bottom":
                boxes[box].style.bottom = `${rangeInpt.value}${unit}`
                break
            case "left":
                boxes[box].style.left = `${rangeInpt.value}${unit}`
                break
            case "right":
                boxes[box].style.right = `${rangeInpt.value}${unit}`
                break
        }
    })
})

function findWhichRadioIsSet(target) {
    let whatradio = target.getAttribute("value")
    let whatIsChecked = "nothing"
    switch (whatradio) {
        case "Top":
            if (target.checked) {
                whatIsChecked = "top"
            } else {
                whatIsChecked = "bottom"
            }
            break
        case "Left":
            if (target.checked) {
                whatIsChecked = "left"
            } else {
                whatIsChecked = "right"
            }
            break
        default:
            console.log("dunno what belongs here")
    }
    return whatIsChecked
}

// goes up the tree to find element that containts custom data-belongs value
// which then says which box should be selected
function findWhichBoxBelongsTo(target) {
    let elem = target

    while (elem && elem !== document.body) {
        if (elem.hasAttribute("data-belongs")) {
            return elem.getAttribute("data-belongs")
        }
        elem = elem.parentElement
    }
}

const positionSwitches = document.querySelectorAll(".position-switch")

positionSwitches.forEach(button => {
    button.addEventListener("click", e => {
        selectedBox = boxes[findWhichBoxBelongsTo(e.target)]
        console.log("hi")
        console.log(e.target.innerText)
        selectedBox.style.position = e.target.innerText
    })
})

// Dropdown Event Listeners

dropdowns.first
    .querySelector(".dropdown-text-icon")
    .addEventListener("click", () => {
        selectBox("first")
    })

dropdowns.second
    .querySelector(".dropdown-text-icon")
    .addEventListener("click", () => {
        selectBox("second")
    })

dropdowns.third
    .querySelector(".dropdown-text-icon")
    .addEventListener("click", () => {
        selectBox("third")
    })

function openAndCloseDropdown(dropdown) {
    let dropdownContent = dropdown.querySelector(".dropdown-content")
    let dstyle = getComputedStyle(dropdownContent)
    let visibilityValue = dstyle.visibility

    if (visibilityValue === "hidden") {
        dropdownContent.style.opacity = "1"
        dropdownContent.style.visibility = "visible"
        dropdown.style.marginBottom = "15em"
    } else if (visibilityValue === "visible") {
        dropdownContent.style.opacity = "0"
        dropdownContent.style.visibility = "hidden"
        dropdown.style.marginBottom = "0.6em"
    } else {
        console.log("Some unexpected shit has happened")
    }
}

// Boxes Event Listeners
boxes.first.addEventListener("click", selectFirst)
boxes.second.addEventListener("click", selectSecond)
boxes.third.addEventListener("click", selectThird)
let selectedBox = boxes.first
let previouslySelected = boxes.second

selectBox("first")

function selectBox(target) {
    previouslySelected = selectedBox
    selectedBox = boxes[target]
    highlightSelectedBox()
    openAndCloseDropdown(dropdowns[target])
    openAndCloseDropdown(
        dropdowns[previouslySelected.getAttribute("data-boxno")]
    )
}

highlightSelectedBox()

// stuff below no longer correct id or id at all
// Position switch Event Listeners
// staticSwitch.addEventListener("click", switchToStatic)
// relativeSwitch.addEventListener("click", switchToRelative)
// fixedSwitch.addEventListener("click", switchToFixed)
// absoluteSwitch.addEventListener("click", switchToAbsolute)
// stickySwitch.addEventListener("click", switchToSticky)

// stuff below no longer correct id or id at all
// Direction switch Event Listeners
// leftInput.addEventListener("keypress", switchLeft)
// topInput.addEventListener("keypress", switchTop)
// rightInput.addEventListener("keypress", switchRight)
// botInput.addEventListener("keypress", switchBot)

function resetSettings() {
    boxes.first.removeAttribute("style")
    boxes.second.removeAttribute("style")
    boxes.third.removeAttribute("style")
}

function selectFirst() {
    selectBox("first")
    highlightSelectedBox()
}

function selectSecond() {
    selectBox("second")
    highlightSelectedBox()
}

function selectThird() {
    selectBox("third")
    highlightSelectedBox()
}

function highlightSelectedBox() {
    previouslySelected.classList.remove("selected")
    selectedBox.classList.add("selected")
}
