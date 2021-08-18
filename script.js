// API and details - https://emoji-api.com/#examples

// before DOM load


jQuery(document).ready(function ($) {
   
    let userTypedKeyword = document.querySelector("#search_bar_input");
    let promoTextandStatus = document.querySelector(".promo_text");

    // loading trigger
    let $loading = $(".loader").hide();
    $(document)
      .ajaxStart(function () {
        $loading.show();
      })
      .ajaxStop(function () {
        $loading.hide();
      });
    


    // trigger user typing
    userTypedKeyword.addEventListener("keyup", (e) => {
    
        if (userTypedKeyword.value !== "") {
            if (e.key === "Enter" || e.keyCode === 13) {
              // Number 13 is the "Enter" key on the keyboard
              const settings = {
                async: true,
                crossDomain: true,
                url: `https://emoji-api.com/emojis?search=${userTypedKeyword.value}&access_key=b2f9701be755929d7432267737628d77785f5f46`,
                method: "GET",
              };
              // a blank array

              jQuery.ajax(settings).done(function (emojis) {
                // if have post
                console.log(emojis);
                if (emojis != null) {
                  for (let index = 0; index < emojis.length; index++) {
                    postTemplate = `
                <div class="single_post">
                    <h1>${String.fromCodePoint(
                      parseInt(emojis[index].codePoint, 16)
                    )}</h1>
                    <p>${emojis[index].unicodeName}</p>
                </div>
                `;
                    $(".post_wrapper").append(postTemplate);
                    // update promo text
                    promoTextandStatus.innerHTML = `${emojis.length} emojis found`;
                  }
                } else {
                  promoTextandStatus.innerHTML = "Sorry no post found! 😟";
                }
              });
            }
            // now press backspace and clear the dom

            if (e.key === "Backspace" || e.keyCode === 8) {
              promoTextandStatus.innerHTML = "Find the emoji of your choice";
              document.querySelector(".post_wrapper").innerHTML = "";
            }
        
        }
          
    
    });
   

    



});
