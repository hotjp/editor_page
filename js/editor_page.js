$(function() {
  $('#scrollBar').tinyscrollbar();
  // 计算滚动条
  setTimeout(function() {
    $('.widgets_box').each(function() {
      var el = $(this),
        width = 0;
      el.find('li').each(function() {
        var elm = $(this);
        width += elm.width() + (parseInt(elm.css('margin')) * 2) + 1;
      });
      if (el.width() < width) {
        el.find('ul').width(width);
      }

    });
  }, 0);
  $('.phone').on('click', '.remove', function() {
    var con = confirm('确认移除？');
    if (con) {
      $(this).closest('.widget').remove();
      if ($('.phone').find('.widget').length == 0) {
        $('#target').droppable('enable');
      }
    }
  });
  $('.widgets_box .widget').draggable({
    proxy: 'clone',
    revert: true,
    cursor: 'auto',
    onStartDrag: function() {
      $(this).draggable('options').cursor = 'not-allowed';
      $(this).draggable('proxy').addClass('dp');
    },
    onStopDrag: function() {
      $(this).draggable('options').cursor = 'auto';
    }
  });

  $('#target').droppable({

    onDragEnter: function(e, source) {

      if ($(source).closest('.phone').length == 0) {
        $('#target').droppable('enable');
        $(source).draggable('proxy').css('border', '1px solid red');
        $(this).addClass('over');
      }
    },
    onDragLeave: function(e, source) {
      if ($(source).closest('.phone').length == 0) {
        $(source).draggable('proxy').css('border', '1px solid #ccc');
        $(this).removeClass('over');

      }
    },
    onDrop: function(e, source) {

      if ($(source).closest('.phone').length == 0) {
        var el = $(source).clone();

        $(this).append(el);

        $(this).removeClass('over');
        initListElm(el, true);
        $('#scrollBar').tinyscrollbar();
      }
      $('#target').droppable('disable');
    }
  });
});
var indicator = $('<div class="indicator">>></div>').appendTo('body');

function initListElm(obj, isFirst) {
  $(obj).hover(function() {
    $(this).addClass('hover');
  }, function() {
    $(this).removeClass('hover');
  }).draggable({
    proxy: 'clone',
    handle: '.move',
    revert: true,
    axis: 'v'
  }).droppable({
    onDragOver: function(e, source) {
      indicator.css({
        display: 'block',
        left: $(this).offset().left - 10,
        top: $(this).offset().top + $(this).outerHeight() - 5
      });
      $(source).draggable('proxy').css('border', '1px solid red');
    },
    onDragLeave: function(e, source) {
      indicator.hide();
    },
    onDrop: function(e, source) {
      var el;
      if ($(source).closest('.phone').length == 0) {
        el = $(source).clone();
      } else {
        el = $(source);
      }
      initListElm(el);
      $(el).insertAfter(this);
      $('#scrollBar').tinyscrollbar();
      indicator.hide();
      return false;
    }
  });
}