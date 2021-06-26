const catImg = document.querySelector('img')
const loading = document.querySelector('.loading')
const button = document.querySelector('main button')
const termInput = document.querySelector('.search input')
const termSubmitButton = document.querySelector('.search button')
const buttons = document.querySelectorAll('button')

let searchTerm = 'cats'


async function getGifUrl(searchTerm) {
   link = await fetch('https://api.giphy.com/v1/gifs/translate?api_key=0g9MebyVxmWGUhwVDxLPCHJ9Vqci9gCk&s='+searchTerm, {
    mode: 'cors'
    })
    .then((res, err) => {
      if (err) {
        console.log(err)
      }
      else {
        data = res.json()
        return data 
      }
    })
    .then(data => {
      url = data['data']['images']['downsized_medium']['url']
      return url
    })
  return link
}

getGifUrl(searchTerm).then((url => catImg.src = url))

termSubmitButton.addEventListener('click', () => {
  if (termInput.value) {
    searchTerm = termInput.value
  }
  else {
    return false
  }
})

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    loading.textContent = 'Loading...'
    getGifUrl(searchTerm).then((url) => {
      catImg.src = url
      loading.textContent = ''
    })
  })
})


