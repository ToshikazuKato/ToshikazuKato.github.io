const bar = document.getElementById('bar');
const toggleNav = document.getElementById('toggleNav');

// to display links when bar's clicked;
const toggleLinks = () => {
  if (toggleNav.className === "topnav") {
      toggleNav.className += " responsive";
  } else {
      toggleNav.className = "topnav";
    }
}
bar.addEventListener('click', ()=>{
  toggleLinks();
});

//draw svg
const header = $('.header'),
      win = $(window),
      svg = $('#Contours').drawsvg({
              duration:2000,
              stagger:100,
              easing:'swing',
              reverse:false,
            }),
      max = header.height() - win.height();

win.on('scroll', function(event){
  event.preventDefault();
  var  p = win.scrollTop()/max;
  console.log(p);
  svg.drawsvg('progress',p);
});


//slide effect
AOS.init({
  duration: 1200,
});

// smooth scroll when link is clicked
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
