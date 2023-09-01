//fetching the data and returning an promise;

async function data_fetch(url) {
    const response = await fetch(url);
    const responseJson = await response.json();
    return await responseJson.data;

}

async function catagoryLoading(){
    const url="https://openapi.programming-hero.com/api/videos/categories";
    const catagories_data=await data_fetch(url)
    const catagoriesDiv=document.getElementById('catagories');
    catagories_data.forEach(catagory => {

        catagoriesDiv.innerHTML+=`<button class="light_gray rounded-md font-medium text-xs sm:text-base">${catagory.category}</button>`
        console.log(catagory.category);
        
    });
    
}

catagoryLoading();