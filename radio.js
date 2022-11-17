const getJSON = async url => {
    const response = await fetch(url);
    return response.json();
}

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
    return localStorage.getItem('radioIndex') || 0;
}

function saveLastRadio(index){
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
