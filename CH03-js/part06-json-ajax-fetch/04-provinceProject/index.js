const baseURL = "https://provinces.open-api.vn/api";
//class + promise + fetch

//Đảm nhận việc giao tiếp với server
class Http {
    get(url) {
        return fetch(url)
            .then(respone => {
                //kiểm tra kiện hàng nếu ok = true ngược lại thì báo lỗi
                if (respone.ok) {
                    //Json trả về promise
                    return respone.json();
                } else throw new Error(respone.statusText);
            });
    }
}

//Đảm nhận việc trích xuất dữ liệu từ server
class Store {
    constructor() {
        this.http = new Http()
    }
    getProvinces() {
        return this.http.get(`${baseURL}/p`);//Promise<provinces>
    }// Ai gọi hàm thì sẽ nhận được Promise<provinces>
    getDistricts(provinceCode) {
        return this.http
            .get(`${baseURL}/p/${provinceCode}/?depth=2`)
            .then((provinceInfo) => {
                return provinceInfo.districts;
            });//Promise<district>
    }
    getWards(districtCode) {
        return this.http
            .get(`${baseURL}/d/${districtCode}/?depth=2`)
            .then((districtInfo) => {
                return districtInfo.wards;
            });//Promise<wards>
    }
}

//Đảm nhận việc render data lên giao diện
class RenderUI {
    renderProvinces(provinces) {
        let htmlContent = provinces.map((provinceItem) => {
            const { code, name } = provinceItem;
            return `<option value="${code}">${name}</option>`
        }).join("");
        document.querySelector("#province").innerHTML = htmlContent;
    }
    renderDistricts(districts) {
        let htmlContent = districts.map((districtItem) => {
            const { code, name } = districtItem;
            return `<option value="${code}">${name}</option>`
        }).join("");
        document.querySelector("#district").innerHTML = htmlContent;
    }

    renderWards(wards) {
        let htmlContent = wards.map((wardItem) => {
            const { code, name } = wardItem;
            return `<option value="${code}">${name}</option>`
        }).join("");
        document.querySelector("#ward").innerHTML = htmlContent;
    }

    renderInformation(information) {
        let htmlContent = "";
        for (const key in information) {
            htmlContent += information[key] ? `, ${information[key]}` : "";
        }
        htmlContent = htmlContent.slice(1);
        document.querySelector("#information").innerHTML = htmlContent;
    }
}

//Sự kiện load trang
document.addEventListener("DOMContentLoaded", (event) => {
    //Lấy danh sách province từ server và hiển thị
    let store = new Store();
    let ui = new RenderUI();
    store.getProvinces().then(provinces => {
        ui.renderProvinces(provinces);
        //lấy provinceCode của province hiện tại
        let provinceCode = document.querySelector("#province").value;
        //dùng provinceCode đi tìm danh sách các district của nó.
        return store.getDistricts(provinceCode)
    }).then((districts) => {
        ui.renderDistricts(districts);
        //lấy districCode của distric hiện tại
        let districCode = document.querySelector("#district").value;
        //dùng dùng districtCode tìm danh sách ward và hiển thị
        return store.getWards(districCode);
    }).then(wards => {
        ui.renderWards(wards);
    })
})

//Sự kiện thay đổi province
document.querySelector("#province").addEventListener("change", (event) => {
    let store = new Store();
    let ui = new RenderUI();
    //lấy mã provinceCode sau khi thay đổi
    let provinceCode = document.querySelector("#province").value;
    store.getDistricts(provinceCode).then((districts) => {
        ui.renderDistricts(districts);
        //lấy districCode của distric hiện tại
        let districCode = document.querySelector("#district").value;
        //dùng dùng districtCode tìm danh sách ward và hiển thị
        return store.getWards(districCode);
    }).then(wards => {
        ui.renderWards(wards);
    })
})

//Sự kiện thay đổi district
document.querySelector("#district").addEventListener("change", (event) => {
    let store = new Store();
    let ui = new RenderUI();
    //lấy mã districtCode sau khi thay đổi
    let districtCode = document.querySelector("#district").value;
    store.getWards(districtCode)
        .then(wards => {
            ui.renderWards(wards);
        })
})

//Bắt sự khiện submit(bấm chuột vào nút đặt hàng || enter)
document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    let address = document.querySelector("#address").value;
    let province = document.querySelector("#province option:checked").innerHTML;
    let district = document.querySelector("#district option:checked").innerHTML;
    let ward = document.querySelector("#ward option:checked")?.innerHTML;
    let ui = new RenderUI();
    let information = {
        address,
        province,
        district,
        ward
    }
    ui.renderInformation(information);
})