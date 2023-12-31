const catImg = document.querySelector('img')
const loading = document.querySelector('.loading')
const otherGifButton = document.querySelector('main button')
const termInput = document.querySelector('.search input')
const termSubmitButton = document.querySelector('.search button')
const buttons = document.querySelectorAll('button')
const key = '0g9MebyVxmWGUhwVDxLPCHJ9Vqci9gCk'  
const apiLink = 'https://api.giphy.com/v1/gifs/translate?api_key='
  + key +
  '&s='

let searchTerm = 'cats'

async function getGifUrl(searchTerm) {
  const req = await fetch(
    apiLink + searchTerm, {
      mode: 'cors'
    })
  const resBody = await req.json()

  if (resBody['data']['images'] === undefined) {
    throw new Error("imageNotFound")
  }
  else {
    const gifUrl = resBody['data']['images']['downsized_medium']['url']
    return gifUrl
  }
}

messages = {
  success: '',
  imageNotFound: 'We can\'t find a gif with this term :(.' +
        ' Try search another thing :)',
  errorNotExpected: 'A thing not expected occurs... :/'
}

function statusHandler(searchTerm) {
  return getGifUrl(searchTerm)
  .then((url) => { 
    catImg.src = url
    return 'success'
  })
  .catch((err) => {
    if (err.message === 'imageNotFound') {
      return err.message
    }
    else {
     return 'errorNotExpected' 
    }
  })
}

function newSearchDOMStuff() {
  loading.textContent = 'loading...'
  if (termInput.value) {
    statusHandler(termInput.value).then(status => {
      if (status === 'success') {
        searchTerm = termInput.value
        termInput.value = ''
      }
      loading.textContent = messages[status]
    })
  }
}

getGifUrl(searchTerm).then((url => catImg.src = url))

termSubmitButton.addEventListener('click', () => {
  newSearchDOMStuff()
})

otherGifButton.addEventListener('click', () => {
  loading.textContent = 'loading...'
  statusHandler(searchTerm).then(status => {
    loading.textContent = messages[status]
  })
})

termInput.addEventListener('keypress', (e) => { 
  e.keyCode === 13 ? newSearchDOMStuff() : ''
  })





