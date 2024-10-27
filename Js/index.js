// navbar $ header
const navWidth = $(".nav-tabs").outerWidth();
$(".side-nav").animate({left : `-${navWidth}px`} , 2000)
// closed
let navStatus= false 
$(".nav-header > i").on("click" , function(){
    if(navStatus === true){
        $(".side-nav").animate({left : `-${navWidth}px`} , 1000)
        $(".nav-header > i ").removeClass("fa-xmark").addClass("fa-align-justify")
        for(let i =4 ; i>=0 ; i--){
            $(".nav-links li").eq(i).animate({top : 300} , (i+5)*200)
        }
       

        
        // update navstatus
        navStatus = false
    }else{
        $(".side-nav").animate({left : "0px"} , 1000)
        $(".nav-header > i ").removeClass("fa-align-justify").addClass("fa-xmark")
        for(let i = 0 ; i<=4; i++){
            $(".nav-links li").eq(i).animate({top : 0} , (i+5)*200)

        }  

        // update navstatus
        navStatus = true
    }
});

// displayMeals

async function getMeals(){
    let response = await fetch(`https:/www.themealdb.com/api/json/v1/1/search.php?s=`);
    let data = await response.json()
    let {meals} =data
    displayMeals(meals)
    $(".side-nav").animate({left : `-${navWidth}px`} , 1000)
    $(".nav-header > i ").removeClass("fa-xmark").addClass("fa-align-justify")
}


function displayMeals (meals){
    mealHtml = ""
    for(let i =0 ; i< meals.length ; i++){
        mealHtml += 
        `
         <div class="meal col-md-3  position-relative overflow-hidden rounded-3 p-3">
                    <img src="${meals[i].strMealThumb}" class="w-100" alt="">
                    <div class="meal-layer position-absolute text-black d-flex align-items-center ">
                             <div class="px-1">
                                  <h2>${meals[i].strMeal}</h2>
                                  <h6 class="d-none">${meals[i].idMeal}</h6>
                                 
           
                              </div>
                    </div>

                </div>

        `
        
    }

    $("body .meals").html(mealHtml)

    $(".meals .meal").on("click", function () {
        let idMeal = $(this).find("h6").text()
        getMealDetails(idMeal); 
    });


}

getMeals()



// search for meals
$("#search").on("click" , function(){
    
    $("body .contact").html("");
    $("body .categories").html("");
    $("body .area").html("");
    $("body .ingredients").html("");
    $("body .meals").html("");
    $("body .search").html
    (`
         <div class="container w-75 ">
            <div class="row py-4 ">
                <div class="search col-md-6 mb-sm-3">
                    <input type="text" class="form-control  bg-transparent name-search " placeholder="Search By Name">
                </div>

                <div class="search col-md-6 ">
                    <input type="text" class="form-control  bg-transparent  letter-search" placeholder="Search By First Letter">
                </div> 
            </div>

        </div>

        `)

        $(".side-nav").animate({left : `-${navWidth}px`} , 1000)
        $(".nav-header > i ").removeClass("fa-xmark").addClass("fa-align-justify")

        $(".name-search").on("keyup" , function(){
            getMealsByName($(this).val())
            $("body .meals").html("");
            
    
        });

        $(".letter-search").on("keyup" , function(){
            
            getMealsByFirstLetter($(this).val());
            $("body .meals").html("");
    
        })

       


        
})



// dispaly categories

$("#categories").on("click" , function (){
    async function getCategories(){
        
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
        let data = await response.json()
        let {categories} =data
        dispalyCategories(categories)
        $(".side-nav").animate({left : `-${navWidth}px`} , 1000)
        $(".nav-header > i ").removeClass("fa-xmark").addClass("fa-align-justify")
    }
    
    
    getCategories();
    



})




