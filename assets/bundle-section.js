$(document).ready(function(){  
    var currency = '$';
    /* Start Swatch update -- Bundle Product */
    $(document).on('click', '.swatch-element', function(event){
      event.preventDefault(); 
      $(this).addClass('active').siblings().removeClass('active');
    });

    $(document).on('click', '.swatch[data-option-index="0"] .swatch-element', function(event){
      event.preventDefault(); 
      var opt_one = $(this).attr('data-value'),
          opt_two = $(this).parents('.swatch_options').find('.swatch[data-option-index="1"] .swatch-element.active').attr('data-value');
      // var opt_val = opt_one + ' / ' + opt_two ; 

      if(opt_one && opt_two){
        var opt_val = opt_one + ' / ' + opt_two ; 
      }else if(opt_one){
        var opt_val = opt_one ; 
      } else{}

      var proId = $(this).parent('.swatch').parent('.swatch_options').attr('id'),
          _thissel = $(this).parents('.ctms-features-list.itg_product').find('select[name="id"] option[data-vartitle="'+opt_val+'"]').val(),
          imgUrl =  $(this).parents('.ctms-features-list.itg_product').find('select[name="id"] option[data-vartitle="'+opt_val+'"]').attr('data-image'),
          proPrice =  $(this).parents('.ctms-features-list.itg_product').find('select[name="id"] option[data-vartitle="'+opt_val+'"]').attr('data-price'),
          removeCurr = proPrice.replace('$' , '');

      $(this).parents('.ctms-features-list.itg_product').find('.price span.new.current_price').text(proPrice);
      $(this).parents('.ctms-features-list.itg_product').find('.feature-price.add_product').attr('data-price' , removeCurr);
      $(this).parents('.ctms-features-list.itg_product').find('.proImg').attr('src', imgUrl);
      $(this).parent('.swatch').parent('.swatch_options').parent('div').siblings('input.productID').val(_thissel);
      $(this).parent('.swatch').parent('.swatch_options').parent('div').siblings('input.qty').val(0);
    });

    $(document).on('click', '.swatch[data-option-index="1"] .swatch-element', function(event){
      event.preventDefault(); 
      var opt_two = $(this).attr('data-value'),
          opt_one = $(this).parents('.swatch_options').find('.swatch[data-option-index="0"] .swatch-element.active').attr('data-value');
      // var opt_val = opt_one + ' / ' + opt_two ; 

      if(opt_one && opt_two){
        var opt_val = opt_one + ' / ' + opt_two ; 
      }else if(opt_one){
        var opt_val = opt_one ; 
      } else{}

      var proId = $(this).parent('.swatch').parent('.swatch_options').attr('id'), 
          imgUrl =  $(this).parents('.ctms-features-list.itg_product').find('select[name="id"] option[data-vartitle="'+opt_val+'"]').attr('data-image'),
          _thissel = $(this).parents('.ctms-features-list.itg_product').find('select[name="id"] option[data-vartitle="'+opt_val+'"]').val(),
          proPrice =  $(this).parents('.ctms-features-list.itg_product').find('select[name="id"] option[data-vartitle="'+opt_val+'"]').attr('data-price'),
          removeCurr = proPrice.replace('$' , '');
//console.log(removeCurr);
      $(this).parents('.ctms-features-list.itg_product').find('.price span.new.current_price').text(proPrice);
      $(this).parents('.ctms-features-list.itg_product').find('.feature-price.add_product').attr('data-price' , removeCurr);
      $(this).parents('.ctms-features-list.itg_product').find('.proImg').attr('src', imgUrl);
      $(this).parent('.swatch').parent('.swatch_options').parent('div').siblings('input.productID').val(_thissel);
      $(this).parent('.swatch').parent('.swatch_options').parent('div').siblings('input.qty').val(0);
    }); 
    /* End Swatch update -- Bundle Product */

    
    /* Start Change Bundle Product Data */
    $(document).on('click', '.feature-price.add_product', function(event){
      event.preventDefault(); 
      var opt_one = $(this).siblings('.colors-option-block').find('.swatch[data-option-index="0"] .swatch-element.active').attr('data-value'),
          opt_two = $(this).siblings('.colors-option-block').find('.swatch[data-option-index="1"] .swatch-element.active').attr('data-value');

      if(opt_one && opt_two){
        var opt_val = opt_one + ' / ' + opt_two ; 
      }else if(opt_one){
        var opt_val = opt_one ; 
      }else{}

      var proId = $(this).siblings('select[name="id"]').find('option[data-vartitle="'+opt_val+'"]').val(),
          qtysss = parseInt($(this).siblings('select[name="id"]').find('option[data-vartitle="'+opt_val+'"]').attr('data-qty')),
          qty = parseInt($(this).siblings('select[name="id"]').find('option[data-vartitle="'+opt_val+'"]').attr('data-qty')) + 1,
          handle = $(this).attr('data-handle'),
          qtyVal = parseInt($(this).siblings('.qty').val()),
          updateVal = parseInt($('.bundle_footer span.bndl_qty_update').text()),
          updatedQty = updateVal - 1,
          proPrice = $(this).attr('data-price'),
          totalPrice = parseFloat($('h2.mian_price').attr('data-proprice')),
          discountedPrice= '';
           
// console.log(proPrice);
 
      
      totalPrice +=parseFloat(proPrice);
      discountedPrice = totalPrice - (totalPrice * (35 / 100));

      $('h2.mian_price').attr('data-proprice' , totalPrice.toFixed(2));
      $('h2.discounted_price').text(currency + discountedPrice.toFixed(2));

      $('h2.mian_price del').text(currency + totalPrice.toFixed(2));
      $('.bundle_footer span.bndl_qty_update').text(updatedQty);
      $('span.bndl_item_msg span.bndl_qty_update').text(updatedQty);

      
      
      
      if(updatedQty <= 0){
        $('.bundle_subtotal_price').removeClass('bndl-hidden');
        $('.add_bndl_pro').removeClass('bndl-hidden');
        $('.bndl_item_msg').addClass('bndl-hidden');
      }else{
        $('.bundle_subtotal_price').addClass('bndl-hidden');
        $('.add_bndl_pro').addClass('bndl-hidden');
        $('.bndl_item_msg').removeClass('bndl-hidden');
      }

      if(updatedQty <= -1){

        $('p.offer_text').hide();
        $('h2.heading-hover').html('(35% DISCOUNT)').addClass('increase_discount');
        discountedPrice = totalPrice - (totalPrice * (35 / 100));
        $('h2.mian_price').attr('data-proprice' , totalPrice.toFixed(2));
        $('h2.discounted_price').text(currency + discountedPrice.toFixed(2));
        $('h2.mian_price del').text(currency + totalPrice.toFixed(2));
      }
      
     // var updateProQty = qtyVal + 1;
     // $(this).siblings('.qty').val(updateProQty);
      //$('.add_product[data-handle="'+handle+'"]').attr('data-quantity', updateProQty);

      /* Select Value Update */
      $(this).parents('.ctms-features-list.itg_product').find('select[name="id"] option[data-vartitle="'+opt_val+'"]').attr('data-qty', qty);

      $(this).find('.btn').addClass('activebtn');
      $(this).find('.btn span').text('');
      $(this).find('.btn span').append('<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg>')

      setTimeout(function() { 
        $('.feature-price.add_product').find('.btn span').append('');
        $('.feature-price.add_product').find('.btn span').text('Add');  
        $('.feature-price.add_product').find('.btn').removeClass('activebtn');
      }, 1000);

      setTimeout(function() { 
       // var handleQty = $('.add_product[data-handle="'+handle+'"]').attr('data-quantity');
        var mainVal =  $('.add_product[data-handle='+handle+']').siblings('.productID').val();

        if($(document).find('.'+handle).length){
          jQuery.getJSON('/products/'+handle+'.js', function(product) {
            var data = product.variants; 
            data.forEach(function(item) {
              //console.log( item );
              var itemId = item.id;
              var itemTitle = item.title ,       
                  itemTitleHandle = itemTitle.toLowerCase().replace(/[_\W]+/g,'-');

              if(itemId == mainVal){
                var handleQty = $('.add_product[data-handle="'+handle+'"]').siblings('select[name="id"]').find('option[data-vartitle="'+itemTitle+'"]').attr('data-qty');
                
                if($(document).find('.bndl-footer-status-product.'+itemTitleHandle).length){ 
                  //console.log('qtyIssue');
                  $('.ctms-features-items.bndl-items .'+itemTitleHandle).find('.bndl_pro_title .bndl_pro_detail span.qty_val').text(handleQty+ 'x');
                  $('.bndl_footer_status_container .'+itemTitleHandle).find('.bndl-footer-status-box-product-quantity').text(handleQty+ 'x');
                  $('.ctms-features-list[data-handle="'+itemTitleHandle+'"]').attr('data-quantity', handleQty);
                }else{
                var handleQty = $('.add_product[data-handle="'+handle+'"]').siblings('select[name="id"]').find('option[data-vartitle="'+itemTitle+'"]').attr('data-qty');
                  $('.ctms-features-items.bndl-items').append('<div class="'+itemTitleHandle+' ctms-features-list bndl_product_list '+product.handle+'" data-price="'+item.price/100+'" data-handle="'+itemTitleHandle+'" id="'+item.id+'" data-quantity="'+handleQty+'"><div class="bndl_product"><a href="#"><img src="'+item.featured_image['src']+'" alt="'+item.title+'"></a><div class="bndl_pro_title"><div class="bndl_pro_detail"><span class="qty_val">'+handleQty+'x</span><a href="#">'+item.title+'</a></div></div><div class="bndl_close" data-handle="'+itemTitleHandle+'"></div></div>')
                  $('#bndl_footer_status .bndl_footer_status_container').append('<div class="bndl-footer-status-product '+itemTitleHandle+'"><div class="bndl-footer-status-box-product-quantity"></div><a href="'+product.url+'" class="bndl-footer-status-product-url" target="_blank"><img title="'+item.title+'" class="bndl-footer-status-product-image" src="'+item.featured_image['src']+'"></a></div>');
                }
              }  
            });
          }); 
        }else{
          jQuery.getJSON('/products/'+handle+'.js', function(product) {
            var data = product.variants; 
            data.forEach(function(item) {
              var itemId = item.id;
              var itemTitle = item.title ,       
                  itemTitleHandle = itemTitle.toLowerCase().replace(/[_\W]+/g,'-');
              if(itemId == mainVal){
                if(itemTitle == "Default Title"){
                var handleQty = $('.add_product[data-handle="'+handle+'"]').siblings('select[name="id"]').find('option[data-vartitle="'+itemTitle+'"]').attr('data-qty');

                 // console.log(product);
                  $('.ctms-features-items.bndl-items').append('<div class="'+itemTitleHandle+' withoutvariant ctms-features-list bndl_product_list '+product.handle+'" data-price="'+product.price/100+'" data-handle="'+itemTitleHandle+'" id="'+product.id+'" data-quantity="'+handleQty+'"><div class="bndl_product"><a href="#"><img src="'+product.featured_image+'" alt="'+product.title+'"></a><div class="bndl_pro_title"><div class="bndl_pro_detail"><span class="qty_val">'+handleQty+'x</span><a href="#">'+product.title+'</a></div></div><div class="bndl_close" data-handle="'+itemTitleHandle+'"></div></div>')
                  $('#bndl_footer_status .bndl_footer_status_container').append('<div class="withoutvariant bndl-footer-status-product '+itemTitleHandle+'"><div class="bndl-footer-status-box-product-quantity"></div><a href="'+product.url+'" class="bndl-footer-status-product-url" target="_blank"><img title="'+product.title+'" class="bndl-footer-status-product-image" src="'+product.featured_image+'"></a></div>');
                }else{
                var handleQty = $('.add_product[data-handle="'+handle+'"]').siblings('select[name="id"]').find('option[data-vartitle="'+itemTitle+'"]').attr('data-qty');

                  //console.log(item);
                  $('.ctms-features-items.bndl-items').append('<div class="'+itemTitleHandle+' withvariant ctms-features-list bndl_product_list '+product.handle+'" data-price="'+item.price/100+'" data-handle="'+itemTitleHandle+'" id="'+item.id+'" data-quantity="'+handleQty+'"><div class="bndl_product"><a href="#"><img src="'+item.featured_image['src']+'" alt="'+item.title+'"></a><div class="bndl_pro_title"><div class="bndl_pro_detail"><span class="qty_val">'+handleQty+'x</span><a href="#">'+item.title+'</a></div></div><div class="bndl_close" data-handle="'+itemTitleHandle+'"></div></div>')
                  $('#bndl_footer_status .bndl_footer_status_container').append('<div class="withvariant bndl-footer-status-product '+itemTitleHandle+'"><div class="bndl-footer-status-box-product-quantity"></div><a href="'+product.url+'" class="bndl-footer-status-product-url" target="_blank"><img title="'+item.title+'" class="bndl-footer-status-product-image" src="'+item.featured_image['src']+'"></a></div>');
                }
              } 
            });
            //     $('.ctms-features-items.bndl-items').append('<div class="ctms-features-list bndl_product_list '+product.handle+'" data-price="'+product.price/100+'" data-handle="'+product.handle+'" id="'+product.id+'" data-quantity="'+handleQty+'"><div class="bndl_product"><a href="#"><img src="'+product.featured_image+'" alt="'+product.titme+'"></a><div class="bndl_pro_title"><div class="bndl_pro_detail"><span class="qty_val">'+handleQty+'x</span><a href="#">'+product.title+'</a></div></div><div class="bndl_close" data-handle="'+product.handle+'"></div></div>')
            //      $('#bndl_footer_status .bndl_footer_status_container').append('<div class="bndl-footer-status-product '+product.handle+'"><div class="bndl-footer-status-box-product-quantity"></div><a href="'+product.url+'" class="bndl-footer-status-product-url" target="_blank"><img title="'+product.title+'" class="bndl-footer-status-product-image" src="'+product.featured_image+'"></a></div>');

          }); 
        }
      }, 100);
      
   
      
      
    });

    
    /* Remove Bundle Product */
    $(document).on('click', '.bndl_close', function(){
      var qty = parseInt($(this).closest('.bndl_product').parent('.bndl_product_list').data('quantity')),
          closeHandle = $(this).attr('data-handle'),
          updateVal = parseInt($('.bundle_footer span.bndl_qty_update').text()),      
          updatedQty = updateVal + qty,
          proPrice = parseFloat($(this).closest('.bndl_product').parent('.bndl_product_list').attr('data-price')) * qty,
          mainPrice= parseFloat($('h2.mian_price').attr('data-proprice'));

      var nowProprice = mainPrice - proPrice ; 
      // console.log(mainPrice + 'or' + proPrice);

      //console.log(updatedQty);
      
  if(updatedQty <= 0){
      var discountedPrice = nowProprice - (nowProprice * (35 / 100));

      $('h2.mian_price del').text(currency + nowProprice.toFixed(2));


      $('h2.mian_price').attr('data-proprice' , nowProprice.toFixed(2));
      $('h2.discounted_price').text(currency + discountedPrice.toFixed(2));
 }
      //console.log(updatedQty);
      $('.bundle_footer span.bndl_qty_update').text(updatedQty);
      $('span.bndl_item_msg span.bndl_qty_update').text(updatedQty);
      if(updatedQty > 0){
        $('.bundle_subtotal_price').addClass('bndl-hidden');
        $('.add_bndl_pro').addClass('bndl-hidden');
        $('.bndl_item_msg').removeClass('bndl-hidden');
      }else{
        $('.add_bndl_pro').removeClass('bndl-hidden');
        $('.bundle_subtotal_price').removeClass('bndl-hidden');
        $('.bndl_item_msg').addClass('bndl-hidden');
      } 
      $(this).closest('.bndl_product').parent('.bndl_product_list').remove();
      $('.bndl-footer-status-product.'+closeHandle).remove();
      //console.log('.bndl-footer-status-product.'+closeHandle);
      $('.'+closeHandle).remove();
      $('.feature-price.add_product[data-handle="'+closeHandle+'"]').attr('data-quantity', '0');
      $('.feature-price.add_product[data-handle="'+closeHandle+'"]').siblings('.qty').val(0)
      
      
       if(updatedQty <= 0){
          $('h2.heading-hover').html('(35% DISCOUNT)').removeClass('increase_discount');
          $('p.offer_text').show();
       }
      
      if(updatedQty <= -1){

        $('p.offer_text').hide();
        $('h2.heading-hover').html('(35% DISCOUNT)').addClass('increase_discount');
       
        var discountedPrice = nowProprice - (nowProprice * (35 / 100));

      $('h2.mian_price del').text(currency + nowProprice.toFixed(2));


      $('h2.mian_price').attr('data-proprice' , nowProprice.toFixed(2));
      $('h2.discounted_price').text(currency + discountedPrice.toFixed(2));
      }
      
    });

    
    /* Add Bundle Product */
    $(document).on('click', '.add_bndl_pro_add', function(){ 
    
      var queue = [];      
      var qty = [];   
      var dataQty = ''; 
      var dataId = '';
      $('.itg_product').each(function(){

        $('.productId option').each(function(){

          //console.log($(this).val());

          dataQty = parseInt($(this).attr('data-qty'));
          dataId= $(this).val();

          if(dataQty > 0){
            qty.push(dataQty);
            queue.push(dataId);
           // console.log(dataQty);
           // console.log(dataId);
          }

        });

                 dataQty = $(this).find('.add_product').attr('data-quantity');
                 dataId= $(this).find('.productID').val();
                 qty.push(dataQty);
                 queue.push(dataId);
                 console.log(dataQty);
                 console.log(dataId);

        return false;
      });    

     // console.log(queue);

      $('.package-loader_main').show();
      addToCart(queue, qty);
      function addToCart(queue){
        var productId = queue.shift();
        var producQty = qty.shift();
        jQuery.post('/cart/add.js', {
          quantity: producQty,
          id: productId,
        }, function() {
          if (queue.length) { addToCart(queue) }else{
            console.log('Success');
            window.location = '/checkout?[discount]=BUNDLE35OFF';

          };
        });
      }; 
    });  
  });