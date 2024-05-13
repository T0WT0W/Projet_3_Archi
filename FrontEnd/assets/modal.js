if (window.localStorage.getItem("token")){

    let modify = document.getElementById("modify")
    let cross = document.getElementById("cross")
    let cross2 = document.getElementById("cross2")
    let arrow = document.getElementById("arrow")
    let addPicture = document.getElementById("addPicture")

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

    function success() {
        let btnSelect = document.getElementById("addCat").options[document.getElementById('addCat').selectedIndex]
        let addTitle = document.getElementById("addTitle")
        let addPic = document.getElementById("addPic")

        if(addTitle.value==="" || btnSelect.text==="" || addPic.files.length===0) { 
               document.getElementById("validate").disabled = true; 
           } else { 
               document.getElementById("validate").disabled = false;
           }
       }

    const form = document.getElementById("form")
    form.addEventListener("submit", (event) => {
        event.preventDefault()

        let formData = new FormData()

        let nvPhoto = document.getElementById("addPic")
        let nvTitre = document.getElementById("addTitle")
        let nvCat = document.getElementById("addCat")
        
        let addPic = nvPhoto.files[0]
        let addTitle = nvTitre.value
        let addCat = nvCat.value
        
        formData.append("image", nvPhoto.files[0])
        formData.append("title", nvTitre.value)
        formData.append("category", nvCat.value)

        axios.post("http://localhost:5678/api/works", formData, {
            headers: {
                "Authorization": "Bearer "+window.localStorage.getItem("token"),
                "Content-Type": "multipart/form-data"
            }
        })
        .then (function (response){
            let work = response.data

            let content = document.getElementById("content")
            let divImg = document.createElement("div")
            divImg.setAttribute("class", `img work-${work.id}`)
            let img = document.createElement("img")
            img.setAttribute("src", work.imageUrl)
            let trash = document.createElement("a")
            trash.addEventListener("click", (event)=> {
              axios.delete(`http://localhost:5678/api/works/${work.id}`, {
                headers: {
                  "Authorization": "Bearer "+window.localStorage.getItem("token")
                }
              })
              .then (function (response){
                let deletedWork = document.querySelectorAll(`.work-${work.id}`)
                deletedWork.forEach(function(workDeleted) {
                  workDeleted.parentElement.removeChild(workDeleted)
                })
              }) 
            })
            
            let iconTrash = document.createElement("i")
            iconTrash.setAttribute("class", "fa-solid fa-trash-can")
      
            trash.append(iconTrash)
            divImg.append(img)
            divImg.append(trash)
            content.append(divImg)

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

            modal1.style.display = "none"
            modal2.style.display = "none"

            let preview = document.getElementById("imgPreview")
            preview.style.display = "none"
            preview.src = null
            document.getElementById("content-2").style.display = null

            nvTitre.value = ""
            nvCat.value = ""
        })
        .catch (function (error){
            console.log(error)
        })
    })

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