const baseURL = "https://66fb75a68583ac93b40bd367.mockapi.io/users";
//class + promise + async await
class FastHttp {
    async send(method, url, body = null) {
        let response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: body ? JSON.stringify(body) : null,
        });
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(response.statusText);
        }
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
;(async () => {
    try {
        let data = await instance.put(`${baseURL}/10`, { name: "Tài chó điên 2" });
        console.log(data);
    } catch (error) {
        console.log(error);
    }
})();

// instance
//     .put(`${baseURL}/10`, { name: "Tài chó điên 2" })
//     .then(value => {console.log(value)})
//     .catch(error => {console.log(error)});


//api provinces




