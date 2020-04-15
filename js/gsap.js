// Animation for Bootcamp page

var controller = new ScrollMagic.Controller();

var fadeIn = new TimelineMax();

fadeIn.to(".intro", 1, {
  opacity: 1
});

var fundementalBlock = new TimelineMax().from(".fundementals-block", 2, {
  opacity: 0
});

var scene = new ScrollMagic.Scene({
  triggerElement: "#trigger"
})
  //intro
  .setTween(fundementalBlock)
  .addTo(controller);

//bootcamp ends

//boards begins

