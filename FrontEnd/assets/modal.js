if (window.localStorage.getItem("token")){

    let modify = document.getElementById("modify")
    let cross = document.getElementById("cross")
    let cross2 = document.getElementById("cross2")
    let arrow = document.getElementById("arrow")
    let addPicture = document.getElementById("addPicture")

    // navigation entre modales et sortie modale par la croix
    modify.addEventListener("click", (event)=> {
        modal1.style.display = null
    })

    cross.addEventListener("click", (event)=> {
        modal1.style.display = "none"
    })

    cross2.addEventListener("click", (event)=> {
        modal2.style.display = "none"
    })

    addPicture.addEventListener("click", (event)=> {
        modal1.style.display = "none"
        modal2.style.display = null
    })

    arrow.addEventListener("click", (event)=> {
        modal1.style.display = null
        modal2.style.display = "none"    
    })

    // active le bouton "valider" de la seconde modale si tous les éléments sont sélectionnés
    function success() {
        let btnSelect = document.getElementById("addCat").options[document.getElementById('addCat').selectedIndex]
        let addTitle = document.getElementById("addTitle")
        let addPic = document.getElementById("addPic")

        if(addTitle.value==="" || btnSelect.value==="none" || addPic.files.length===0) { 
               document.getElementById("validate").disabled = true; 
           } else { 
               document.getElementById("validate").disabled = false;
           }
       }

    const form = document.getElementById("form")
    form.addEventListener("submit", event => {
        event.preventDefault()

        let formData = new FormData()

        let nvPhoto = document.getElementById("addPic")
        let nvTitre = document.getElementById("addTitle")
        let nvCat = document.getElementById("addCat")
        
        formData.append("image", nvPhoto.files[0])
        formData.append("title", nvTitre.value)
        formData.append("category", nvCat.value)

        // envoie à l'API le nv work crée
        axios.post("http://localhost:5678/api/works", formData, {
            headers: {
                "Authorization": "Bearer "+window.localStorage.getItem("token"),
                "Content-Type": "multipart/form-data"
            }
        })
        .then (function (response){
            let work = response.data

            // affiche le nv work dans la première modale
            let content = document.getElementById("content")
            let divImg = document.createElement("div")
            divImg.setAttribute("class", `img work-${work.id}`)
            let img = document.createElement("img")
            img.setAttribute("src", work.imageUrl)
            let trash = document.createElement("a")

            // supprime le work au clic sur la poubelle
            trash.addEventListener("click", (event)=> {
                callDeleteWork(work)
            })
            
            // crée la poubelle sur le nv work
            let iconTrash = document.createElement("i")
            iconTrash.setAttribute("class", "fa-solid fa-trash-can")
      
            trash.append(iconTrash)
            divImg.append(img)
            divImg.append(trash)
            content.append(divImg)

            // affiche le nv work dans la section gallerie
            let gallery = document.getElementById("gallery")
            let nouvelleFigure = document.createElement("figure")
            nouvelleFigure.setAttribute("class", `work-${work.id}`)
            let image = document.createElement("img")
            image.src = work.imageUrl
            let figcaption = document.createElement("figcaption")
            figcaption.textContent = work.title
            gallery.append(nouvelleFigure)
            nouvelleFigure.append(image)
            nouvelleFigure.append(figcaption)

            // cache les modales
            modal1.style.display = "none"
            modal2.style.display = "none"

            // vide l'image
            let preview = document.getElementById("imgPreview")
            preview.style.display = "none"
            preview.src = null
            document.getElementById("content-2").style.display = null

            // vide les input
            nvTitre.value = ""
            nvCat.value = ""
        })
        .catch (function (error){
            console.log(error)
        })
    })

    // affiche l'image sélectionnée et cache les input
    function fileUploaded() {
        let input = document.getElementById("addPic")
        let preview = document.getElementById("imgPreview")
        preview.src = URL.createObjectURL(input.files[0])

        if(addPic.files.length===1) {
            preview.style.display = null
            document.getElementById("content-2").style.display = "none"
        }
    }
}