function dispalyCategories(categories){
    $("body .search").html("");
    $("body .ingredients").html("");
    $("body .area").html("");
    $("body .contact").html("");
    $("body .meals").html("");
    categoryHtml = ""

    for(let i = 0 ; i < categories.length ; i++){

        categoryHtml += 
        `
          <div class="meal col-md-3 position-relative overflow-hidden rounded-3 py-5 px-4 ">
                    <img src="${categories[i].strCategoryThumb}" class="w-100" alt="">
                    <div class="meal-layer position-absolute text-black text-center d-flex justify-content-center align-items-center ">
                             <div class="d-flex flex-column justify-content-center align-items-center px-3">
                                  <h2>${categories[i].strCategory}</h2>
                                  <p class="description h6">${categories[i].strCategoryDescription.split(" ").slice(0 , 20).join(" ")}</p>
           
                              </div>
                    </div>

                </div>
        `
       
    }

    $("body .categories").html(categoryHtml)

     // Attach click event to each category item to display meals for the selected category
     $(".categories .meal").on("click", function () {
        let categoryName = $(this).find("h2").text();
        getMealsByCategory(categoryName);
    });
}

// areas

$("#area").on("click" , function (){
    async function getAreas(){
        
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
        let data = await response.json()
        let {meals} =data
        dispalyAreas(meals)
        $(".side-nav").animate({left : `-${navWidth}px`} , 1000)
        $(".nav-header > i ").removeClass("fa-xmark").addClass("fa-align-justify")
    }
    
    getAreas();
    

})




function dispalyAreas(meals){
    $("body .search").html("");
    $("body .categories").html("");
    $("body .ingredients").html("");
    $("body .contact").html("");
    $("body .meals").html("");
    areaHtml = ""

    for(let i = 0 ; i < meals.length ; i++){

        areaHtml += 
        `
          <div class="meal col-md-3  position-relative overflow-hidden rounded-3 ps-5 d-flex flex-row flex-wrap  my-3  ">
             <div class="d-flex flex-column">
                 <i class="fa-solid fa-house-laptop fa-4x"></i>
                   
                 <h2 class="h4">${meals[i].strArea}</h2>
             </div>
          </div>
                    
                    
        `
       
    }

    $("body .area").html(areaHtml)

     // Attach click event to each category item to display meals for the selected area
     $(".area .meal").on("click", function () {
        let areaName = $(this).find("h2").text();
        console.log(areaName)
        getMealsByArea(areaName);
    });
}


// ingredients

$("#ingridents").on("click" , function (){
    async function getingridents(){
        
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
        let data = await response.json()
        let {meals} =data
        dispalyIngreidents(meals)
        $(".side-nav").animate({left : `-${navWidth}px`} , 1000)
        $(".nav-header > i ").removeClass("fa-xmark").addClass("fa-align-justify")
    }
    
    getingridents()
    

})




function dispalyIngreidents(meals){
    $("body .search").html("");
    $("body .categories").html("");
    $("body .area").html("");
    $("body .contact").html("");
    $("body .meals").html("");
    ingreidentsHtml = ""

    for(let i = 0 ; i < 20 ; i++){

        ingreidentsHtml += 
        `
          <div class="meal col-md-3  position-relative overflow-hidden rounded-3 ps-5 d-flex flex-row flex-wrap   my-3  ">
             <i class="fa-solid fa-drumstick-bite fa-4x mb-2 m-auto"></i>
             <div class="d-flex flex-column text-center">
                 <h2 class="h4">${meals[i].strIngredient}</h2>
                 <p class="h6">${meals[i].strDescription
                    ? meals[i].strDescription.split(" ").slice(0 , 20).join(" "): ""}</p>
             </div>
          </div>
                    
                    
        `
       
    }

    $("body .ingreidents").html(ingreidentsHtml)

    // Attach click event to each category item to display meals for the selected ingredient
    $(".ingreidents .meal").on("click", function () {
        let ingredientName = $(this).find("h2").text();
        getMealsByIngredients(ingredientName);
    });
}


// contact

const nameRegex = /^[A-Z][a-z]{3,}/;
const phoneRegex = /^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/;
const passwordRegex = /^.{5,15}$/;
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{3,}$/;
const ageRegex = /^\S[0-9]{0,3}$/;

