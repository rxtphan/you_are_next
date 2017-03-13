function doIt() {
  var rules = {};
  var inputs = $('input[type="text"]:visible, select:visible');

  for (var i = 0; i < inputs.length; i++) {
    var input = inputs[i];
    rules[input.id] = input.value;
  }

  var params = $.param(rules);

  if (params) {
    $.ajax({ url: `http://localhost:3000/rank?${params}`})
    .done(function (data) {
      renderList(JSON.parse(data));
    });
  }

  console.log('>>> params: ', params);
}

function renderList(list) {
  $('#resultsBox').show();
  $('#rankingsTable').empty();

  $('#rankingsTable').append(`
    <tr style='background-color: #ccc;'>
      <td><strong>Rank</strong></td>
      <td><strong>Name</strong></td>
      <td><strong>Position</strong></td>
      <td><strong>Score</strong></td>
    </tr>
  `);

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

function toggleSectionVisibility(e) {
  var button = $(e.target);
  var panelBody = button.closest('div.panel').next();
  panelBody.toggleClass('collapse');
  if (panelBody.hasClass('collapse')) {
    button.removeClass('glyphicon-plus-sign').addClass('glyphicon-minus-sign')
  } else {
    button.removeClass('glyphicon-minus-sign').addClass('glyphicon-plus-sign')
  }
}
