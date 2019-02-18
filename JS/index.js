import * as sentiment from 'sentiment';
import axios from 'axios';
import https from 'https';

export class Analyzer {
  static analyze(phrase) {
    // Make sure nativeLog is defined and is a function
    if (typeof nativeLog === 'function') {
      // nativeLog(`Analyzing '${phrase}'`);
    }

    const result = sentiment(phrase);
    return result.score;
  }

  static async callAPI() {
    await https.get('https://age-of-empires-2-api.herokuapp.com/api/v1/civilizations', (resp) => {
      let data = '';

      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        nativeLog(data);
        nativeLog('Yes');
      });
    }).on('error', (err) => {
      nativeLog(err);
      nativeLog('No');
    });

    /*
    axios.get('http://www.recipepuppy.com/api/?i=onions,garlic&q=omelet&p=3')
      .then(response => {
        nativeLog(response);
      })
      .catch(error => {
        nativeLog(error);
      });
      */

    /*
    try {
      const response = await axios.get('http://www.recipepuppy.com/api/?i=onions,garlic&q=omelet&p=3');
      nativeLog(response.data.title);
    } catch (error) {
      nativeLog(error);
    }
    */
  }
}
