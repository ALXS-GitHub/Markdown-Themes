const availableFonts = ["kalam", "helvetica", "arial"];

document.Font = class {
    constructor() {
        this.title = "kalam";
        this.body = "kalam";
        this.formula = "arial";
        this.mermaid = "kalam";
        this.applyTheme();
    }

    applyTheme() {
        const root = document.documentElement;
        const rootStyle = getComputedStyle(root);
        var title = rootStyle.getPropertyValue(`--font-${this.title}`);
        var body = rootStyle.getPropertyValue(`--font-${this.body}`);
        var formula = rootStyle.getPropertyValue(`--font-${this.formula}`);
        var mermaid = rootStyle.getPropertyValue(`--font-${this.mermaid}`);
        if (title != null && title != undefined) {
            root.style.setProperty(`--font-title`, title);
        }
        if (body != null && body != undefined) {
            root.style.setProperty(`--font-body`, body);
        }
        if (formula != null && formula != undefined) {
            root.style.setProperty(`--font-formula`, formula);
        }
        if (mermaid != null && mermaid != undefined) {
            root.style.setProperty(`--font-mermaid`, mermaid);
        }
    }

    setTitleFont(font) {
     
        if (font == null || font == undefined) {
            font = "kalam";
        }

        font = font.toLowerCase();

        if (!availableFonts.includes(font)) {
            font = "kalam";
        }

        this.title = font;
        this.applyTheme();
    }

    setBodyFont(font) {
        if (font == null || font == undefined) {
            font = "kalam";
        }

        font = font.toLowerCase();

        if (!availableFonts.includes(font)) {
            font = "kalam";
        }

        this.body = font;
        this.applyTheme();
    }

    setFormulaFont(font) {
        if (font == null || font == undefined) {
            font = "kalam";
        }

        font = font.toLowerCase();

        if (!availableFonts.includes(font)) {
            font = "kalam";
        }

        this.formula = font;
        this.applyTheme();
    }

    setMermaidFont(font) {
        if (font == null || font == undefined) {
            font = "kalam";
        }

        font = font.toLowerCase();

        if (!availableFonts.includes(font)) {
            font = "kalam";
        }

        this.mermaid = font;
        this.applyTheme();
    }

    setFont(font) {
        this.setTitleFont(font);
        this.setBodyFont(font);
        this.setFormulaFont(font);
        this.setMermaidFont(font);
    }

}