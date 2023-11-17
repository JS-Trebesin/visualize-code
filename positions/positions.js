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

selects.forEach((selectInput) => {
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

function stretchForSticky(position) {}

const radios = document.querySelectorAll(".input-direction")

const ranges = document.querySelectorAll("input[type='range']")
ranges.forEach((rangeInpt) => {
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
                boxes[box].style.bottom = ""
                boxes[box].style.top = `${rangeInpt.value}${unit}`
                break
            case "bottom":
                boxes[box].style.top = ""
                boxes[box].style.bottom = `${rangeInpt.value}${unit}`
                break
            case "left":
                boxes[box].style.right = ""
                boxes[box].style.left = `${rangeInpt.value}${unit}`
                break
            case "right":
                boxes[box].style.left = ""
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

positionSwitches.forEach((button) => {
    button.addEventListener("click", (e) => {
        selectedBox = boxes[findWhichBoxBelongsTo(e.target)]
        selectedBox.style.position = e.target.innerText
    })
})

Object.values(dropdowns).forEach((dropdown) => {
    dropdown
        .querySelector(".dropdown-text-icon")
        .addEventListener("click", () => {
            if (
                dropdown.getAttribute("data-belongs") !==
                selectedBox.getAttribute("data-boxno")
            ) {
                selectBox(dropdown.getAttribute("data-belongs"))
            } else {
                if (dropdown.getAttribute("data-closed") === "false") {
                    closeDropdown(dropdown)
                } else {
                    openDropdown(dropdown)
                }
            }
        })
})

function openDropdown(dropdown) {
    let dropdownContent = dropdown.querySelector(".dropdown-content")
    // let dstyle = getComputedStyle(dropdownContent)
    // let visibilityValue = dstyle.visibility
    dropdownContent.style.opacity = "1"
    dropdownContent.style.visibility = "visible"
    dropdown.style.marginBottom = "15em"
    dropdown.setAttribute("data-closed", "false")
}

function closeDropdown(dropdown) {
    let dropdownContent = dropdown.querySelector(".dropdown-content")
    dropdownContent.style.opacity = "0"
    dropdownContent.style.visibility = "hidden"
    dropdown.style.marginBottom = "0.6em"
    dropdown.setAttribute("data-closed", "true")
}

function closeOtherDropdowns(dropdown) {
    let opened = dropdown
    let toClose = []
    Object.values(dropdowns).forEach((droppy) => {
        if (droppy === opened) {
            return
        }
        toClose.push(droppy)
    })
    toClose.forEach((closified) => {
        closeDropdown(closified)
        boxes[closified.getAttribute("data-belongs")].classList.remove(
            "selected"
        )
    })
}

// Boxes Event Listeners
boxes.first.addEventListener("click", selectFirst)
boxes.second.addEventListener("click", selectSecond)
boxes.third.addEventListener("click", selectThird)
let selectedBox = boxes.first

selectBox("first")

function selectBox(target) {
    selectedBox = boxes[target]
    highlightSelectedBox()
    openDropdown(dropdowns[target])
    closeOtherDropdowns(dropdowns[target])
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
    selectedBox.classList.add("selected")
}
