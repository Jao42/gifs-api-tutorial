const catImg = document.querySelector('img')
const loading = document.querySelector('.loading')
const button = document.querySelector('main button')
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
  link = await fetch(
  apiLink + searchTerm, {
    mode: 'cors'
    })
    .then((res, err) => {
      if (err) {
        return err
      }
      else {
        data = res.json()
        return data 
      }
    })
    .then((data) => {
      if (data['data']['images'] === undefined) {
        throw new Error("ImageNotFound")
      }
      else {
        url = data['data']['images']['downsized_medium']['url']
        return url
      }
    })

  return link
}

getGifUrl(searchTerm).then((url => catImg.src = url))

termSubmitButton.addEventListener('click', () => {
  if (termInput.value) {
    fallbackSearchTerm = searchTerm
    searchTerm = termInput.value
  }
})

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    loading.textContent = 'Loading...'
    getGifUrl(searchTerm)
      .then((url) => { 
        catImg.src = url
        loading.textContent = ''
      })
      .catch((err) => {
        if (err.message === 'ImageNotFound') {
          loading.textContent = 'We can\'t find a gif with this term :(.' +
            ' Try search another thing :)'
          searchTerm = fallbackSearchTerm
        }
        else {
          loading.textContent = 'A thing not expected occurs... :/'
        }
      })
  })
})
