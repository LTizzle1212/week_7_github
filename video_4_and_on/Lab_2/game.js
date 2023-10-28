let randomCountryElement = document.querySelector('#random-country')
let userAnswerElement = document.querySelector('#user-answer')
let submitButton = document.querySelector('#submit-answer')
let resultTextElement = document.querySelector('#result')

// TODO finish the script to challenge the user about their knowledge of capital cities.
// An array country names and two-letter country codes is provided in the countries.js file. 
// Your browser treats all JavaScript files included with script elements as one big file,
// organized in the order of the script tags. So the countriesAndCodes array from countries.js
// is available to this script.

console.log(countriesAndCodes)  // You don't need to log countriesAndCodes - just proving it is available 



// TODO when the page loads, select an element at random from the countriesAndCodes array
// randomCountryElement = countriesAndCodes.length;
// let randomIndex = random() * randomCountryElement;
// let randomElement = randomCountryElement[randomIndex];
// console.log(randomElement)

let randomIndex = Math.floor(Math.random() * countriesAndCodes.length) // Math.random generate a float number 0-1
// Multiply this random number by the number of countires in the aray to expand the range
// number if I remove the digits after the decimal place
// Math.floor meants to round to the nearest whole number

let randomCountryData = countriesAndCodes[randomIndex]
console.log(randomCountryData)

let countryName = randomCountryData.name
randomCountryElement.innerHTML = countryName


let countryCode = randomCountryData['alpha-2']



submitButton.addEventListener('click', function() {
    // get user's answer
    let userAnswer = userAnswerElement.value


    let url = `https://api.worldbank.org/v2/country/${countryCode}?format=json`
    fetch(url).then( response => response.json()).then( worldBankData => {
        // deal with response here
        console.log(worldBankData)
        // data in the arrays in arrays
        let capitalCity = worldBankData[1][0]['capitalCity']
        console.log(capitalCity)

        if (capitalCity === userAnswer) { // this will display correct if the capital of that city is correct
            resultTextElement.innerHTML = 'Correct!'
        } else {
            resultTextElement.innerHTML = 'Sorry, the answer is ' + capitalCity
        }

    }).catch (err => console.error(err))

    // will need the alpha code from the countries, check 


})


// TODO display the country's name in the randomCountryElement 



// TODO add a click event handler to the submitButton.  When the user clicks the button,
//  * read the text from the userAnswerElement 

// submitButton.addEventListener('click', function() { // this adds the click event handler for submitButton
//     console.log ${`#user-answer`} // this will read the answer from userAnswerElement
// })





//  * Use fetch() to make a call to the World Bank API with the two-letter country code (from countriesAndCodes, example 'CN' or 'AF')
//  * Verify no errors were encountered in the API call. If an error occurs, display an alert message. 
// let errorCountry
// error(errorCountry) // intial call to function
// function error(errorCountry) {
//     alert('There was an error') // this will alert an error it fetchs to the url
// }

// let url = 'https://api.worldbank.org/v2/country/br?format=json' // this will fetch this URL
// fetch(url)
//     .then( (res) => res.json()) // this will fetch the two-letter country code
//     .then( (countryCode) => {
//         console.log(countryCode)
//         let codes = countryCode.iso2code
//         randomCountryElement.innerHTML = codes
//     })


//  * If the API call was successful, extract the capital city from the World Bank API response.


//  * Compare the actual capital city to the user's answer. 
//      You can decide how correct you require the user to be. At the minimum, the user's answer should be the same
//      as the World Bank data - make the comparison case insensitive.
//      If you want to be more flexible, include and use a string similarity library such as https://github.com/hiddentao/fast-levenshtein 
//  * Finally, display an appropriate message in the resultTextElement to tell the user if they are right or wrong. 
//      For example 'Correct! The capital of Germany is Berlin' or 'Wrong - the capital of Germany is not G, it is Berlin'





// TODO finally, connect the play again button. Clear the user's answer, select a new random country, 
// display the country's name, handle the user's guess. If you didn't use functions in the code you've 
// already written, you should refactor your code to use functions to avoid writing very similar code twice. 

// playAgainButton.addEventListener('click', function() { // this will clear the user's answer
//     resultTextElement.textContent = '';
// })