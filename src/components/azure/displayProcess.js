export  function displayProcess(process) {
    document.getElementById("uploadProgressBar").style.width = process + '%';
    document.getElementById("uploadProgressBar").innerHTML = process + '%';
    };