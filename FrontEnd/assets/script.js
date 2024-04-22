axios.get('http://localhost:5678/api/works')
  .then(function (response) {
    const works = response.data
    let gallery = document.getElementById("gallery")
    let nouvelleFigure = document.createElement('figure')
    let image = document.createElement('img')
    image.src = "assets/images/hotel-first-arte-new-delhi.png"
    let figcaption = document.createElement('figcaption')
    figcaption.textContent = "Hotel First Arte - New Delhi"

    gallery.append(nouvelleFigure)
    nouvelleFigure.append(image)
    nouvelleFigure.append(figcaption)

    for (let work of works) {
        console.log(work.title)
    }




  })