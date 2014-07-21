// Don't worry about this part -- it's only necessary because we are using
// JSONStub. We would not need to do this if we were dealing with a "real" app.
$(document).ajaxSend(function(event, xhr, settings) {
  xhr.setRequestHeader('JsonStub-User-Key', '8fdc9aab-804d-4e7a-883c-3060cdcd1d6a');
  xhr.setRequestHeader('JsonStub-Project-Key', 'cb7137cf-2e83-478f-8ada-fed0402ebbfe');
});

$(document).ready(function() {
  var baseUrl = 'http://jsonstub.com/articles';

  $.ajax({
    url: baseUrl
  })
  .done(function(data){
    data.forEach(function(article){
      var $article = $('<article>');
      var $header = $('<h2>').addClass('title');
      var articleUrl = baseUrl + '/' + article.id;
      $header.append($('<a>').text(article.title).attr('href', articleUrl));
      $article.append($header);
      $article.append($('<p>').text(article.summary));
      $('#articles').append($article);
    });
  })
  .fail(function(jqXHR){
    if(jqXHR.status === 404){
      alert('Article not found!');
    } else if(jqXHR.status === 500){
      alert('Server error!');
    }
  });

  $('#articles').on('click', '.title a', function(event){
    $.ajax({
      url: $(this).attr('href')
    })
    .done(function(data){
      $('#article').empty().show();
      $('#articles').hide();

      var $backLink = $('<a>').text('Go back').attr('href', '#');
      $backLink.click(function(event){
        $('#article').hide();
        $('#articles').show();
      });

      $('#article')
        .append($('<h2>').text(data.title))
        .append($('<p>').text(data.content))
        .append($backLink);
    });
    event.preventDefault();
  });
});
