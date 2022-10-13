let status = 'show';

$(document).ready(() => {
    $(document.body).css({
        'transition': '.7s',
        'opacity': '1'
    })
    $('.menub').click((e) => {
        if(status == 'show'){
          $(e.target).attr('src', '/img/close.png');
            show()
        }else{
          $(e.target).attr('src', '/img/menu.png');
            hide()
        }
    });


    $('.body').click(() => {
          $('.menub').attr('src', '/img/menu.png')
        if(status == 'hidden'){
            hide()
        }
    })

    hide();
});

let hide = () => {
    $('.menu > *').css('font-size', '0');
    $('.menu').css({
        'visibility': 'hidden',
        'width': '0px',
        'display': 'initial',
        'position': '',
        'left': '100vw',
    });

    $('.body').css({
        'width': '100vw',
		'display': 'inline-block',
        'position': '',
        'left': '0',
    });
    status = 'show';
},
show = () => {
    $('.menu').css({
        // 'width': '70vw',
        'visibility': 'visible',
        'display': 'block',
        'width': '70vw',
        'position': 'absolute',
        'left': '30vw',
    });
    $('.menu > *').css('font-size', '1em')

    $('.body').css({
      'position': 'absolute',
      'left': '-70vw',
        // 'width': '30vw',
    });
    status = 'hidden';
}