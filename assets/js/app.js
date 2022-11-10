let ref = document.getElementById('references');
let brand = document.getElementById('brands');
let model = document.getElementById('models');
let yearmodel = document.getElementById('yearmodels');

let information = document.getElementById("informacoes");
let valor = document.getElementById("valor");
let combustivel = document.getElementById("combustivel");
let mesref = document.getElementById("mesreferencia");

//Marca do carro
async function brands(vehicleType){
    try{
        let brands = await fetch(`https://parallelum.com.br/fipe/api/v2/${vehicleType}/brands`);
        let data = await brands.json();
        
        return data;
    }catch{

    }
}
//Renderiza Marcas
async function renderizeBrands(type) {
    
    //Limpa Combo
    resetComboBox(brand, model, yearmodel);
   
    for (const data of await brands(type)) {
        let elem = document.createElement('option');
        elem.value = data.code;
        elem.text = data.name;
        brand.appendChild(elem);       
    }
}

//Modelos do carro
async function models(vehicleType, brandId){
    try{
        let models = await fetch(`https://parallelum.com.br/fipe/api/v2/${vehicleType}/brands/${brandId}/models`);
        let data = await models.json();
        return data;
    } catch{

    }
}
//Renderiza Modelos
async function renderizeModels(type, brand) {

    //Limpa Combo
    resetComboBox(model, yearmodel);
    
    for (const data of await models(type, brand)) {
        let elem = document.createElement('option');
        elem.value = data.code;
        elem.text = data.name;
        model.appendChild(elem);       
    }
}

//Ano do Modelos do carro
async function yearsModels(vehicleType, brandId, modelId){
    try{
        let yearsModels = await fetch(`https://parallelum.com.br/fipe/api/v2/${vehicleType}/brands/${brandId}/models/${modelId}/years`);
        let data = await yearsModels.json();
        return data;
    }catch{

    }
}

async function renderizeYearModels(type, brand, model) {

    //Limpa Combo
    resetComboBox(yearmodel);
    
    for (const data of await yearsModels(type, brand, model)) {
        let elem = document.createElement('option');
        elem.value = data.code;
        elem.text = data.name;
        yearmodel.appendChild(elem);       
    }
}

//Informações do Automovel
async function fipeInfo(vehicleType, brandId, modelId, yearId) {
    try{
        let info = await fetch(`https://parallelum.com.br/fipe/api/v2/${vehicleType}/brands/${brandId}/models/${modelId}/years/${yearId}`);
        let data = await info.json();
        return data;
    }catch{

    }
}

async function renderizeFipeInfo(type, brand, model, year) {
    
    let fipe = await fipeInfo(type, brand, model, year);

    information.classList.add("alert");
    information.classList.add("alert-primary");
    valor.innerHTML =`Valor : ${fipe.price}`;
    combustivel.innerHTML = `Combustivel : ${fipe.fuel}`;
    mesref.innerHTML = `Mês de Referência : ${fipe.referenceMonth}`;
    
}

//Limpar ComboBox
function resetComboBox(...combobox){

    combobox.forEach((combo)=> {
        while (combo.length) {
            combo.remove(0);
            }

            valor.innerHTML = '';
            combustivel.innerHTML = '';
            mesref.innerHTML = '';
            information.classList.remove("alert");
            information.classList.remove("alert-primary");
        }
    )
}

type.addEventListener("click", ()=> renderizeBrands(type.value))
brand.addEventListener("click", ()=> renderizeModels(type.value, brand.value))
model.addEventListener("click", ()=> renderizeYearModels(type.value, brand.value, model.value))
yearmodel.addEventListener("click", ()=> renderizeFipeInfo(type.value, brand.value, model.value,yearmodel.value))