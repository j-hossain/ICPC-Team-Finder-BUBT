let teamInfoUrl = "https://script.google.com/macros/s/AKfycbyZwIfPUDVec6RetEgHESWCeQayT9E1hspvPvIOYfHCrdgE8du2pjp9DINFj9pH3cGkDQ/exec";
// let teamInfoUrl = "https://script.google.com/macros/s/AKfycbwhI6b9tLhs0cscHQBrT6ASHdcjjMRajOuyFUns7FXnlsZQU2AAMSzaJBYDljONmN4Z/exec";
let teamFinderUrl = "https://script.google.com/macros/s/AKfycbz2t2xNfiC31JBrGLDT_tvEqdQalARglV_uPFVWNUx5NGps7ucsVEuvtBDAvDbdRa52Kw/exec";


function showSnackBar(msg) {
    let bar = document.getElementById("snackbar");
    bar.innerHTML = msg;
    bar.className = "show";
    setTimeout(function () { bar.className = bar.className.replace("show", ""); }, 3000);
}