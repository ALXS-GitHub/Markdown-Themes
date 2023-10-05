const blue = {
    color0: "#e3f2fd",
    color1: "#bbdefb",
    color2: "#90caf9",
    color3: "#64b5f6",
    color4: "#42a5f5",
    color5: "#2196f3",
    color6: "#1e88e5",
    color7: "#1976d2",
    color8: "#1565c0",
    color9: "#0d47a1",
    color10: "#002171",
    color11: "#001064",
    color0bg: "#e3f2fdbb",
    color1bg: "#bbdefbbb",
    color2bg: "#90caf9bb",
    color3bg: "#64b5f6bb",
    color4bg: "#42a5f5bb",
    color5bg: "#2196f3bb",
    color6bg: "#1e88e5bb",
    color7bg: "#1976d2bb",
    color8bg: "#1565c0bb",
    color9bg: "#0d47a1bb",
    color10bg: "#002171bb",
    color11bg: "#001064bb",
};

const pink = {
    color0: "#fce4ec",
    color1: "#f8bbd0",
    color2: "#f48fb1",
    color3: "#f06292",
    color4: "#ec407a",
    color5: "#e91e63",
    color6: "#d81b60",
    color7: "#c2185b",
    color8: "#ad1457",
    color9: "#880e4f",
    color10: "#560027",
    color11: "#3f003f",
    color0bg: "#fce4ecbb",
    color1bg: "#f8bbd0bb",
    color2bg: "#f48fb1bb",
    color3bg: "#f06292bb",
    color4bg: "#ec407abb",
    color5bg: "#e91e63bb",
    color6bg: "#d81b60bb",
    color7bg: "#c2185bbb",
    color8bg: "#ad1457bb",
    color9bg: "#880e4fbb",
    color10bg: "#560027bb",
    color11bg: "#3f003fbb",
};

const yellow = {
    color0: "#fff9c4",
    color1: "#fff59d",
    color2: "#fff176",
    color3: "#ffee58",
    color4: "#ffeb3b",
    color5: "#fdd835",
    color6: "#fbc02d",
    color7: "#f9a825",
    color8: "#f57f17",
    color9: "#ff6f00",
    color10: "#e65100",
    color11: "#bf360c",
    color0bg: "#fff9c4bb",
    color1bg: "#fff59dbb",
    color2bg: "#fff176bb",
    color3bg: "#ffee58bb",
    color4bg: "#ffeb3bbb",
    color5bg: "#fdd835bb",
    color6bg: "#fbc02dbb",
    color7bg: "#f9a825bb",
    color8bg: "#f57f17bb",
    color9bg: "#ff6f00bb",
    color10bg: "#e65100bb",
    color11bg: "#bf360cbb",
};

document.Color = class {
    constructor() {
        this.color = blue;
        this.applyTheme();
    }
    applyTheme() {
        const root = document.documentElement;
        for (const [key, value] of Object.entries(this.color)) {
            console.log(`${key}: ${value}`);
            root.style.setProperty(`--${key}`, value);
        }
    }
    setColor(color) {
        if (color == undefined || color == null) {
            color = blue;
        }

        this.color = color;
        this.applyTheme();
    }
};

document.color = new document.Color();


