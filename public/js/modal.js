var checksumDoubleClick = {
  loginBtn : false,
  postBtn : false,


  toCompare : function(btnName){
    return btnName === '#top-login' ? this.loginBtn
            : btnName === '#top-post' ? this.postBtn
            : undefined;
  },
  toChange : function(btnName){
    if(btnName === '#top-login'){
      if(!this.loginBtn)this.loginBtn = true;
      else{ this.loginBtn = false; }
    }else if(btnName === '#top-post'){
      if(!this.postBtn)this.postBtn = true;
      else{ this.postBtn = false; }
    }
  }
}

const hideTopPopup = (target, move) =>{
  target.animate({
    top : move
  }, 'slow');
}
const hideLeftPopup = (target, move) =>{
  target.animate({
    left : move
  }, 'slow');
}


function closeWindow(windowName, callback){
  let move = arguments[2] !== undefined
              ? Array.prototype.slice.call(arguments, 2, 3)
              : '50%';
  let btn = arguments[3] !== undefined
              ? Array.prototype.slice.call(arguments, 3).join('')
              : undefined;

  if(checksumDoubleClick.toCompare(btn)){
    $(document).mouseup((e) => {
      event.preventDefault();
      const container = $(windowName);
      if(!container.is(e.target) && container.has(e.target).length === 0){
        move.unshift('-');
        move = move.join('');
        callback(container, move);
        $('html').removeClass('open');
        checksumDoubleClick.toChange(btn);
        window.location.hash = "";
        $(document).off('mouseup');
      }
    });
  }
};

// modal event trigger
const showTopModals = (modalName, btn, top) => {
  if(!checksumDoubleClick.toCompare(btn)){
    $(modalName).animate({
      top : top
    }, 'slow');
    $('html').addClass('open');
    checksumDoubleClick.toChange(btn);
    closeWindow(modalName, hideTopPopup ,top, btn);
  }
};


// Login Modal
const clickLoginBtn = (event) =>{
  scrollTo(0, 0);
  event.stopPropagation();
  if(window.location.hash === ''){
    window.location.hash = '#modal-login';
    showTopModals('#modal-login', '#top-login','300');
  }
};
// Add Modal
const clickAddBtn = (event) => {
  scrollTo(0, 0);
  event.stopPropagation();
  if(window.location.hash === ''){
    window.location.hash = '#modal-post';
    showTopModals('#modal-post', '#top-post','50%');
  }
}

$(document).ready(function(){
  $('#top-login').click(clickLoginBtn);
  $('#top-post').click(clickAddBtn);
});
