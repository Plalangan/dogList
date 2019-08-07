

var $dogList = $('<ul></ul>').addClass('dogList');


  var dogRepository = (function (){
  var repository = [];
  var apiUrl = 'https://dog.ceo/api/breeds/list/all';


  function add(dog) {
    repository.push(dog);
  }

  function getAll() {
    return repository;
  }

  function addListItem(item){
    var $addListItem = $('<li></li>');
    var $button = $('<button class = "button">' + repository[0] + '</button>')
    $addListItem.append($button);
    $button.click(showModal);
    $dogList.append($addListItem);
    $('body').append($dogList);

  }

/*function showDetails(dog){
    dogRepository.loadDetails(dog).then(function () {
    showModal(dog);   })};
*/

function loadList(){
      return $.ajax(apiUrl, {dataType: 'json'}).then(function(item){
        add(item.message);
        addListItem(repository);

        var dog = {
            name: item.message,
          }
          add(dog)


        }).catch(function(e){
        console.error(e);
      });
    }


  /*  function loadDetails(item){
      var url = item.detailsUrl;
      return $.ajax(url).then(function(details){
        //Uncomment the line below to log index
        console.log('Item details', details);
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = Object.keys(details.types);
      }).catch(function(e){
        console.error(e);
      });
    }
*/

    function showModal(dog){
    var $modalContainer = $('<div class = "modal-container"></div>');

    var $modal = $('<div class = "modal"><div>');
    var $closeButtonElement = $('<button class = "closeButton">Close</button>').click(hideModal);


    var $nameElement = $('<h1></h1>').text('dog.name');
    $modal.append($closeButtonElement);
    $modal.append($nameElement);
    $modalContainer.append($modal);
    $modalContainer.addClass('is-visible');
    $('body').append($modalContainer);

  }

  function hideModal(){
    var $modalContainer = $('.modal-container');
    $modalContainer.removeClass('is-visible');
  }

  $('window').on('keydown', function(e){
    var $modalContainer = $('.modal-container');
    if (e.key === 'Escape' && $modalContainer.hasClass('is-visible')){
      hideModal();
    }
  });

  var $modalContainer = $('.modal-container');
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




  };
}
)
();



dogRepository.loadList().then(function(){
  $.each(dogRepository.repository, function(){dogRepository.addListItem(dogRepository.repository[0]);
  })
})

/*.then(function(item){

$.each(item.message, function(index, dog){
  addListItem(dogRepository.repository);
})};

*/

dogRepository.showModal();
