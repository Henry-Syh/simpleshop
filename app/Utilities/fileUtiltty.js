async function createFile(name) {
debugger;
    
    var xlsxUrl = `https://script.google.com/macros/s/AKfycbw0Nc2OVKDycKHVI9bZ9EPQUuAnBXKZQqakQwApph5Wyn2zyr3sPyQh8z6LtGygjap3/exec`
    
    var xlsxData = await $.getJSON(xlsxUrl, function(e){
        debugger;
    });

 
}

async function checkFile(name) {

}

async function deleteFile(name) {

}