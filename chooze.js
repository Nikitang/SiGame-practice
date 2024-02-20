import readline from 'readline-sync';

const choozing = () => {

    const MIN_VALUE = 100;
    const MAX_VALUE = 500;
    const STEP = 100;

    let sliderValue = 100;

    const drawSlider = (value) => {
        let slider = "[";
        for (let i = 0; i <= MAX_VALUE; i += STEP) {
            if (value >= i && value < i + STEP) {
                slider += value.toString().padStart(3, "0");
            } else {
                slider += "---";
            }
        }
        slider += "]";
        console.clear(); 
        console.log(slider);
    }

    drawSlider(sliderValue);

    while (true) {
        const input = readline.keyIn('Выберите кол-во очков\nНажмите "x" для увеличения значения или "z" для уменьшения, "q" для выхода: ', { hideEchoBack: true, mask: '', limit: 'xzq' });

        if (input === 'q') {
            console.log(`Selected value: ${sliderValue}`);
            return sliderValue;
            
        }

        if (input === 'x') {
            sliderValue += STEP;
        } else if (input === 'z') {
            sliderValue -= STEP;
        }

        if (sliderValue < MIN_VALUE) {
            sliderValue = MIN_VALUE;
        } else if (sliderValue > MAX_VALUE) {
            sliderValue = MAX_VALUE;
        }

        drawSlider(sliderValue);
    }

};

export default choozing;