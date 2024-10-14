const baseURL = "https://66fb75a68583ac93b40bd367.mockapi.io/users";
//class + promise + fetch

class FastHttp {
    send(method, url, body = null) {
        return fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: body ? JSON.stringify(body) : null,
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(response.statusText);
            }
        })
    }
    get(url) {
        return this.send("GET", url);
    }
    delete(url) {
        return this.send("DELETE", url);
    }
    post(url, body) {
        return this.send("POST", url, body);
    }
    put(url, body) {
        return this.send("PUT", url, body);
    }
}

let instance = new FastHttp();
instance
    // .get(baseURL)
    // .delete(`${baseURL}/2`)
    // .post(baseURL, {name:"Tài chó điên"})
    .put(`${baseURL}/11`, { name: "Tài chó điên 2" })
    .then(value => {
        console.log(value);
    }).catch(error => {
        console.log(error);
    })