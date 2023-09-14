
    const loadPhone = async(searchText , isShowAll) => {
        const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
        const data = await res.json();
        const phones = data.data;
        displayPhones(phones , isShowAll);    
    }

    function displayPhones(phones , isShowAll){
        const showAllContainer = document.getElementById("show-all-container");
        if(phones.length > 12 && !isShowAll){
            showAllContainer.classList.remove('hidden');
        }
        else{
            showAllContainer.classList.add('hidden');
        }

        if(!isShowAll){

            phones = phones.slice(0,12);
        }

        const phoneContainer = document.getElementById('phone-container');
        phoneContainer.innerText = '';
        phones.forEach(phone => {
            const phoneCard = document.createElement('div');
            phoneCard.classList = `card  bg-gray-100 shadow-xl mt-4`;
            phoneCard.innerHTML = `
                <figure>
                    <img class="p-4" src="${phone.image}" alt="Shoes" />
                </figure>
                <div class="card-body">
                    <h2 class="card-title">${phone.phone_name}</h2>
                    <p>Brand : ${phone.brand}</p>
                    <div class="card-actions mx-auto justify-center">
                    <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary px-20">Show Details</button>
                    </div>
                </div>
            `;
            phoneContainer.appendChild(phoneCard);
        });
        toggleLoadingSpinner(false);
    }

    // Button

    function clickButton(isShowAll) {
    
        toggleLoadingSpinner(true);
        const searchField = document.getElementById('search-field');
        const searchText = searchField.value;
        loadPhone(searchText , isShowAll);
    }

    // Spinner

    function toggleLoadingSpinner(isLoading){

        const loadingSpinner = document.getElementById("loading-spinner");
        if(isLoading){
            loadingSpinner.classList.remove('hidden');
        }
        else{
            loadingSpinner.classList.add('hidden');
        }
    
    }

    // Show All Button
    function showAllFunction(){

        clickButton(true)
    }

    //  API theke id , data
    
    const handleShowDetails = async(id) =>{

        const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
        const data = await res.json();
        console.log(data);

        const phone = data.data;
        showPhoneDetails(phone);
    }

    // Modal a Info Show

     const showPhoneDetails = (phone) =>{
        
        const showDetailsContainer = document.getElementById('show-detail-container');
        showDetailsContainer.innerHTML = `
          <img class="w-fit" src="${phone.image}" alt=""/>
          <p class="text-xl mt-4">Storage : ${phone?.mainFeatures?.storage}</p>
          <p class="text-xl mt-2"><span>GPS :</span>${phone?.others?.GPS || " No GPS"}</p>
        `;

        show_details_modal.showModal();
    }
