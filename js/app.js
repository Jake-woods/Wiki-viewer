$(document).ready(() => {
   const searchForm = $('.search-form');
   const urlSetup = 'https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=';
   const contentContainer = $('.content');

   // Scroll into view on reload (Needed)
   searchForm[0].scrollIntoView();

   $('.nav__list').on('click', (e) => {
      // Remove active
      $('.nav__list').find('a').removeClass('nav__link--active');
      // Add to active
      if ($(e.target).parent().is('a')) {
         $(e.target).parent().addClass('nav__link--active');
      }
   })

   // Function to create search query element
   // Displays what the user searched for
   const searchQueryEle = (input) => {
      const h1 = document.createElement('h1');
      $(h1).text(`Search results for: ${input}`);

      $(contentContainer).append(h1);
   }

   // Function to create item returned from api
   const itemEle = (textTitle, textBody, textLink) => {
      const article = document.createElement('article');
      const h3 = document.createElement('h3');
      const p = document.createElement('p');
      const link = document.createElement('a');

      $(h3).text(textTitle);
      $(p).text(textBody);
      $(link).attr('href', textLink);
      $(link).text('Wikipedia link');

      // Append to article contaienr for each item
      $(article).append(h3);
      $(article).append(p);
      $(article).append(link);

      // Append to parent element for all articles
      contentContainer.append(article);
   }

   // Form submit and behaviour
   $(searchForm).on('submit', (e) => {
      const searchInput = $('.search-form__input').val();

      // Fade loader in
      $('.fetching-content__c1').addClass('fadeIn');
      // Allow nav button to move page to content
      // Now that there is content to show
      $('#link-to-content').attr('href', '#content');

      // Fetch data from Wiki
      $.ajax({
         url: `${urlSetup}${searchInput}`,
         success: (obj) => {
            searchQueryEle(searchInput);

            for (let i = 0; i < obj[1].length; i++) {
               itemEle(obj[1][i], obj[2][i], obj[3][i]);
            }

            // Remove loader and scroll returned content into view
            $('.fetching-content__c1').addClass('fadeOut');
            $('.content')[0].scrollIntoView();
         }
      })

      // Reset and prevent form defaults
      searchForm.trigger("reset");
      e.preventDefault();
   })
})