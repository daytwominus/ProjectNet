$('.footerItem').hover(
    function (){
        $('.footerItem').animate({
            bottom: '0px',
            background: '#ccc'
        }, 100);
    },
    function (){
        $('.footerItem').animate({
            bottom: '-40px',
            background: '#ccc'
        }, 100);
    }
);


//window.onscroll=function(){
//    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
//        document.getElementById("footerItem").style.bottom="0px";
//        console.log(document.getElementById("footerItem").style.bottom);
//    }
//    else{
//        document.getElementById("footerItem").style.bottom="-40px";
//    }
//};