const availableFonts = ["kalam", "helvetica", "arial", "source-code-pro"];

document.Font = class {
    constructor() {
        this.title = "source-code-pro";
        this.body = "source-code-pro";
        this.formula = "source-code-pro";
        this.mermaid = "source-code-pro";
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
            font = "source-code-pro";
        }

        font = font.toLowerCase();

        if (!availableFonts.includes(font)) {
            font = "source-code-pro";
        }

        this.title = font;
        this.applyTheme();
    }

    setBodyFont(font) {
        if (font == null || font == undefined) {
            font = "source-code-pro";
        }

        font = font.toLowerCase();

        if (!availableFonts.includes(font)) {
            font = "source-code-pro";
        }

        this.body = font;
        this.applyTheme();
    }

    setFormulaFont(font) {
        if (font == null || font == undefined) {
            font = "source-code-pro";
        }

        font = font.toLowerCase();

        if (!availableFonts.includes(font)) {
            font = "source-code-pro";
        }

        this.formula = font;
        this.applyTheme();
    }

    setMermaidFont(font) {
        if (font == null || font == undefined) {
            font = "source-code-pro";
        }

        font = font.toLowerCase();

        if (!availableFonts.includes(font)) {
            font = "source-code-pro";
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