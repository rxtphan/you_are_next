function doIt() {
  var rules = {};
  var inputs = $('input[type="text"]');

  for (var i = 0; i < inputs.length; i++) {
    var input = inputs[i];
    rules[input.id] = input.value;
  }

  var params = $.param(rules);

  $.ajax({ url: `http://localhost:3000/rank?${params}`})
  .done(function (data) {
    renderList(JSON.parse(data));
  });

  console.log(params);
}

function renderList(list) {
  $('#resultsBox').show();
  $('#rankingsTable').empty();

  for (var i = 0; i < list.length; i++) {
    var player = list[i];

    $('#rankingsTable').append(`
      <tr>
        <td>${i + 1}</td>
        <td>${player.name}</td>
        <td>${player.position}</td>
        <td>${player.score}</td>
      </tr>
    `);
  }
}
