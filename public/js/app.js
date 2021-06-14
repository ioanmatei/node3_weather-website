let weatherForm = document.querySelector('#address-form')
let search = document.querySelector('input')
let locationButton = document.querySelector('#send-location')
const messageOne = document.querySelector('#p1')
const messageTwo = document.querySelector('#p2')
const messageThree = document.querySelector('#p3')

const data = {}
weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const address = search.value
    const url = `/weather?address=${address}`
    messageOne.textContent = 'Loading...'
    if (!address) {
        messageOne.textContent = 'Please provide an address'
        messageTwo.textContent = ''
        messageThree.textContent = ''
    } else {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    messageOne.textContent = data.error
                    search.value = ''
                    messageTwo.textContent = ''
                    messageThree.textContent = ''
                } else {
                    messageOne.textContent = ''
                    messageTwo.textContent = data.location
                    messageThree.textContent = data.forecast
                    search.value = ''
            }
        })
    }
})

locationButton.addEventListener('click', (event) =>  {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser!')
    }
    navigator.geolocation.getCurrentPosition((position) => {  
        const {latitude, longitude} = position.coords

        const url = `/weather?latitude=${latitude}&longitude=${longitude}`
        messageOne.textContent = 'Loading...'
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data.error) {
                        messageOne.textContent = data.error
                        search.value = ''
                        messageTwo.textContent = ''
                        messageThree.textContent = ''
                    } else {
                        messageOne.textContent = ''
                        messageTwo.textContent = 'At your current location'
                        messageThree.textContent = data.forecast
                        search.value = ''
                }
            })
        
    })
})






