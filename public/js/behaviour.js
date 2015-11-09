window.onscroll=function(){
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        //document.getElementById("footerItem").style.height="180px";
        console.log(document.getElementById("footerItem").style.height);
    }
};