window.onscroll=function(){
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        document.getElementById("footerItem").style.bottom="0px";
        console.log(document.getElementById("footerItem").style.bottom);
    }
    else{
        document.getElementById("footerItem").style.bottom="-40px";
    }
};