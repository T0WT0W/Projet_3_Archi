axios.get('http://localhost:5678/api/works')
  .then(function (response) {
    const works = response.data
    categoryFilters(null)

  axios.get('http://localhost:5678/api/categories')
  .then(function (response) {
    const categories = response.data
  })

  function categoryFilters (event) {
    if(event)
      console.log(event.target.dataset.id)
    let gallery = document.getElementById("gallery")
    gallery.innerHTML = ""
 
    for (let work of works) {
        let nouvelleFigure = document.createElement('figure')
        let image = document.createElement('img')
        image.src = work.imageUrl
        let figcaption = document.createElement('figcaption')
        figcaption.textContent = work.title
        gallery.append(nouvelleFigure)
        nouvelleFigure.append(image)
        nouvelleFigure.append(figcaption)
        }
      }

  let aFilters = document.querySelectorAll("a.filters");

  Array.from(aFilters).forEach(btn=>
      btn.addEventListener("click", categoryFilters)
  )
})
