
document.getElementById('btn').onclick = () => {


    fetch('/api/login', {
        credentials: 'include',
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    }).then(res => {
        console.log(res)
    })

}

// document.getElementById('login').onclick = () => {

//     let user = document.getElementById('user').value
//     let pass = document.getElementById('pass').value

//     data = { "username": user, "password": pass }


//     fetch('/api/login', {
//         method: 'POST',
//         mode: 'cors', // no-cors, *cors, same-origin
//         cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//         credentials: 'same-origin', // include, *same-origin, omit
//         headers: {
//             'Content-Type': 'application/json'
//             // 'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         referrerPolicy: 'no-referrer',
//         body: JSON.stringify(data)
//     }).then(res => {
//         console.log(res)
//     })

// }