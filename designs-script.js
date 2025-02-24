      document.addEventListener("DOMContentLoaded", () => {
    const loadingBar = document.getElementById("loading-bar");

    function startLoading() {
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            loadingBar.style.width = progress + "%";

            if (progress >= 100) {
                clearInterval(interval);
                console.log("Loading complete, showing dialog boxes...");
                
                showDialogsSequentially();
            }
        }, 300);
    }

    startLoading();
});

function showDialogsSequentially() {
    const totalDialogs = 12;
    let delay = 500; // Time gap between each dialog (in ms)

    for (let i = 0; i < totalDialogs; i++) {
        setTimeout(() => {
            createDialogBox();
        }, i * delay);  // Increases delay for each dialog
    }
}

function createDialogBox() {
    const images = [
        "black-swan.png", 
        "jordans.png", 
        "scooter.jpg", 
        "cosmos.png", 
        "kendrick.jpg",
        "minar.jpg",
        "rajbari.jpg",
        "talwiinder.jpg",
        "trying2.png",
        "weeknd.png",
        "temple.jpg"
    ]; 

    const randomImage = images[Math.floor(Math.random() * images.length)];

    const dialog = document.createElement("div");
    dialog.classList.add("dialog-box");
    dialog.style.position = "absolute";
    dialog.style.width = "300px";  // Medium size
    dialog.style.height = "auto";
    dialog.style.top = Math.random() * (window.innerHeight - 300) + "px";
    dialog.style.left = Math.random() * (window.innerWidth - 300) + "px";
    dialog.style.background = "#ADD8E6";
    dialog.style.border = "2px solid black";
    dialog.style.boxShadow = "5px 5px 10px rgb(202, 103, 119)";
    dialog.style.zIndex = "100"; // Base z-index

    dialog.addEventListener("mousedown", () => {
        document.querySelectorAll(".dialog-box").forEach(box => box.style.zIndex = "100");
        dialog.style.zIndex = "500"; // Bring clicked dialog to front
    });

    const header = document.createElement("div");
    header.classList.add("dialog-header");
    header.style.background = "#ADD8E6";
    header.style.color = "#444";
    header.style.padding = "5px 10px";
    header.style.display = "flex";
    header.style.justifyContent = "space-between";
    header.style.cursor = "grab";

    let isDragging = false, offsetX, offsetY;

    header.addEventListener("mousedown", (e) => {
        isDragging = true;
        offsetX = e.clientX - dialog.offsetLeft;
        offsetY = e.clientY - dialog.offsetTop;
        dialog.style.zIndex = "500"; // Bring to front
    });

    document.addEventListener("mousemove", (e) => {
        if (isDragging) {
            dialog.style.left = e.clientX - offsetX + "px";
            dialog.style.top = e.clientY - offsetY + "px";
        }
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
    });

    const title = document.createElement("span");
    title.textContent = "posters&more";

    const controls = document.createElement("div");
    controls.classList.add("dialog-controls");

    const minimize = document.createElement("button");
    minimize.textContent = "🗕";
    minimize.onclick = () => (dialog.style.display = "none");

    const maximize = document.createElement("button");
    maximize.textContent = "🗖";
    maximize.onclick = () => {
        dialog.style.width = "400px";
        dialog.style.height = "auto";
    };

    const close = document.createElement("button");
    close.textContent = "❌";
    close.onclick = () => dialog.remove();

    controls.appendChild(minimize);
    controls.appendChild(maximize);
    controls.appendChild(close);

    header.appendChild(title);
    header.appendChild(controls);

    const content = document.createElement("div");
    content.classList.add("dialog-content");
    content.style.padding = "10px";

    const img = document.createElement("img");
    img.src = randomImage;
    img.style.width = "100%";
    img.style.height = "auto";
    img.onerror = function () {
        console.error("Image failed to load:", randomImage);
        img.src = "default.jpg";
    };

    content.appendChild(img);

    dialog.appendChild(header);
    dialog.appendChild(content);

    document.body.appendChild(dialog);
}

document.addEventListener("DOMContentLoaded", function () {
    const gameboy = document.querySelector(".gameboy");
    
    gameboy.addEventListener("click", function () {
        gameboy.classList.toggle("on");
    });

    const spaceship = document.querySelector(".spaceship");
    if (spaceship) {
        spaceship.style.position = "absolute";  // Ensure absolute positioning
        spaceship.style.left = "0px";
        spaceship.style.maxWidth = "100%"; // Prevents it from overflowing
        spaceship.style.height = "auto"; // Maintains aspect ratio
        spaceship.style.objectFit = "contain"; // Ensures image is fully visible
    }
});
      function adjustLayout() {
          let screenWidth = window.innerWidth;
          let header = document.querySelector(".newspaper-header");
            let subheader = document.querySelector(".newspaper-subheader");

            if (screenWidth < 768) {
                header.style.fontSize = "2rem";
                subheader.style.fontSize = "1rem";
            } else if (screenWidth < 1024) {
                header.style.fontSize = "2rem";
                subheader.style.fontSize = "1.2rem";
            } else {
                header.style.fontSize = "5rem";
                subheader.style.fontSize = "1.5rem";
            }
        }
      window.addEventListener("resize", adjustLayout);
      window.addEventListener("DOMContentLoaded", adjustLayout);
