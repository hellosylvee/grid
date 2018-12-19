var DemoGrid = {
    currentSize: 6,
    buildElements: function($gridContainer, items) {
      var item, i;
      for (i = 0; i < items.length; i++) {
        item = items[i];
        $item = $(
          '<li>' +
            '<div class="inner">' +
              '<div class="controls">' +
                '<a href="#zoom1" class="resize" data-w="1" data-h="1">small</a>' +
                // '<a href="#zoom2" class="resize" data-w="2" data-h="1">2x1</a>' +
                // '<a href="#zoom3" class="resize" data-w="3" data-h="1">3x1</a>' +
                // '<a href="#zoom1" class="resize" data-w="1" data-h="2">1x2</a>' +
                '<a href="#zoom2" class="resize" data-w="2" data-h="2">medium</a>' +
                // '<a href="#zoom2" class="resize" data-w="3" data-h="3">large</a>' +
              '</div>' +
              i +
            '</div>' +
          '</li>'
        );
        $item.attr({
          'data-w': item.w,
          'data-h': item.h,
          'data-x': item.x,
          'data-y': item.y
        });
        $gridContainer.append($item);
      }
    },
    resize: function(size) {
      if (size) {
        this.currentSize = size;
      }
      $('#grid').gridList('resize', this.currentSize);
    },
    flashItems: function(items) {
      // Hack to flash changed items visually
      for (var i = 0; i < items.length; i++) {
        (function($element) {
          $element.addClass('changed')
          setTimeout(function() {
            $element.removeClass('changed');
          }, 0);
        })(items[i].$element);
      }
    }
  };
  
  $(window).resize(function() {
    $('#grid').gridList('reflow');
  });
  
  $(function() {
    DemoGrid.buildElements($('#grid'), fixtures.verticalGridDemo);
  
    $('#grid').gridList({ 
      direction: 'vertical', 
      lanes: DemoGrid.currentSize,
      widthHeightRatio: 458 / 195,
      heightToFontSizeRatio: 0.25,
      onChange: function(changedItems) {
        DemoGrid.flashItems(changedItems);
      }
    });

    $('#grid li .resize').click(function(e) {
      e.preventDefault();
      var itemElement = $(e.currentTarget).closest('li'),
          itemWidth = $(e.currentTarget).data('w'),
          itemHeight = $(e.currentTarget).data('h');
  
      $('#grid').gridList('resizeItem', itemElement, {
        w: itemWidth,
        h: itemHeight
      });
    });
    
    $('.add-row').click(function(e) {
      e.preventDefault();
      DemoGrid.resize(DemoGrid.currentSize + 1);
    });

    $('.remove-row').click(function(e) {
      e.preventDefault();
      DemoGrid.resize(Math.max(1, DemoGrid.currentSize - 1));
    });
});