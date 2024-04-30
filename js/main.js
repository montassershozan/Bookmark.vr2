const siteName = document.querySelector('#siteName');
const alert1 = document.querySelector('#alert1');
const siteUrl = document.querySelector('#siteUrl');
const alert2 = document.querySelector('#alert2');
const popupSec = document.querySelector('#popup-sec');
const submitBtn = document.querySelector('#submitBtn');
const editBtn = document.getElementById('editBtn');
const searchInput = document.querySelector('#searchInput');
const tbdy = document.getElementById('tbdy');

let indxContainer = 0;

let localGet = localStorage.getItem('bookmarkArray');
if (localGet != null) {
    var bookmarkArray = JSON.parse(localStorage.getItem('bookmarkArray'));
    displayOperation();
} else {
    var bookmarkObj = {};
    var bookmarkArray = [];
};

/* Create Operation */

function addBookmark() {
    bookmarkObj = {
        siteName: siteName.value,
        siteUrl: siteUrl.value,
    }
    if (siteNameValidate() && siteUrlValidate()) {
        bookmarkArray.push(bookmarkObj);
        console.log(bookmarkArray);
        let convertToStr = JSON.stringify(bookmarkArray);
        localStorage.setItem('bookmarkArray', convertToStr);
        retriveOPeration();
        clearOperation();
    } else {
        popupSec.classList.remove('d-none');
        siteName.classList.remove('is-invalid');
        siteUrl.classList.remove('is-invalid');
        alert1.classList.add('d-none');
        alert2.classList.add('d-none');
    }
};

submitBtn.addEventListener('click', function (e) {
    e.preventDefault();
    addBookmark();
});

popupSec.addEventListener('click', function () {
    popupSec.classList.add('d-none');
});

/* Retrive Operation */

function retriveOPeration() {
    let trs = "";
    for (let i = 0; i < bookmarkArray.length; i++) {
        trs = `<tr>
        <td>${i + 1}</td>
        <td>${bookmarkArray[i].siteName}</td>
        <td><a href="https://${bookmarkArray[i].siteUrl}" target="_blank"><i class="fa-solid fa-eye"></i></a></td>
        <td><i class="fa-solid fa-pen-to-square text-warning" onclick="updateOperation1(${i})"></i></td>
        <td><i class="fa-solid fa-trash text-danger-emphasis" onclick="deleteOperation(${i})"></i></td>
        </tr>`
    }
    tbdy.innerHTML += trs;
};

/* Clear Operation */

function clearOperation() {
    siteName.value = "";
    siteUrl.value = ""
};

/* Display Operation */

function displayOperation() {
    let trs = "";
    for (let i = 0; i < bookmarkArray.length; i++) {
        trs += `<tr>
        <td>${i + 1}</td>
        <td>${bookmarkArray[i].siteName}</td>
        <td><a href="https://${bookmarkArray[i].siteUrl}" target="_blank"><i class="fa-solid fa-eye"></i></a></td>   
        <td><i class="fa-solid fa-pen-to-square text-warning" onclick="updateOperation1(${i})"></i></td>
        <td><i class="fa-solid fa-trash text-danger-emphasis" onclick="deleteOperation(${i})"></i></td>
        </tr>`
    }
    tbdy.innerHTML = trs;
};

/* Search Operation */

function searchOperation() {
    let searchedWord = searchInput.value;
    let trs = "";
    for (let i = 0; i < bookmarkArray.length; i++) {
        if (bookmarkArray[i].siteName.toLowerCase().includes(searchedWord.toLowerCase())) {
            trs += `<tr>
            <td>${i + 1}</td>
            <td>${bookmarkArray[i].siteName}</td>
            <td>${bookmarkArray[i].siteUrl}</td>
            <td><a href="https://${bookmarkArray[i].siteUrl}" target="_blank"><i class="fa-solid fa-eye"></i></a></td>
            <td><i class="fa-solid fa-pen-to-square text-warning" onclick="updateOperation1(${i})"></i></td>
            <td><i class="fa-solid fa-trash text-danger-emphasis" onclick="deleteOperation(${i})"></i></td>
            </tr>`
        }
        tbdy.innerHTML = trs;
    }
};

searchInput.addEventListener('keyup', searchOperation);

/* Delete Operation */

function deleteOperation(indx) {
    bookmarkArray.splice(indx, 1);
    let convertToStr = JSON.stringify(bookmarkArray);
    localStorage.setItem('bookmarkArray', convertToStr);
    displayOperation();
};

/* Update Operation */

function updateOperation1(indx) {
    indxContainer = indx;
    siteName.value = bookmarkArray[indx].siteName;
    siteUrl.value = bookmarkArray[indx].siteUrl;
    submitBtn.classList.add('d-none');
    editBtn.classList.remove('d-none');
}

function updateOperation2(indx) {
    bookmarkArray.splice(indx, 1, bookmarkObj = {
        siteName: siteName.value,
        siteUrl: siteUrl.value,
    });
    let convertToStr = JSON.stringify(bookmarkArray);
    localStorage.setItem('bookmarkArray', convertToStr);
    displayOperation();
    clearOperation();
}

editBtn.addEventListener('click', updateOperation2);

/* Validation Operations */

/* Sitename Validation */

function siteNameValidate() {
    let siteNameRegex = /^[A-Z][a-z]*[0-9]*$/;
    let siteNamevalue = siteName.value;
    if (siteNameRegex.test(siteNamevalue)) {
        siteName.classList.add('is-valid');
        siteName.classList.remove('is-invalid');
        alert1.classList.add('d-none');
        return true;
    } else {
        siteName.classList.add('is-invalid');
        alert1.classList.remove('d-none');
        return false;
    }
};
siteName.addEventListener('input', siteNameValidate)

/* siteUrl Validation */

function siteUrlValidate() {
    let siteUrlRegex = /^(www.)[a-z]*(.com)$/;
    let siteUrlvalue = siteUrl.value;
    if (siteUrlRegex.test(siteUrlvalue)) {
        siteUrl.classList.add('is-valid');
        siteUrl.classList.remove('is-invalid');
        alert2.classList.add('d-none');
        return true;
    } else {
        siteUrl.classList.add('is-invalid');
        alert2.classList.remove('d-none');
        return false;
    }
};
siteUrl.addEventListener('input', siteUrlValidate);