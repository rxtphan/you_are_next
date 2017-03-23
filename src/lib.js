function rank() {
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
      <tr onclick='togglePlayerRow(event)'>
        <td>${i + 1}</td>
        <td>${player.name}</td>
        <td>${player.position}</td>
        <td>${player.score}</td>
      </tr>
    `);
  }

  $('html, body').animate({
      scrollTop: $('#rank-button').offset().top - 10
  }, 500);

}

function toggleSectionVisibility(e) {
  var panel = $(e.target).closest('div.panel');
  var panelBody = panel.next();
  var button = panel.find('.panel-collapse-btn')
  panelBody.toggleClass('collapse');
  if (panelBody.hasClass('collapse')) {
    button.removeClass('glyphicon-minus-sign').addClass('glyphicon-plus-sign');
  } else {
    button.removeClass('glyphicon-plus-sign').addClass('glyphicon-minus-sign');
  }
}

function toggleMoreStats(e) {
  var button = $(e.target);
  button.closest('div.row').children('.js-more-stat').toggle();
}

function togglePlayerRow(e) {
  var row = $(e.target);
  row.closest('tr').toggleClass('selected');
}

function tabClick(e) {
  var tab = $(e.target).closest('li');
  var league = tab.attr('class');
  var tabs = tab.closest('ul');
  tabs.children().removeClass('active')
  tab.addClass('active');

  if (league === 'nhl') {
    $('#nhl').show();
    $('#coming-soon').hide();
  } else {
    $('#nhl').hide();
    $('#coming-soon').show();
  }
}
