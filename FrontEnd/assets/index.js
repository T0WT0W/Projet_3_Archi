let works, categories

// fonction de supprésion des work
function callDeleteWork(work) {
  axios.delete(`http://localhost:5678/api/works/${work.id}`, {
    headers: {
      "Authorization": "Bearer " + window.localStorage.getItem("token")
    }
  })
    .then(function (response) {
      // let deletedWork = document.querySelectorAll(`.work-${work.id}`)
      // deletedWork.forEach((element) => {
      //   element.remove()
      // })

      let modalWork = document.querySelector(`div.work-${work.id}`)
      let galleryWork = document.querySelector(`figure.work-${work.id}`)

      modalWork.parentNode.removeChild(modalWork)
      galleryWork.parentNode.removeChild(galleryWork)
    })
}

// Fonction qui permet d'afficher les works selon une catégorie (ou pas)
function categoryFilters(event) {
  // récupère la galerie et supprime tous ses éléments
  let gallery = document.getElementById("gallery")
  gallery.innerHTML = ""

  // récupère le numéro de la catégorie si l'event en trouve un 
  const categoryId = event ? event.target.getAttribute("data-id") : null
  // si j'ai une catégorie, alors je filtre mes works
  const memoriesWorks = categoryId ? works.filter(w => w.categoryId == categoryId) : works

  // boucle les works, qu'ils soient filtrés ou pas
  for (let work of memoriesWorks) {
    // crée les éléments HTML
    let nouvelleFigure = document.createElement("figure")
    nouvelleFigure.setAttribute("class", `work-${work.id}`)
    let image = document.createElement("img")
    image.src = work.imageUrl
    let figcaption = document.createElement("figcaption")
    figcaption.textContent = work.title
    gallery.append(nouvelleFigure)
    nouvelleFigure.append(image)
    nouvelleFigure.append(figcaption)
  }
}

// appelle les works de l'API
axios.get('http://localhost:5678/api/works')
  .then(function (response) {
    works = response.data
    categoryFilters(null)

    let content = document.getElementById("content")

    // boucle les works dans la 1ere modale
    for (let work of works) {
      let divImg = document.createElement("div")
      divImg.setAttribute("class", `img work-${work.id}`)
      let img = document.createElement("img")
      img.setAttribute("src", work.imageUrl)
      let trash = document.createElement("a")
      trash.addEventListener("click", (event) => {
        callDeleteWork(work)
      })

      // crée la poubelle sur les works existants
      let iconTrash = document.createElement("i")
      iconTrash.setAttribute("class", "fa-solid fa-trash-can")

      trash.append(iconTrash)
      divImg.append(img)
      divImg.append(trash)
      content.append(divImg)
    }

    document.getElementsByClassName("filters")[0].addEventListener("click", (event) => categoryFilters(event))
  })

// appelle les catégories de l'API
axios.get('http://localhost:5678/api/categories')
  .then(function (response) {
    categories = response.data

    let filtres = document.getElementById("filtres")
    let select = document.getElementById("addCat")

    // Associe les catégories aux boutons filtres
    for (let category of categories) {
      let nouveauButton = document.createElement("button")
      nouveauButton.innerText = category.name
      nouveauButton.setAttribute("data-id", category.id)
      nouveauButton.setAttribute("class", "filters")
      nouveauButton.addEventListener("click", (event) => categoryFilters(event))
      filtres.append(nouveauButton)

      // utilise les catégories récupérées de l'API ci-dessus pour le select
      let optionCat = document.createElement("option")
      optionCat.value = category.id
      optionCat.innerText = category.name
      select.append(optionCat)
    }
  })

// création du mode edition (si token)
if (window.localStorage.getItem("token")) {
  let edition = document.querySelector("body")
  let tplEdition = `<div class="edition"> 
    <a href="#"><i class="fa-regular fa-pen-to-square"></i>Mode édition</a>
    </div>`

  edition.insertAdjacentHTML("afterbegin", tplEdition)

  document.getElementById("filtres").style.display = "none"

  let btnModifyModal = document.getElementById("projets")
  let tplBtnModifyModal = `<a id="modify" href="#"><i class="fa-regular fa-pen-to-square"></i>modifier</a>`
  btnModifyModal.insertAdjacentHTML("beforeend", tplBtnModifyModal)

  // login et logout
  let liLogin = document.getElementById("login")
  liLogin.innerHTML = ""
  let logout = document.createElement("a")
  logout.textContent = "Logout"
  logout.addEventListener("click", function (event) {
    localStorage.removeItem("token")
    location.reload()
  })
  liLogin.append(logout)
}

// sortir de la modale au clic extérieur
let modal1 = document.getElementById("modal1")
let modal2 = document.getElementById("modal2")

document.addEventListener("click", function (event) {
  if (modal1.isSameNode(event.target)) (
    modal1.style.display = "none"
  )

  if (modal2.isSameNode(event.target)) (
    modal2.style.display = "none"
  )
})