$("#contact").on("click", function() {
    $("body .search").html("");
    $("body .categories").html("");
    $("body .area").html("");
    $("body .meals").html("");
    $("body .contact").html(`
        <div class="container w-75 py-4">
            <div class="row">
                <div class="search col-md-6">
            <div>
                <input type="text" class="form-control mb-4" placeholder="Enter Your Name" id="name">
               

            </div>
            <div>
                <input type="text" class="form-control mb-4" placeholder="Enter Your Phone" id="phone">
                <p class="error mt-2 d-none">
                    Enter valid Phone Number
                  </p>
            </div>
            <div>
                <input type="password" class="form-control mb-4" placeholder="Enter Your Password" id="password">
                <p class="error mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                  </p>
            </div>
        </div>
        <div class="search col-md-6">
            <div>
                <input type="text" class="form-control mb-4" placeholder="Enter Your Email" id="email">
                <p class="error mt-2 d-none">
                    Enter valid Email
                  </p>
            </div>
            <div>
                <input type="number" class="form-control mb-4" placeholder="Enter Your Age" id="age">
                <p class="error mt-2 d-none">
                    Enter valid Age
                  </p>
            </div>
           <div>
            <input type="password" class="form-control mb-4" placeholder="Re-enter Password" id="repassword">
            <p class="error mt-2 d-none">
                rePassword must match password
              </p>
           </div>
        </div> 
                <button type="button" class="btn btn-outline-danger btn-sm w-25 m-auto mt-3 disabled d-block">Submit</button>
            </div>
        </div>
    `);
    
    $(".side-nav").animate({left: `-${navWidth}px`}, 1000);
    $(".nav-header > i").removeClass("fa-xmark").addClass("fa-align-justify");

    // Call testRegex on click
    testRegex();
});

// Validate function 
function validate(regex, element) {
    if (regex.test(element.val())) {
        element.addClass("is-valid").removeClass("is-invalid");
        element.next(".error").addClass("d-none"); 
        return true;
    } else {
        element.addClass("is-invalid").removeClass("is-valid");
        element.next(".error").removeClass("d-none"); 
        return false;
    }
}

// Test validation and toggle submit button
function testRegex() {
    if (
        validate(nameRegex, $("#name")) &&
        validate(phoneRegex, $("#phone")) &&
        validate(passwordRegex, $("#password")) &&
        validate(emailRegex, $("#email")) &&
        validate(ageRegex, $("#age")) &&
        validate(passwordRegex, $("#repassword"))
    ) {
        $(".btn").removeClass("disabled").addClass("enabled");

    } else {
        $(".btn").addClass("disabled").removeClass("enabled");
       
    }
}

// Apply validation on each input field when typing
$("body").on("keyup", ".contact input", function() {
    testRegex();
});


// Function to clear all inputs in the contact form
function clearContactInputs() {
    $(".contact input").val("").removeClass("is-valid is-invalid"); 
    $(".error").addClass("d-none"); 
    $(".btn").addClass("disabled"); 
}

// Add click event to submit button to clear inputs when clicked
$(".contact").on("click", ".btn", function() {
    clearContactInputs();
});



// get meals by category

async function getMealsByCategory(category) {
    
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        let data = await response.json();
        let { meals } = data;
        displayMealsByCategory(meals);
        $(".side-nav").animate({ left: `-${navWidth}px` }, 1000);
        $(".nav-header > i").removeClass("fa-xmark").addClass("fa-align-justify");
}


function displayMealsByCategory(meals) {
    let mealHtml = "";
    for (let i = 0; i < meals.length; i++) {
        mealHtml += `
            <div class="meal col-md-3 position-relative overflow-hidden rounded-3 p-3 ">
                <img src="${meals[i].strMealThumb}" class="w-100" alt="">
                <div class="meal-layer position-absolute text-black d-flex align-items-center">
                    <div class="px-1">
                        <h2>${meals[i].strMeal}</h2>
                        <h6 class="d-none">${meals[i].idMeal}</h6>
                    </div>
                </div>
            </div>
        `;
    }

    $("body .meals").html(mealHtml);
    $(".meals .meal").on("click", function () {
        let idMeal = $(this).find("h6").text()
        getMealDetails(idMeal); 
    });
}


// get meals by area

async function getMealsByArea(area) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    let data = await response.json();
    let { meals } = data;
    displayMealsByArea(meals);
    $(".side-nav").animate({ left: `-${navWidth}px` }, 1000);
    $(".nav-header > i").removeClass("fa-xmark").addClass("fa-align-justify");
}


