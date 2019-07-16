

var $dogList = $('ul');

var dogRepository = (function (){
  var repository = [];
  var apiUrl = 'https://dog.ceo/api/breeds/list/all';
  var $dogList = $('ul');

  function add(dog) {
    repository.push(dog);
  }

  function getAll() {
    return repository;
  }

  function addListItem(dog){
    var $addListItem = $('<li></li>');
    var $button = $('<button class = "button">' +  dog.name  + '</button>');
    $addListItem.append($button);
    $button.on('click', showModal);
    $dogList.append($addListItem);


  }

  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
    showModal(pokemon);   })};

  function loadList(){
    return $.ajax(apiUrl, {dataType: 'json'}).then(function(item){

      $.each(item.results, function(index, item){
        //Uncomment the line below to see index in the callback function in $.each()
        //console.log('response object ', index);
        var dog = {
          name: item.name,
          detailsUrl: item.url
        }
        add(dog)
      })

      }).catch(function(e){
      console.error(e);
    });
  }


  function loadDetails(item){
    var url = item.detailsUrl;
    return $.ajax(url).then(function(details){
      //Uncomment the line below to log index
      //console.log('Item details', details);
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = Object.keys(details.types);
    }).catch(function(e){
      console.error(e);
    });
  }

    function showModal(dog){
    var $modalContainer = $('<div class = "modal-container"></div>');

    var $modal = $('<div class = "modal"><div>');
    var $closeButtonElement = $('<button class = "closeButton">Close<button>');
  //  $closeButtonElement.on('click', hideModal);

    var $nameElement = $('<h1>' + item.name + ' </h1>');
    $modal.append($closeButtonElement);
    $modal.append($nameElement);
    $modalContainer.append($modal);
    $modalContainer.addClass('is-visible');
    $('body').append($modalContainer);

  }

  function hideModal(){
    var $modalContainer = $('#modal-container');
    $modalContainer.removeClass('is-visible');
  }

  $('window').on('keydown', function(e){
    var $modalContainer = $('#modal-container');
    if (e.key === 'Escape' && $modalContainer.hasClass('is-visible')){
      hideModal();
    }
  });

  var $modalContainer = $('#modal-container');
  $modalContainer.on('click', (e) => {
    var target = e.target;
    if (target === $modalContainer){
      hideModal();
    }
  });




  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
    hideModal: hideModal




  }
})();


dogRepository.loadList().then(function() {
  // Now the data is loaded!
dogRepository.getAll().forEach(function(){
    dogRepository.addListItem(dog);
  });
});
/*

dogRepository.showDetails(dog);

dogRepository.showModal(dog);
*/
