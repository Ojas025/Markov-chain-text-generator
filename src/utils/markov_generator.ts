export type gram = {
    [key: string]: string[]
};

export const populateFrequency = (text: string, order: number = 1) => {
    const ngrams: gram = {}

    for (let i = 0; i <= text.length - order; i++){
        const gram = text.substring(i,i + order);
        
        if (!ngrams[gram]){
            ngrams[gram] = [];
        }
        
        // Insert the next character
        ngrams[gram].push(text.charAt(i + order));
    }

    return ngrams;
}   

export const predict = (text: string, start: number, ngrams: gram | null, order: number) => {

    if (!ngrams) return;

    const currentGram = text.substring(start,start + order);

    console.log(ngrams);

    const possibilities = ngrams[currentGram];

    console.log(possibilities);

    const index = Math.floor(Math.random() * possibilities.length);
    const next = possibilities[index];
    
    const output: string = currentGram + next;
    return output;  
} 
