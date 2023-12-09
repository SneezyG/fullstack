
   let jumper = document.querySelectorAll(".jump");
   let firstScroller = document.querySelectorAll(".scroll-columns > span");
   let innerColumn = document.querySelector('.inner-columns');
   let album_btns = document.querySelectorAll('.album-btn');
   let photo_tag = document.querySelector('.photo-tag');
   let indicators = document.querySelectorAll('.indicator');
   
   innerColumn.scrollBy(300, 0);
   innerColumn.style.scrollBehavior = 'smooth';
   let scroll_width = innerColumn.scrollWidth;
   let offset_width = innerColumn.offsetWidth;
   let scrollingLen =  scroll_width / 3;
   
   for (let elem of jumper) {
     elem.addEventListener("click", animateJumper);
     elem.addEventListener('animationend', resetAnime);
   }
   
   
   for (let scroller of firstScroller) {
     scroller.addEventListener("click", clickScroller)
   }
   
   for (let btn of album_btns) {
     btn.addEventListener("click", changeTag)
   }
   
   for (let btn of indicators) {
     btn.addEventListener("click", changeIndicator)
   }
   
   innerColumn.addEventListener('scroll', scrollHandler)
   
   function scrollHandler() {
     let scroll = innerColumn.scrollLeft;
     let diff = scroll_width - scroll - 50;

     for (let elem of firstScroller) {
       elem.style.backgroundColor = "#C0C0C0";
     }
     
     if (scroll > (2 * scrollingLen - 150) || offset_width > diff) {
       document.querySelector('.coll').style.backgroundColor = '#4682B4';
     }
     else if (scroll > (scrollingLen - 150)) {
       document.querySelector('.meth').style.backgroundColor = '#4682B4';
     } 
     else {
       document.querySelector('.intr').style.backgroundColor = '#4682B4';
     }
   }
   
   function animateJumper(e) {
     let target = e.target;
     for (let elem of jumper) {
       if (elem === target) {
         elem.style.animationPlayState = "running";
         elem.style.borderBottom = "2px solid #FFD700";
       }else {
         elem.style.borderBottom = 'none';
       }
     }
   }
   
   function clickScroller(e) {
     let elem = e.target;
     
     switch (elem.className) {
       case 'intr': {
        innerColumn.scrollTo({
          left: 0,
          behaviour: 'smooth'
        });
         break;
       }
       case 'meth': {
         innerColumn.scrollTo({
           left: scrollingLen,
           behaviour: 'smooth'
         });
         break;
       }
       case 'coll': {
         innerColumn.scrollTo({
           left: scrollingLen * 2,
           behaviour: 'smooth'
         });
       }
     }
     
   }
   
   function resetAnime(e) {
     let elem = e.target ?? e;
     elem.style.animation = "none";
     elem.offsetWidth;
     elem.style.animation = null;
  }
  
  setTimeout(() => {
    innerColumn.scrollTo({
      left: 0,
      behaviour: 'smooth'
    });
  }, 2000)
  
  
  let tags = [
   'My Coursera certification on Containerization',
   'My Coursera certification on Microservices', 
   'Myself serving my country',
   'My Coursera certification on TTD',
   'My Coursera certification on Machine Learning'
]
  
  let min_index = 0;
  let current_index = min_index;
  let max_index = tags.length - 1 ;
  
  
  function changeTag(e) {
    let elem = e.target;
    let ctrl = elem.dataset.ctrl ?? elem.parentElement.dataset.ctrl;
    if (ctrl == 'next') {
      if (current_index == max_index) {
        current_index = min_index;
      } else {
        current_index ++;
      }
    }
    else {
      if (current_index == min_index) {
        current_index = max_index;
      } else {
        current_index --;
      }
    }
    
    //console.log(current_index)
    
    photo_tag.innerHTML = tags[current_index];
    
    for (let btn of album_btns) {
      btn.style.visibility = "hidden";
    }
    
    setTimeout(() => {
      for (let btn of album_btns) {
        btn.style.visibility = "visible";
      }
    }, 1000)
    
  }
  
  function changeIndicator(e) {
    let index = e.target.dataset.index;
    //console.log(index);
    
    current_index = index;
    photo_tag.innerHTML = tags[current_index];
  }
  
  
   