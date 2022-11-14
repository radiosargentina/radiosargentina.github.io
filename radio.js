$(document).ready(function() {
    $.ajax({
        url:'stations.json?ts=' + Date.now(),
        type:'GET',
        dataType: 'json',
        success: function(radios) {
            $.each(radios, function(index, object) {
                $('#radioSelect').append($('<option>').text(object['name']).attr('value', object['url']));
            });
            listenToDefaultRadio();
        }
    });

    $('#radioSelect').change(function () {
        saveLastRadio(this.selectedIndex);
        listenTo(this.value);
    });
});

function listenToDefaultRadio(){
    var index = getLastRadio();
    var select = $('#radioSelect');
    if (index >= select.children('option').length){
        index = 0;
    }
    select.prop('selectedIndex', index);
    listenTo(select.prop("value"));
}

function getLastRadio(){
    if (isLocalStorageAvailable()) {
        return localStorage.getItem('radioIndex') || 0;
    } else {
        return 0;
    }
}

function saveLastRadio(index){
    if (isLocalStorageAvailable()){
        localStorage.setItem('radioIndex', index);
    }
}

function listenTo(url) {
    $('#radio').attr('src', url);
}

function isLocalStorageAvailable() {
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
