$(document).ready(function(){

  let form_msg = $('#form-msg');
  let canvas_div = $('#canvas-div');
  let canvas_table = $('#canvas-table');
  let is_mousedown = false;
  let color = $('#color-switch').val();

  // Functions

  function flash_msg(msg) {
    return new Promise(function(resolve, reject){
      form_msg.text(msg);
      setTimeout(function(){
        form_msg.text('');
        return resolve();
      }, 3000);
    });
  }

  function clear_grid() {
    canvas_table.find('tbody').html('');
  }

  function reset_grid() {
    $('td.color-box').css('background', '#fff');
  }

  function make_grid(row_count, col_count) {
    clear_grid();
    for(var r = 0; r < row_count; r++) {
      let tr = $('<tr id="row-' + r + '">');
      canvas_table.find('tbody').append(tr);
      for(var c = 0; c < col_count; c++) {
        let td = $('<td class="color-box" id="td-' + r + '-' + c + '">');
        canvas_table.find('tbody').find('tr#row-' + r + '').append(td);
      }
    }
  }

  // Listeners

  $('#clear-grid-btn').click(function(){
    reset_grid()
  });

  $('#color-switch').change(function(){
    color = $('#color-switch').val();
    console.log('color change: ', color);
  });

  $(canvas_div).on('mouseup', function(){
    is_mousedown = false;
  });
  $(canvas_div).on('mousedown', function(){
    is_mousedown = true;
  });



  $(document).on('mouseover', 'td.color-box', function(){
    if(is_mousedown) {
      $(this).css('background', color);
    }
  });
  $(document).on('click', 'td.color-box', function(){
    $(this).css('background', color);
  });

  $('#grid-form').submit(function(e){
    e.preventDefault();
    let row_value = $(this).find('input#row-count-input').val();
    let col_value = $(this).find('input#col-count-input').val();
    let row_count = Number(row_value);
    let col_count = Number(col_value);
    if(row_count < 1 || row_count > 20) {
      flash_msg('The value of the row count input must be a number 1 - 20');
      return;
    }
    if(col_count < 1 || col_count > 20) {
      flash_msg('The value of the column count input must be a number 1 - 20');
      return;
    }
    make_grid(row_count, col_count);
  });

});
