$(function () {
  changePage('inicial');
  $('#link-listar').click(function () {
    $.ajax({
      url: 'http://localhost:5000/get-headsets',
      method: 'GET',
      dataType: 'json', 
      success: listHeadsets, 
      error: function () {
        alert('erro ao ler dados, verifique o backend');
      },
    });
  });

  $('#link-inicial').click(function () {
    changePage('inicial');
  });

  $('#nav-brand').click(function () {
    changePage('inicial');
  });

  $('#btn-incluir').click(function () {
    const marca = $('#campo-marca').val();
    const cor = $('#campo-cor').val();
    const led = $('#campo-led').val();
    const modelo = $('#campo-modelo').val();
    

    const headsetData = JSON.stringify({
      marca: marca,
      cor: cor,
      led: led,
      modelo: modelo,
    
    });

    $.ajax({
      url: 'http://localhost:5000/create-headsets',
      type: 'POST',
      contentType: 'application/json',
      dataType: 'json',
      data: headsetData,
      success: createHeadset,
      error: createHeadsetError,
    });
  });


  function createHeadset(resposta) {
    if (resposta.result == 'ok') {
        alert('Headset adicionado com sucesso')
        $('#campo-marca').val('');
        $('#campo-cor').val('');
        $('#campo-led').val('');
        $('#campo-modelo').val('');
       
    } else {
        alert('Erro na adição do headset!')
    }
  }

  function createHeadsetError(resposta){
    alert('Erro na chamada do back-end')
  }

  function listHeadsets(headsets) {
    var rows = '';

    for (headset of headsets) {
      newRow = `<tr> 
                        <td>${headset.id}</td> 
                        <td>${headset.marca}</td> 
                        <td>${headset.cor}</td> 
                        <td>${headset.led}</td> 
                        <td>${headset.modelo}</td> 
                        
                      </tr>`;
      rows += newRow;
      $('#tableBody').html(rows);
    }
    changePage('listar');
  }

  function changePage(nextPage) {
    $('#container-inicial').addClass('invisible');
    $('#container-listar').addClass('invisible');
    $(`#container-${nextPage}`).removeClass('invisible');
  }
});
