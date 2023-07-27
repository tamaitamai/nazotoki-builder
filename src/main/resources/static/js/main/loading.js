$(document).ready(function() {
    function removeLoadingScreen() {
      const loadingScreen = document.querySelector(".loading-screen");
      loadingScreen.style.display = "none";
    }
    
    setTimeout(removeLoadingScreen, 2000);

    const images=[];
    const names=[];
    const explanations=[];
    $.ajax({
      type: 'post',
      url: '/story/loadingSelect',
      success: function(response){
        for(let i=0;i<response.length;i++){
          images.push(response[i].image);
          names.push(response[i].name);
          explanations.push(response[i].explanation);
        }     

        const randomIndex = Math.floor(Math.random() * images.length);
        $('.loading-image').attr('src','/image/'+images[randomIndex]);
        $('.loading-name').text(names[randomIndex]);
        $('.loading-explanation').text(explanations[randomIndex]);
      }
    });

});