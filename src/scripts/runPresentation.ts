import { PresentationBuilder } from '../presentation/presentation';

async function runPresentation() {
    const builder = new PresentationBuilder();
    await builder.buildPresentation();
    console.log('Presentation ready!');
}

runPresentation().catch(console.error); 