let isSort = 0;
let noContentFlag = 0;

//fetching the data and returning an promise;
async function data_fetch(url) {
    const response = await fetch(url);
    const responseJson = await response.json();
    return await responseJson.data;
}

//Loading the all catagory.
async function catagoryLoading() {
    const url = "https://openapi.programming-hero.com/api/videos/categories";
    const catagories_data = await data_fetch(url)
    const catagoriesDiv = document.getElementById('catagories');
    catagories_data.forEach(catagory => {
        catagoriesDiv.innerHTML += `<button id="${catagory.category_id}" onclick="loadingDataAsPerCatagory('${catagory.category_id}',true)" class="light_gray rounded-md font-medium text-xs sm:text-base">${catagory.category}</button>`;
    });
    loadingDataAsPerCatagory()
}

//Content of the active catagory are loading here.
async function loadingDataAsPerCatagory(catagoryID = '1000', catagoryClicked = false) {
    const willActiveCatagory = document.getElementById(catagoryID);
    if (catagoryClicked) {
        const willDeactiveCatagory = document.getElementsByClassName('active');
        willDeactiveCatagory[0].classList.remove('active');
        isSort = 0;
        noContentFlag = 0;
        sortBtnColor(isSort);
    }
    willActiveCatagory.classList.add('active');
    const url = `https://openapi.programming-hero.com/api/videos/category/${catagoryID}`
    const catagoryData = await data_fetch(url);
    catagoryDataShow(catagoryData);
}

//Converting the second to hours and minute.
function timeConverter(second) {
    const hr = Math.floor(parseInt(second) / 3600);
    const min = Math.floor((parseInt(second) - (hr * 3600)) / 60)
    if (second) return `${hr}hrs ${min} min ago`
    else return ``
}

//Selected catagory data showing from here.
function catagoryDataShow(catagoryData) {
    const cardContainer = document.getElementById('card-container');
    const noContent = document.getElementById('no-content');

    if (isSort) {

        catagoryData.sort((a, b) => {
            aViews = parseFloat(a.others.views);
            bViews = parseFloat(b.others.views);
            return bViews - aViews;
        })
    }

    if (catagoryData.length == 0) {
        noContentFlag = 1;
        noContent.innerHTML = ``;
        cardContainer.innerHTML = ``;
        noContent.innerHTML += `<div class="py-16"><img class="mx-auto" src="images/Icon.png" alt="">
        <p class="text-3xl font-bold text-center">Oops!! Sorry, There is no <br class="hidden sm:block">content here</p>
        </div>`
    }
    else {
        noContent.innerHTML = ``;
        cardContainer.innerHTML = ``;
        catagoryData.forEach(cardInfo => {

            cardContainer.innerHTML += `<div class="card space-y-5">
            <div class="thamnail relative">
                <div class="h-40 overflow-hidden"><img class="h-full w-full rounded-md" src="${cardInfo?.thumbnail}" alt=""></div>
                
                <p class="bg-black text-white rounded-md absolute bottom-2 right-2 text-[10px] py-0.5 ${cardInfo?.others?.posted_date ? 'px-2' : 'hidden'} ">${timeConverter(cardInfo?.others?.posted_date)}</p>
            </div>
            
            <div class="thamnail-details flex gap-2">
                <div class="profile-pic">
                    <img class="rounded-full w-10 h-10" src="${cardInfo?.authors[0]?.profile_picture}" alt="">
                </div>
                <div class="title-profil-view space-y-1">
                    <p class="font-bold text-lg">${cardInfo?.title}</p>
                    <div class="channel flex gap-1.5 text-sm text-gray-600">
                        <p>${cardInfo?.authors[0]?.profile_name}</p>
                        <img class="h-5 w-5 ${cardInfo?.authors[0]?.verified ? '' : 'hidden'}" src="images/Badge.png" alt="">
                    </div>
                    <p class="view text-sm text-gray-600">${cardInfo?.others?.views} Views</p>
    
                </div>
            </div>
        </div>
        `
        })
    }
}

//Sort by view button coloring from here.
function sortBtnColor(isSort) {
    const sort_btn = document.getElementById('sort-btn');
    if (isSort) {
        sort_btn.classList.remove('gray');
        sort_btn.classList.add('btn');
        sort_btn.innerText = 'Sorted by view'
    }
    else {
        sort_btn.classList.add('gray');
        sort_btn.classList.remove('btn');
        sort_btn.innerText = 'Sort by view'

    }
}

//Sort by view button toggolling control from here.
function sortContent() {
    if (!noContentFlag) {
        isSort = 1 - isSort;
        sortBtnColor(isSort);
    }
    const catagoryID = document.getElementsByClassName('active')[0].id;
    loadingDataAsPerCatagory(catagoryID);
}
catagoryLoading();