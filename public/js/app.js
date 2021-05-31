let weatherForm = document.querySelector('form')
let search = document.querySelector('input')
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



