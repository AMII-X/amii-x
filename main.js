AOS.init({
    duration: 800,
    once: true,
    easing: 'ease-in-out-quad'
});

[...Array(100).keys()].forEach(() => {
    balls = document.createElement("div");
    balls.className = "balls"
    balls.style.marginTop = (Math.random() * (window.innerHeight*0.95 - balls.offsetHeight)) + "px"
    balls.style.marginLeft = (Math.random() * (window.innerWidth - balls.offsetWidth)) + "px"
    document.body.prepend(balls);
})

document.body.querySelector("header > section > div:nth-child(2) > div:nth-child(2)").onclick = () => window.location.href = "mailto:contactinterinstitut.amiix@gmail.com"
document.body.querySelector("header > section > div:nth-child(2) > div:nth-child(3)").onclick = () => window.location.href = "#bureau"

window.addEventListener("scroll", (e) => {
    if (!window.scrollY) {
        document.querySelector(".logo").style.filter = "invert(7%) sepia(26%) saturate(537%) hue-rotate(65deg) brightness(96%) contrast(110%)";
        document.querySelector("header").style.backgroundColor = "rgba(0, 0, 0, 0)"
    } else {
        document.querySelector(".logo").style.filter = "";
        document.querySelector("header").style.backgroundColor = "#243B33"
    }
})

Object.values(document.querySelectorAll(".sponsors > *")).forEach((sponsor) => {
    let i = 1;
    sponsor.addEventListener("onmousemove", (e) => {
        if (i) {
            i--
            text = document.createElement("p")
            text.textContent = sponsor.dataset.sponsor
            sponsor.prepend(text)
        }
    })

    sponsor.addEventListener("onmousemove", (e) => {
        if (!i) {
            i++
            sponsor.querySelector(p).remove()
        }
    })
})

bureau = {"members": [
    {
        "name": "M. Jean",
        "description": "a cool guy",
        "role": "President",
        "image": "jean.jpg"
    },
    {
        "name": "M. Jean",
        "description": "a cool guy",
        "role": "President",
        "image": "jean.jpg"
    },
    {
        "name": "M. Jean",
        "description": "a cool guy",
        "role": "President",
        "image": "jean.jpg"
    },
    {
        "name": "M. Jean",
        "description": "a cool guy",
        "role": "President",
        "image": "jean.jpg"
    },
    {
        "name": "M. Jean",
        "description": "a cool guy",
        "role": "President",
        "image": "jean.jpg"
    },
    {
        "name": "M. Jean",
        "description": "a cool guy",
        "role": "President",
        "image": "jean.jpg"
    },
    {
        "name": "M. Jean",
        "description": "a cool guy",
        "role": "President",
        "image": "jean.jpg"
    },
    {
        "name": "M. Jean",
        "description": "a cool guy",
        "role": "President",
        "image": "jean.jpg"
    },
    {
        "name": "M. Jean",
        "description": "a cool guy",
        "role": "President",
        "image": "jean.jpg"
    }
], "items": []}

bureau_creation = (member, index) => {
    memberr = document.createElement("div")
    img_container = document.createElement("div")
    img = document.createElement("img")
    img.href = `images/${member.image}`
    img.alt = member.name
    img_container.append(img)
    memberr.append(img_container)
    namee = document.createElement("h4")
    namee.textContent = member.name
    memberr.append(namee)
    description = document.createElement("p")
    description.textContent = member.description
    memberr.append(description)
    role = document.createElement("p")
    role.textContent = member.role
    memberr.append(role)
    memberr.dataset.index = index + 1
    return memberr
}

bureau.members.forEach((member, index) => {
    document.querySelector("#bureauscrollContainer").append(bureau_creation(member, index))
})

let lastIndex = 0;

document.getElementById("bureauscrollContainer").addEventListener("scrollend", () => {
    const scrollLeft = document.getElementById("bureauscrollContainer").scrollLeft;
    const viewportWidth = document.querySelector("#bureauscrollContainer > div").clientWidth ;

    const index = Math.round(scrollLeft / viewportWidth);

    if (index !== lastIndex) {
        if (index > lastIndex) {
            console.log("Scrolled Right ➡️ (Now on Page " + (index + 1) + ")");
            adding_elements = bureau.members.slice(lastIndex, index)
            adding_elements.forEach((member, index) => {
                document.querySelector("#bureauscrollContainer").append(bureau_creation(member, index))
            })
        } else {
            console.log("Scrolled Left ⬅️ (Now on Page " + (index + 1) + ")");
            removing_elements = bureau.members.slice(index, lastIndex)
            removing_elements.forEach((member, index) => {
                document.querySelector("#bureauscrollContainer").prepend(bureau_creation(member, index))
            })
        }
        lastIndex = index;
    }
});


current_cell = document.querySelectorAll("#bureau_qqs > div")[0];
cell_index = 0;

Object.values(document.querySelectorAll("#bureau_qqs > div")).forEach((cell, i) => {
    cell.addEventListener("click", () => {
        if (current_cell) current_cell.classList.remove("active");
        cell.classList.add("active")
        current_cell = cell
        document.getElementById("quotes").scrollBy({ left: (i - cell_index)*window.innerWidth/2, behavior: "smooth" });
        cell_index = i;
    })
})