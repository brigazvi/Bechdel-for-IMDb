async function getData(titleId) {
  const res = await fetch(
    `https://bechdeltest.com/index.pl/api/v1/getMovieByImdbId?imdbid=${titleId}`
  ).catch((err) => console.log("error: ", err.status, err.description, err))

  const data = await res.json()
  return data
}

function getImdbId() {
  const titleId = document.URL.slice(
    document.URL.indexOf("/tt") + 3,
    document.URL.lastIndexOf("/")
  )
  return titleId
}

function createBadge(rating, id) {
  // insert material icons to the header
  const googleMaterialIconsLink = document.createElement("link")
  googleMaterialIconsLink.rel = "stylesheet"
  googleMaterialIconsLink.href =
    "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
  document.head.append(googleMaterialIconsLink)

  // find the correct place for the badge:
  const place = document.querySelector(".kkLqLt")

  // create link wrapper:
  const a = document.createElement(`a`)
  a.href = `https://bechdeltest.com/view/${id}`
  place.append(a)

  // create badge container:
  const badge = document.createElement("div")
  badge.style.padding = "8px"
  badge.style.display = "flex"
  badge.style.flexWrap = `wrap`
  badge.style.alignItems = `center`
  badge.style.borderBottom = "solid 2px"
  badge.style.borderTop = "solid 2px"
  a.append(badge)

  // create icon:
  const icon = document.createElement("span")
  icon.innerHTML = `<span class="material-symbols-outlined" style="margin-inline-end:-4px">woman</span><span class="material-symbols-outlined" style="margin-inline-start:-4px">woman</span>`
  icon.style.display = `flex`

  // create headline:
  const headline = document.createElement("span")
  headline.style.padding = "0px 8px"
  headline.style.fontSize = `14px`
  headline.style.color = `white`
  headline.style.fontWeight = `700`

  // create text:
  const text = document.createElement("span")
  text.style.padding = "0px 8px"
  text.style.fontSize = `14px`
  text.style.color = `white`
  text.style.fontWeight = `300`
  text.style.flexGrow = `1`

  // adjust content to rating:
  if (rating === 3) {
    headline.innerText = "This title pass the Bechdel-Wallace test"
    text.innerText = `This title has two named female characters that talk to each other about something that isn't a male character.`
    badge.style.borderColor = `rgb(87, 255, 87)`
    icon.style.color = "rgb(87, 255, 87)"
  } else if (rating < 3) {
    headline.innerText = "This title doesn't pass the Bechdel-Wallace test"
  }
  if (rating === 2) {
    badge.style.borderColor = `rgb(255, 216, 73)`
    icon.style.color = "rgb(255, 216, 73)"
    text.innerText = `This title has two named female characters that talk to each other, but it's about a male character.`
  } else if (rating === 1) {
    badge.style.borderColor = "rgb(255, 123, 70)"
    icon.style.color = "rgb(255, 123, 70)"
    text.innerText = `This title has two named female characters, but they don't talk to each other.`
  } else if (rating === 0) {
    badge.style.borderColor = "rgb(255, 56, 56)"
    icon.style.color = "rgb(255, 56, 56)"
    text.innerText = `This title doesn't have two named female characters.`
  }
  badge.append(icon, headline, text)
}

const imdbId = getImdbId()
getData(imdbId).then((data) => {
  if (data.rating !== undefined) {
    createBadge(data.rating, data.id)
  }
})
