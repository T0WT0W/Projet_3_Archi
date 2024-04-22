axios.get('http://localhost:5678/api/works')
  .then(function (response) {
    const works = response.data
    let gallery = document.getElementById("gallery")
 
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
  })