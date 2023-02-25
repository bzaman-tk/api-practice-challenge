// api-1
const peopleFinder = () => {
    if (person == '') {
        return alert('data no avaiable');
    }
    
    const { found, message, result } = person;
    document.getElementById('found-count').innerText = message;
    const container = document.getElementById('person-container');
    result.forEach(rs => {
        let html = `
            <div class="card w-96 bg-base-100 shadow-md border rounded-md">
                <div class="card-body p-0">
                    <p class="card-title bg-gray-50 border-b rounded-tl-md rounded-tr-md text-base font-normal px-3 py-2">
                        Person Name: ${rs.name.common}
                    </p>
                    <p class="px-3 py-2">
                        <b>Age</b>: ${rs.age} <br>
                        <b>Street</b>: ${rs.address.street}, 
                        <b>House No</b>: ${rs.address.house}
                    </p> 
                </div> 
            </div>         
        `;
        container.innerHTML += html;
    });
};
peopleFinder();

//api-2
const carFinder = () => {
    if (data == '') {
        return alert('no data found');
    }
    const carsContainer = document.getElementById('cars-container');
    data.forEach(car => {
        let html = `
        <div class="card w-96 bg-base-100 shadow-md border">
            <figure class="pt-3">
                <img src="${car.imageURL ? car.imageURL : 'img/no-image.png' }" alt="" />
            </figure>
            <div class="card-body p-2">
                <h2 class="card-title">
                    Car Name: ${car.name}
                </h2>
                <p>
                   ${car.description}
                </p>
                <div class="card-actions justify-start">
                    <button class="btn btn-primary">Car Price: ${car.price}</button>
                </div>
            </div>
        </div>              
        `;
        carsContainer.innerHTML += html;
    }); 
};
carFinder();
//api-3
const filterCountries = () => {
    fetch('https://restcountries.com/v3.1/all')
        .then(res => res.json())
        .then(data => setCountry(data.slice(0,5)));
};
document.getElementById('capital').addEventListener('change', function (e) { 
    fetch(`https://restcountries.com/v3.1/capital/${e.target.value}`)
        .then(res => res.json())
        .then(data => alert("Name: " + data[0].name.common + ", Population: " + data[0].population));
});
document.getElementById('region').addEventListener('change', function (e) {
    filterRegion(e.target.value);
});
document.getElementById('languages-option').addEventListener('change', function (e) {
    fetch(`https://restcountries.com/v3.1/lang/${e.target.value}`)
        .then(res => res.json())
        .then(data => setCountry(data));
});
const filterRegion = (region) => {
    fetch(`https://restcountries.com/v3.1/region/${region}`)
        .then(res => res.json())
        .then(data => setCountry(data));
};
const setCountry = data => {
    let languagesAll = {};
    const container = document.getElementById('country-container');
    const cityOption = document.getElementById('capital');
    const languagesOption = document.getElementById('languages-option');
    container.innerHTML = '';
    cityOption.innerHTML = '<option disabled selected>Capital city</option>';
    languagesOption.innerHTML = '<option disabled selected>Languages</option>';
    data.forEach(dt => {
        let languagesKeys = Object.keys(dt.languages)[0];
        let languagesText = dt.languages[languagesKeys];
        languagesAll[languagesKeys] = languagesText;
        let html = `
            <div class="p-2 w-1/12">
            <h2>${dt.name.common}</h2>
            <img src="${dt.flags.png}">
            </div>
        `;
        container.innerHTML += html;
        let option = `
            <option>${ dt.capital ? dt.capital[0] : " " } </option >        
        `;
        cityOption.innerHTML += option;
        // let langHTML = `
        //     <option value="">${languagesText}</option>
        // `; 
        // languagesOption.innerHTML += langHTML;
    });
    if (languagesAll) {
        for (const [key, value] of Object.entries(languagesAll)) {
            languagesOption.innerHTML += `<option value="${key}">${value}</option>`;
        } 
    }
};

filterCountries();

// get github users
const getGitUser = () => {
    fetch('https://api.github.com/users?per_page=10')
        .then(res => res.json())
        .then(data => getSingleUser(data)); 
};

const getSingleUser = (data) => {
    console.log(data);
    let container = document.getElementById('users');
    data.forEach(dt => {
        fetch(dt.url)
            .then(res => res.json())
            .then(url => {
                container.innerHTML += `
                    <li id="${url.id}" class="flex flex-row items-center justify-center space-x-3 border px-3 py-1 mb-3 bg-gray-50">
                        <div class="avatar">
                            <div class="w-16 rounded-full">
                                <img src="${url.avatar_url}">
                            </div>
                        </div>
                        <div>
                            <b>Name: </b>${url.name} <br>
                            <b>Followers: </b> ${url.followers}
                            <div class="avatar-group -space-x-6">
${
fetch(`https://api.github.com/users/${url.login}/followers?per_page=2`).then(res => res.json()).then(flwer => {
    flwer.forEach(flwr => {
        `<img src=${flwr.avatar_url}`;
    })
})
}                            
                            <div class="avatar">
                                <div class="w-8 rounded-full">
                                    <img src="${url.avatar_url}">
                                </div>
                            </div>
                            <div class="avatar">
                                <div class="w-8 rounded-full">
                                    <img src="${url.avatar_url}">
                                </div>
                            </div>
                            <div class="avatar placeholder">
                                <div class="w-8 bg-neutral-focus text-neutral-content">
                                <span>+99</span>
                                </div>
                            </div>
                            </div>
                        </div>
                    </li>
                `;
            });
    }); 
};

getGitUser();
