const getJSON = async url => {
    const response = await fetch(url);
    return response.json();
}

function checkLocalStorage() {
    try {
        var storage = window['localStorage'], x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return false;
    }
}

const isLocalStorageAvailable = checkLocalStorage();

function listenToDefaultRadio(){
    var index = getLastRadio();
    const select = document.getElementById('radioSelect');
    if (index >= select.options.length)
        index = 0;
    option = select.options[index];
    option.selected = true;
    listenTo(option.value);
}

function getLastRadio(){
    if (isLocalStorageAvailable)
        return localStorage.getItem('radioIndex') || 0;
    return 0;
}

function saveLastRadio(index){
    if (isLocalStorageAvailable)
        localStorage.setItem('radioIndex', index);
}

function listenTo(url) {
    document.getElementById('radio').src = url;
}

function populateCombo(radios){
    const select = document.getElementById('radioSelect');

    radios.forEach(function(radio) { 
        select.options[select.options.length] = new Option(radio['name'], radio['url']);
    });
    listenToDefaultRadio();
}

function onSelectRadio(item){
    saveLastRadio(item.selectedIndex);
    listenTo(item.value);
}

getJSON('stations.json?ts=' + Date.now()).then(radios => populateCombo(radios));
