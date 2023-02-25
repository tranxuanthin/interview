var like = document.querySelector('.like');
like.addEventListener('click', function (event) {
    var listJoke = getCookie('listJoke');
    let arr = listJoke.split(',').map(Number);
    let joke_id = arr[arr.length - 1];
    let react = 1;
    var details = {
        'joke_id': joke_id,
        'react': react,
    };
    var formBody = [];
    for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch('http://localhost:8001/react', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
    })
    .then(() => {
        var details = {
            'listJoke': listJoke,
        };
        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
    
        return fetch('http://localhost:8001/getJoke', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formBody
        })
    })
    .then((response) => response.json())
    .then((data) => {
        document.querySelector('.joke p').innerHTML = data.content;
        document.cookie = 'listJoke='+listJoke + ',' + data.id;
    }
    )
    .catch((err)=>{
        document.querySelector('.joke p').innerHTML = "That's all the jokes for today! Come back another day!";
    })
});

var dislike = document.querySelector('.dislike');
dislike.addEventListener('click', function (event) {
    var listJoke = getCookie('listJoke');
    let arr = listJoke.split(',').map(Number);
    let joke_id = arr[arr.length - 1];
    let react = 0;
    var details = {
        'joke_id': joke_id,
        'react': react,
    };
    var formBody = [];
    for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch('http://localhost:8001/react', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
    })
    .then(() => {
        var details = {
            'listJoke': listJoke,
        };
        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
    
        return fetch('http://localhost:8001/getJoke', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formBody
        })
    })
    .then((response) => response.json())
    .then((data) => {
        document.querySelector('.joke p').innerHTML = data.content;
        document.cookie = 'listJoke='+listJoke + ',' + data.id;
    }
    )
    .catch((err)=>{
        document.querySelector('.joke p').innerHTML = "That's all the jokes for today! Come back another day!";
    })
});

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}