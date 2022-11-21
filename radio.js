const radioPlayer = document.getElementsByTagName('iframe')[0];
function onChangeRadio(radio){
    radioPlayer.src = radio.value;
    localStorage.setItem('lastRadioIndex', radio.selectedIndex);
}
async function load() {
    const radioSelect = document.getElementsByTagName('select')[0];
    (await (await fetch('stations.json')).json()).forEach(e => 
        radioSelect.append(new Option(e['name'], e['url'])));
    let lastRadio = radioSelect[localStorage.getItem('lastRadioIndex')];
    lastRadio = (Boolean(lastRadio) ? lastRadio : radioSelect[0]);
    lastRadio.selected = true;
    radioPlayer.src = lastRadio.value;
}