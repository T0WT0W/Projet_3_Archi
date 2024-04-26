// appelle les works de l'API
axios.get('http://localhost:5678/api/works')
  .then(function (response) {
    let works = response.data
    categoryFilters(null)

  // appelle les catégories de l'API
  axios.get('http://localhost:5678/api/categories')
  .then(function (response) {
    const categories = response.data
    // rajouter la création des éléments HTML des catégories (for(let category of categories)...)
  })

  // Fonction qui permet d'afficher les works selon une catégorie (ou pas)
  function categoryFilters (event) {
    // récupère la galerie et supprime tous ses éléments
    let gallery = document.getElementById("gallery")
    gallery.innerHTML = ""
    
    // récupère le numéro de la catégorie si l'event en trouve un 
    const categoryId = event ? event.target.getAttribute("data-id"): null
    // si j'ai une catégorie, alors je filtre mes works
    const memoriesWorks = categoryId ? works.filter(w => w.categoryId == categoryId): works

    // boucle les works, qu'ils soient filtrés ou pas
    for (let work of memoriesWorks) {
        // créer les éléments HTML
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

  // récupère tous les éléments "button.filters" du HTML
  let buttonFilters = document.querySelectorAll("button.filters");

  // boucle sur tous les button récupérés
  Array.from(buttonFilters).forEach((btn)=> {
    // attribue l'événement "écoute le clic" à chacun de mes button, pour chaque clic exécute la fonction "catégoryFilters"
    btn.addEventListener("click", (event)=> categoryFilters(event))
  })
})
