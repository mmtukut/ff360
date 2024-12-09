import pptxgen from 'pptxgenjs';

class PowerPointBuilder {
    private pres;

    constructor() {
        this.pres = new pptxgen();
    }

    createTitleSlide() {
        let slide = this.pres.addSlide();
        
        slide.addText("FastFind360", {
            x: 1,
            y: 1,
            fontSize: 44,
            color: "2E3192"
        });

        slide.addText("Revolutionizing Product Discovery", {
            x: 1,
            y: 2,
            fontSize: 32,
            color: "666666"
        });
    }

    generatePresentation() {
        this.createTitleSlide();
        // Add other slides...
        
        // Save the presentation
        this.pres.writeFile("FastFind360-Pitch.pptx");
    }
} 