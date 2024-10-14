const baseURL = "https://provinces.open-api.vn/api";
//class + promise + fetch

//Đảm nhận việc giao tiếp với server
class Http {
    async get(url) {
        let respone = await fetch(url);
        if (respone.ok) {
            return respone.json();
        } else throw new Error(respone.statusText);
    }
}

//Đảm nhận việc trích xuất dữ liệu từ server
class Store {
    constructor() {
        this.http = new Http()
    }
    getProvinces() {
        return this.http.get(`${baseURL}/p`);
    }
    async getDistricts(provinceCode) {
        let provinceInfo =  await this.http.get(`${baseURL}/p/${provinceCode}/?depth=2`);
        return provinceInfo.districts;
    }
    async getWards(districtCode) {
        let districtInfo = await this.http.get(`${baseURL}/d/${districtCode}/?depth=2`);
        return districtInfo.wards;
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
document.addEventListener("DOMContentLoaded", async (event) => {
    let store = new Store();
    let ui = new RenderUI();
    let provinces = await store.getProvinces();
    ui.renderProvinces(provinces);

    let provinceCode = document.querySelector("#province").value;
    let districts = await store.getDistricts(provinceCode);
    ui.renderDistricts(districts);

    let districCode = document.querySelector("#district").value;
    let wards = await store.getWards(districCode);
    ui.renderWards(wards);
})

//Sự kiện thay đổi province
document.querySelector("#province").addEventListener("change", async (event) => {
    let store = new Store();
    let ui = new RenderUI();
    let provinceCode = document.querySelector("#province").value;
    let districts = await store.getDistricts(provinceCode);
    ui.renderDistricts(districts);

    let districCode = document.querySelector("#district").value;
    let wards = await store.getWards(districCode);
    ui.renderWards(wards);
})

//Sự kiện thay đổi district
document.querySelector("#district").addEventListener("change", async (event) => {
    let store = new Store();
    let ui = new RenderUI();
    //lấy mã districtCode sau khi thay đổi
    let districCode = document.querySelector("#district").value;
    let wards = await store.getWards(districCode);
    ui.renderWards(wards);
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