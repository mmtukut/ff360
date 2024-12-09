import Reveal from 'reveal.js';

class PresentationBuilder {
    private deck: any;

    constructor() {
        this.initializeDeck();
    }

    private initializeDeck() {
        this.deck = new Reveal({
            controls: true,
            progress: true,
            center: true,
            hash: true,
            transition: 'slide'
        });
        
        this.deck.initialize();
    }

    addSlide(content: string) {
        const slide = document.createElement('section');
        slide.innerHTML = content;
        document.querySelector('.slides').appendChild(slide);
    }

    buildPresentation() {
        // Title Slide
        this.addSlide(`
            <h1>FastFind360</h1>
            <h3>Revolutionizing Product Discovery</h3>
        `);

        // Problem Slide
        this.addSlide(`
            <h2>The Problem</h2>
            <ul>
                <li>73% abandon searches</li>
                <li>2.5 hours comparing prices</li>
                <li>$4.6B annual losses</li>
            </ul>
        `);

        // Continue adding other slides...
    }
} 