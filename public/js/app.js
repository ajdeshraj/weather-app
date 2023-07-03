console.log('Running Client Side JavaScript')

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = searchElement.value
    console.log(location)
    const url = 'http://localhost:3000/weather?address=' + location

    // Clearing content of the two paragraph tags
    messageOne.textContent = 'Loading... '
    messageTwo.textContent = ''

    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            }
            else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.description + '. Temperature is ' + data.temperature + '. Feels like ' + data.feelsLike
            }
        })
    })
})