function displayMealsByArea(meals) {
    let mealHtml = "";
    for (let i = 0; i < meals.length ; i++) {
        mealHtml += `
            <div class="meal col-md-3 position-relative overflow-hidden rounded-3 p-3">
                <img src="${meals[i].strMealThumb}" class="w-100" alt="">
                <div class="meal-layer position-absolute text-black d-flex align-items-center">
                    <div class="px-1">
                        <h2>${meals[i].strMeal}</h2>
                         <h6 class="d-none">${meals[i].idMeal}</h6>
                    </div>
                </div>
            </div>
        `;
    }

    $("body .meals").html(mealHtml);

    $(".meals .meal").on("click", function () {
        let idMeal = $(this).find("h6").text()
        getMealDetails(idMeal); 
    });
}



// get meals by ingredients


async function getMealsByIngredients(ingredient) {
    
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    let data = await response.json();
    let { meals } = data;
    displayMealsByIngredients(meals);
    $(".side-nav").animate({ left: `-${navWidth}px` }, 1000);
    $(".nav-header > i").removeClass("fa-xmark").addClass("fa-align-justify");
    
}


function displayMealsByIngredients(meals) {
    let mealHtml = "";
    for (let i = 0; i < meals.length ; i++) {
        mealHtml += `
            <div class="meal col-md-3 position-relative overflow-hidden rounded-3 p-3 ">
                <img src="${meals[i].strMealThumb}" class="w-100" alt="">
                <div class="meal-layer position-absolute text-black d-flex align-items-center">
                    <div class="px-1">
                        <h2>${meals[i].strMeal}</h2>
                        <h6 class="d-none">${meals[i].idMeal}</h6>
                    </div>
                </div>
            </div>
        `;
    }

    $("body .meals").html(mealHtml);
    $(".meals .meal").on("click", function () {
        let idMeal = $(this).find("h6").text()
        getMealDetails(idMeal); 
        
    });
}



// search by name 

async function getMealsByName(name){

    let response = await fetch(`https:/www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    let data = await response.json()
    let {meals} =data
    data.meals? displayMeals(meals) : displayMeals([])
    $(".side-nav").animate({left : `-${navWidth}px`} , 1000)
    $(".nav-header > i ").removeClass("fa-xmark").addClass("fa-align-justify")
}

// search by first letter

async function getMealsByFirstLetter(letter){

    let response = await fetch(`https:/www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    let data = await response.json()
    let {meals} =data
    data.meals? displayMeals(meals) : displayMeals([])
    $(".side-nav").animate({left : `-${navWidth}px`} , 1000)
    $(".nav-header > i ").removeClass("fa-xmark").addClass("fa-align-justify")
}

// get meals details

async function getMealDetails(idMeal) {
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
    data = await respone.json();
    let {meals} = data
    console.log(data)
    displayMealDetails(meals)

}

function displayMealDetails(meals) {
    let mealDetailsHtml = "";
    
    for (let i = 0; i <= meals.length ; i++) {
    mealDetailsHtml = `
        <div class="col-md-4 p-5">
            <img class="w-100 rounded-3 mb-2" src="${meals[i].strMealThumb}" alt="">
            <h2>${meals[i].strMeal}</h2>
        </div>
        <div class="col-md-8 py-5 ">
            <h2 class="px-4">Instructions</h2>
            <p class="h4 px-4">${meals[i].strInstructions}</p>
            <h3><span class="fw-bolder h4 px-4">Area: </span>${meals[i].strArea}</h3>
            <h3><span class="fw-bolder h4 px-4">Category: </span>${meals[i].strCategory}</h3>
            
            <div class="mt-5 px-4">
               <a target="_blank" href="${meals[i].strSource}" class="btn btn-success ">Source</a>
               <a target="_blank" href="${meals[i].strYoutube}" class="btn btn-danger">YouTube</a>
            </div>
        </div>
    `;

    $("body .meals").html(mealDetailsHtml);
}
}


jQuery(function(){
    $(".loading-screen").fadeOut(2000 , function(){
        $("body").css({overflow : "auto"})
        
    })
 
})

   
