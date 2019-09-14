console.log('Client side javascript file is loaded')

//obtaining the search data from the form and storing in a variable
const weatherForm = document.querySelector('form')

//provides access to search and gives us the value input
const search = document.querySelector('input')

const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")
//messageOne.textContent = 'From JS'

//adds event listener to the form to only get data on submit
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()//stops the default behaviour of refreshing the browser which removes all data
    
    //obtains the value submitted in the search field
    const location = search.value
    
    //refreshes the two html paragraphs to remove current text
    messageOne.textContent = ""
    messageTwo.textContent = ""

    //fetch api is a function which provides access to the browser
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {

        //fetches the json data and parses it
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })

    })
    
})