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
let fallbackSearchTerm

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

async function buttonsHandle(searchTerm) {
  return await getGifUrl(searchTerm)
  .then((url) => { 
    catImg.src = url
    return 'success'
  })
  .catch((err) => {
    if (err.message === 'imageNotFound') {
      searchTerm = fallbackSearchTerm
      return err.message
    }
    else {
     return 'errorNotExpected' 
    }
  })
}

getGifUrl(searchTerm).then((url => catImg.src = url))
termSubmitButton.addEventListener('click', () => {
  loading.textContent = 'loading...'
  if (termInput.value) {
    buttonsHandle(termInput.value).then(messageText => {
      messageText === 'success' ? searchTerm = termInput.value : ''
      loading.textContent = messages[messageText]
    })
  }
})
otherGifButton.addEventListener('click', () => {
  loading.textContent = 'loading...'
  buttonsHandle(searchTerm).then(messageText => {
    loading.textContent = messages[messageText]
  })
})
