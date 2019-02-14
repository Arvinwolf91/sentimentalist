import * as sentiment from 'sentiment';
import axios from 'axios';

export class Analyzer {
    static analyze(phrase) {
        // Make sure nativeLog is defined and is a function
        if (typeof nativeLog === 'function') {
            nativeLog(`Analyzing '${phrase}'`);
        }

        const result = sentiment(phrase);
        return result.score;
    }

    callAPI() {
        axios.get('http://www.recipepuppy.com/api/?i=onions,garlic&q=omelet&p=3')
        .then(response => {
            if (typeof nativeLog === 'function') {
                nativeLog(`Pet title '${response.data.title}'`);
            }
            return response.data.title;
        })
        .catch(error => {
            console.log(error);
            return 'API Call Failed!';
        });
    }
}
