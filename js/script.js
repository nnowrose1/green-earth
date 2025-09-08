// console.log("JS file connected");
const categoryContainer = document.getElementById("category-container");
const cartContainer = document.getElementById("cart-container")

// manage Spinner
const spinner = (status) =>{
    if (status==true) {
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("all-plants-container").classList.add("hidden");    
    } else{
           document.getElementById("spinner").classList.add("hidden");
        document.getElementById("all-plants-container").classList.remove("hidden"); 
    }
}

// Loading and displaying the categories
const loadCategories = () =>{
    fetch("https://openapi.programming-hero.com/api/categories")
    .then(response => response.json())
    .then(data => {
        // console.log(data.categories); 
        displayCategories(data.categories);  
    })
}
const displayCategories = (plants) => {
    categoryContainer.innerHTML = " ";
    plants.forEach(plant => {
        const div = document.createElement("div");
        div.innerHTML = `
        <button id = "active-${plant.id}" onclick ="loadPlantsByCategories(${plant.id})" class="active-button font-medium text-black rounded-[4px] py-2 w-full text-left pl-3 whitespace-nowrap hover:bg-green-100"> ${plant.category_name} </button>
        `;
        categoryContainer.appendChild(div);
    }); 
}

loadCategories();

// All Plants
const allPlantsContainer = document.getElementById("all-plants-container");

const allPlantsButton = document.getElementById("all-plants");

const loadAllPlants = () =>{
     
    fetch("https://openapi.programming-hero.com/api/plants")
    .then(response => response.json())
    .then(data => {
        displayAllPlants(data.plants);
        // addToCart(data.plants);
    })
}
const displayAllPlants = (allPlants) => {
//  console.log(allPlants);
//  allPlantsContainer.innerHTML = " ";
// allPlants.forEach(eachPlant => {
    
    // console.log(eachPlant);
    allPlantsButton.addEventListener('click', () => {
       spinner(true);
    allPlantsContainer.innerHTML = " ";
    allPlants.forEach(eachPlant => {
    allPlantsButton.classList.add("active");
     const activeButtons = document.getElementsByClassName("active-button");
     for(const activeButton of activeButtons){
        activeButton.classList.remove("active");
    }

    const div = document.createElement("div");
    div.innerHTML = `
     <div class="tree-card p-4 rounded-lg bg-white container">
                <div class="w-[280px] h-[186px]">
                <img class="rounded-md h-full w-full" src="${eachPlant.image}" alt="">
                </div>
                <button onclick="loadPlantDetail(${eachPlant.id})" class=" font-semibold text-[14px] hover:font-bold text-[#18181B] mt-3">${eachPlant.name}</button>
                <p class="my-2 text-[12px] text-[#71717A]">${eachPlant.description}</p>
                <div class="flex items-center justify-between">
                    <p class="bg-[#DCFCE7] py-1 px-3 rounded-full text-[#15803D] font-medium text-[14px]">${eachPlant.category}</p>
                    <span class="font-semibold text-[14px] text-[#1F2937]">${eachPlant.price}</span>
                </div>
                <button id="${eachPlant.id}" class="cart-btn btn rounded-full py-3 w-full font-medium text-white bg-[#15803D] mt-6">Add to Cart</button>
            </div>
    `;
    allPlantsContainer.appendChild(div);
     })
     spinner(false);
})
 
}
loadAllPlants();

