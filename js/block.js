class Block {
    constructor(x, m, v, h, scl, cnt) {
        this.x = x;
        this.mass = m;
        this.vel = v;
        this.originalVel = v;
        this.originalX = x;
        this.height = h;
        this.scale = scl;
        this.cnt = cnt;
    }

    init() {
        var root = document.getElementById("root");
        this.block = document.createElement("div");

        this.block.id = "block" + this.cnt;
        this.block.style.height = `${this.height * this.scale}px`;
        this.block.style.width = `${this.height * this.scale}px`;
        this.block.style.position = "absolute";
        this.block.style.bottom = 0;
        this.block.style.left = this.originalX + "px";
        this.block.style.backgroundColor = "black"; // Initial block color

        // Create an element to display the mass
        this.massLabel = document.createElement("span");
        this.massLabel.style.position = "absolute";
        this.massLabel.style.top = "-20px";  // Positioning the label above the block
        this.massLabel.style.left = "50%";
        this.massLabel.style.transform = "translateX(-50%)";
        this.massLabel.style.color = "#000"; // Text color
        this.massLabel.style.fontWeight = "bold";
        this.massLabel.innerText = `Mass: ${this.mass}`;
        this.block.appendChild(this.massLabel);

        root.append(this.block);
    }

    display() {
        this.block.style.left = this.x + "px";
    }

    update() {
        this.x += this.vel;
    }

    colide(other) {
        if (
            this.x + this.height * this.scale < other.x ||
            other.x + other.height * other.scale < this.x
        ) {
            return false;
        } else {
            this.changeAppearance(); // Change appearance on collision
            other.changeAppearance(); // Change the other block's appearance too

            // Show mass of both blocks
            this.showMass();
            other.showMass();

            return true;
        }
    }

    hit(other) {
        var sumM = this.mass + other.mass;
        var newV = ((this.mass - other.mass) / sumM) * this.vel;
        newV += ((2 * other.mass) / sumM) * other.vel;
        return newV;
    }

    hitWall() {
        const root = document.getElementById("root");
        const rootWidth = root.offsetWidth;

        // Check if the block is about to hit the left or right boundary of the root container
        if (this.x <= 0 || this.x + this.height * this.scale >= rootWidth) {
            return true;
        }
        return false;
    }

    setVel(v) {
        this.vel = v;
    }

    setMass(m) {
        this.mass = m;
        this.massLabel.innerText = `Mass: ${this.mass}`; // Update mass label
    }

    setHeight(h) {
        this.block.style.height = `${h * this.scale}px`;
        this.block.style.width = `${h * this.scale}px`;
        this.height = h;
    }

    reset() {
        this.block.parentNode.removeChild(this.block);
        this.x = this.originalX;
        this.vel = this.originalVel;
    }

    changeAppearance() {
        // Change shape to apple and update color
        this.block.classList.add("apple");

        // Randomly change color after collision
        const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        this.block.style.backgroundColor = randomColor;
    }

    showMass() {
        // Make sure the mass label is visible and updated
        this.massLabel.style.display = "block";
        this.massLabel.innerText = `Mass: ${this.mass}`;
    }
}
