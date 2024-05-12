const form = document.querySelector('form')

form.addEventListener("submit", (event) => {
    event.preventDefault()
    const data = new FormData(event.target)
    let login = Object.fromEntries(data.entries())

    axios.post('http://localhost:5678/api/users/login', login)
    .then(function (response) {
        window.location.href='index.html'
        window.localStorage.setItem("token", response.data.token)
      })
      .catch(function (error) {
        alert("L'email ou le mot de passe est invalide")
      })
})