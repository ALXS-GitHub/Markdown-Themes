const availableColors = ["blue", "red", "green", "yellow", "purple", "orange", "pink", "white"];

document.Color = class {
    constructor() {
        this.color = "blue";
        this.numberOfColors = 12;
        this.applyTheme();
    }
    applyTheme() {
        const root = document.documentElement;
        const rootStyle = getComputedStyle(root);
        for (let i = 0; i < this.numberOfColors; i++) {
            var colorI = rootStyle.getPropertyValue(`--${this.color}${i}`);
            var colorIBG = rootStyle.getPropertyValue(`--${this.color}${i}bg`);
            if (colorI != null && colorI != undefined) {
                root.style.setProperty(`--color${i}`, colorI);
            }
            if (colorIBG != null && colorIBG != undefined) {
                root.style.setProperty(`--color${i}bg`, colorIBG);
            }
        }
    }
    setColor(color) {

        if (!availableColors.includes(color)) {
            color = "blue";
        }

        if (color == undefined || color == null) {
            color = "blue";
        }

        this.color = color;
        this.applyTheme();
    }
};