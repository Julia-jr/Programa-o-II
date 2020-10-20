$(function() {

  function showHeadsets() {

      $.ajax({
          url: "http://localhost:5000/get-headsets",
          method: "GET",
          dataType: "json", 
          success: listHeadsets, 
          error: function() {
              alert("erro ao ler dados, verifique o backend");
          },
      });

      function listHeadsets(headsets) {
          $("#tableBody").empty();
          showContent("tabela-headset");
          for (headset of headsets) {
              var newRow = `<tr id="line_${headset.id}"> 
                              <td>${headset.marca}</td> 
                              <td>${headset.cor}</td> 
                              <td>${headset.led}</td> 
                              <td>${headset.modelo}</td> 
                              <td>
                                  <a href="#" id="delete_${headset.id}" class="delete_headset" title="Excluir Headset">
                                          deletar
                                  </a>
                              </td>
                            </tr>`;
              $("#tableBody").append(newRow);
          }
      }
  }

  function showContent(nextPage) {
      $("#inicio").addClass("invisible");
      $("#tabela-headset").addClass("invisible");
      $(`#${nextPage}`).removeClass("invisible");
  }

  $("#link-listar").click(function() {
      showHeadsets();
  });

  $("#link-inicial").click(function() {
      showContent("inicio");
  });

  $("#nav-brand").click(function() {
      showContent("inicio");
  });

  $(document).on("click", "#btn-incluir", function() {
      const marca = $("#campo-marca").val();
      const cor = $("#campo-cor").val();
      const led = $("#campo-led").val();
      const modelo = $("#campo-modelo").val();

      const headsetData = JSON.stringify({
          marca: marca,
          cor: cor,
          led: led,
          modelo: modelo,
      });

      $.ajax({
          url: "http://localhost:5000/create-headsets",
          type: "POST",
          dataType: "json",
          contentType: "application/json",
          data: headsetData,
          success: createdHeadset,
          error: createdHeadsetError,
      });

      function createdHeadset(resposta) {
          if (resposta.result == "ok") {
              $("#campo-marca").val("");
              $("#campo-cor").val("");
              $("#campo-led").val("");
              $("#campo-modelo").val("");
              showHeadsets();
              alert("Headset adicionado com sucesso");
              $(".close").click();

          } else {
              alert(resposta.result + ':' + resposta.details);
          }
      }

      function createdHeadsetError(resposta) {
          alert("Erro na chamada do back-end");
      }
  });

  $('#modal-incluir').on('hidden.bs.modal', function(e) {
      if (!$('#tabela-headset').hasClass('invisible')) {
          showHeadsets();
      }
  });

  showContent("inicio");

  $(document).on("click", ".delete_headset", function() {
      var component = $(this).attr("id");

      var icon_name = "delete_";
      var headset_id = component.substring(icon_name.length);

      $.ajax({
          url: 'http://localhost:5000/delete-headsets/' + headset_id,
          type: "DELETE",
          dataType: "json",
          success: deletedHeadset,
          error: deletedHeadsetError
      });

      function deletedHeadset(retorno) {
          if (retorno.result == "ok") {
              $('#line_' + headset_id).fadeOut(1000, function() {
                  alert("Headset Removido com Sucesso!");
                  showHeadsets();
              });
          } else {
              alert(`${retorno.result}: ${retorno.details}`);
          }
      }

      function deletedHeadsetError(response) {
          alert("Erro ao excluir dados, verifique o Backend!");
      }
  });

});