// Plants by Categories
const loadPlantsByCategories = (id) =>{
    spinner(true);
    // Active button
    const activeButtons = document.getElementsByClassName("active-button");
    // console.log(activeButtons);
    
    for(const activeButton of activeButtons){
        activeButton.classList.remove("active");
    }
const activeBtn = document.getElementById(`active-${id}`);
const allPlantsBtn = document.getElementById("all-plants");
allPlantsBtn.classList.remove("active");
// console.log(activeBtn);
activeBtn.classList.add("active");
// loading plants by category
    fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then(response => response.json())
    .then(data =>{
    // console.log(data.plants);
    displayPlantsByCategories(data.plants);  
    })
}
const displayPlantsByCategories = (category) =>{
    // console.log(category);
    allPlantsContainer.innerHTML = " ";
    category.forEach(plants => {
        const div = document.createElement("div");
        div.innerHTML = `
     <div class="tree-card p-4 rounded-lg bg-white container">
                <div class="w-[280px] h-[186px]">
                <img class="rounded-md h-full w-full" src="${plants.image}" alt="">
                </div>
                <h4 onclick="loadPlantDetail(${plants.id})" class="font-semibold hover:font-bold text-[14px] text-[#18181B] mt-3">${plants.name}</h4>
                <p class="my-2 text-[12px] text-[#71717A]">${plants.description}</p>
                <div class="flex items-center justify-between">
                    <p class="bg-[#DCFCE7] py-1 px-3 rounded-full text-[#15803D] font-medium text-[14px]">${plants.category}</p>
                    <span class="font-semibold text-[14px] text-[#1F2937]">${plants.price}</span>
                </div>
                <button class="btn rounded-full py-3 w-full font-medium text-white bg-[#15803D] mt-6">Add to Cart</button>
            </div>
    `;
    allPlantsContainer.appendChild(div);
    })
    spinner(false);
}

// Showing modal
const loadPlantDetail = (id) => {
    fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
    .then(response => response.json())
    .then(data =>{
        showPlantDetails(data.plants);    
    })
}

const showPlantDetails = (plant) => {
    const modalContainer = document.getElementById("modal-container");
 modalContainer.innerHTML = " ";
    const div =document.createElement("div");
    div.innerHTML =` <div class="tree-card p-4 rounded-lg bg-white container">
    <h4 class="font-semibold text-xl text-[#18181B] mb-3">${plant.name}</h4>
        <div class="w-full h-[186px]">
         <img class="rounded-md h-full w-full" src="${plant.image}" alt="">
         </div>
         <p class="py-1 mt-3 text-[#1F2937] font-medium text-[14px]">Category: ${plant.category}</p>
         <span class="font-semibold text-[14px] text-[#1F2937]">Price: ${plant.price}</span>  
        <p class="my-2 text-[12px] text-[#71717A]">Description: ${plant.description}</p> 
         </div>
          <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button, it will close the modal -->
        <button class="btn">Close</button>
      </form>
    </div>
    `;
    modalContainer.appendChild(div);
    document.getElementById("my_modal_5").showModal();
}
// ADd to Cart
const mainContainer = document.getElementById("all-plants-container");

mainContainer.addEventListener('click', (e) => {
    let sum = Number(document.getElementById("total-price").innerText);
    if(e.target.innerText == "Add to Cart"){
        const name = e.target.parentNode.children[1].innerText;
        let price = Number(e.target.parentNode.children[3].children[1].innerText);
        const id = e.target.parentNode.children[4].id;
        // console.log(id);
         sum = sum + price;
      
        
        //  console.log(sum);  
         const div = document.createElement("div");
    div.innerHTML=`
      <div class="max-w-[218px] rounded-lg bg-[#F0FDF4] flex items-center justify-between mb-2 py-2 px-3">
               <div>
                <h4 class="font-semibold text-[14px] text-[#1F2937]">${name}</h4>
                <p class="text-[#1F293790] mt-1">${price}</p>
                </div>
                <div>
                    <button>❌</button>
                </div>
                </div>
          `;
    cartContainer.appendChild(div); 
    } 
   document.getElementById("total-price").innerText = sum;
})
document.getElementById("cart").addEventListener('click', (e) => {
     let currentTotal = Number(document.getElementById("total-price").innerText);
            // console.log(currentTotal);
           if(e.target.tagName == "BUTTON"){
            let price = Number(e.target.parentNode.parentNode.children[0].childNodes[3].innerText);
            // console.log(price);
            e.target.parentNode.parentNode.parentNode.innerHTML = " ";
            let updatedTotal = currentTotal - price;
            // console.log(updatedTotal);
            
            document.getElementById("total-price").innerText = updatedTotal;
           }      
})

