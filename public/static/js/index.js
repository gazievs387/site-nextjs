function intersectionCallback(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.id === 'block1') {
            entry.target.class
            setTimeout(() => {
                const element1111 = document.getElementById('block1-text')

                element1111.classList.remove('block1-text_one'); 

                element1111.classList.add('block2-text_two'); 

                observer.unobserve(entry.target);
            }, 10);
            } else if(entry.target.id === 'block5') {
                setTimeout(() => {
                    const element2222 = document.getElementById('image-5')

                    element2222.classList.remove('image-5_one')
                    
                    element2222.classList.add('image-5_two')
                }, 500)
                
            }

        }

    });
}

  
const observer = new IntersectionObserver(intersectionCallback);



const element1 = document.getElementById('block1');
const element2 = document.getElementById('block5');


if (element1) {
  observer.observe(element1);
}

if (element2) {
  observer.observe(element2);
}

const bookingScrollLinks = document.querySelectorAll('[data-scroll-to-booking]');

function scrollBookingWidgetToCenter(behavior = 'smooth') {
  const bookingWidget = document.getElementById('widget');

  if (!bookingWidget) {
    return;
  }

  bookingWidget.scrollIntoView({
    behavior,
    block: 'center',
  });
}

bookingScrollLinks.forEach((link) => {
  link.addEventListener('click', function(event) {
    event.preventDefault();
    scrollBookingWidgetToCenter();

    if (window.history && window.history.pushState) {
      window.history.pushState(null, '', '#widget');
    }
  });
});

if (window.location.hash === '#widget') {
  setTimeout(() => scrollBookingWidgetToCenter('auto'), 100);
}

