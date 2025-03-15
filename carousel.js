(() => {
    const self = {};
  
    // page should contains .product-detail element or do not start
    const hasProductDetail = () => {
      return document.querySelector('.product-detail') !== null;
    };
    
    // Load products either from localStorage or by fetching
    const loadProducts = async () => {
      const storedProducts = localStorage.getItem('carouselProducts');
  
      if (storedProducts) {
        // Already in localStorage
        self.products = JSON.parse(storedProducts);
        console.log('Loaded products from localStorage:', self.products);
      } else {
        // Fetch from gist URL
        const url = 'https://gist.githubusercontent.com/sevindi/5765c5812bbc8238a38b3cf52f233651/raw/56261d81af8561bf0a7cf692fe572f9e1e91f372/products.json';
  
        try {
          const response = await fetch(url);
          const data = await response.json();
          self.products = data;
          console.log('Fetched products from API:', self.products);
  
          // Save to localStorage
          localStorage.setItem('carouselProducts', JSON.stringify(self.products));
        } catch (error) {
          console.error('Error fetching products:', error);
          self.products = [];
        }
      }
      //local storage fetch favorites
      const storedFavorites = localStorage.getItem('favoriteProducts');
      self.favoriteProducts = storedFavorites ? JSON.parse(storedFavorites) : {};

    };

    // Build HTML for the carousel
    const buildHTML = () => {
      const html = `
        <div class="carousel-container">
          <h2 class="combine-products-title">You Might Also Like</h2>
          <div class="carousel padded-carousel">
            <button type="button" aria-label="previous" class="buttonBack___1mlaL carousel__back-button carousel-arrow carousel-arrow-left" disabled>
              <svg xmlns="http://www.w3.org/2000/svg" width="14.242" height="24.242" viewBox="0 0 14.242 24.242">
                <path fill="none" stroke="#333" stroke-linecap="round" stroke-width="3px" d="M2106.842 2395.467l-10 10 10 10" transform="translate(-2094.721 -2393.346)"></path>
              </svg>
            </button>
            <div class="horizontalSlider___281Ls carousel__slider carousel__slider--horizontal" aria-live="polite" aria-label="slider" role="listbox">
              <div class="carousel__slider-tray-wrapper carousel__slider-tray-wrap--horizontal">
                <div class="sliderTray___-vHFQ sliderAnimation___300FY carousel__slider-tray carousel__slider-tray--horizontal" style="display: flex; align-items: stretch; width: 100%; transform: translateX(0%) translateX(0px); flex-direction: row;">
                  ${self.products.map(product => `
                    <div aria-selected="false" aria-label="slide" role="option" class="slide___3-Nqo slideHorizontal___1NzNV carousel__slide carousel__slide--hidden" style="width: 33.3333%; padding-bottom: unset; height: unset;">
                      <div class="slideInner___2mfX9 carousel__inner-slide" style="position: unset;">
                        <div class="new-product-card">
                          <div class="new-product-card__image-wrapper">
                            <a href="${product.url}" target="_blank">
                              <img class="product-image lazyloaded" alt="Product Image" src="${product.img}">
                            </a>
                            <div class="new-product-card-like-button ${self.favoriteProducts[product.id] ? 'favorite-active' : ''}" optionid="${product.id}">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20.576" height="19.483" viewBox="0 0 20.576 19.483">
                                <path fill="none" stroke="#555" stroke-width="1.5px" d="M19.032 7.111c-.278-3.063-2.446-5.285-5.159-5.285a5.128 5.128 0 0 0-4.394 2.532 4.942 4.942 0 0 0-4.288-2.532C2.478 1.826.31 4.048.032 7.111a5.449 5.449 0 0 0 .162 2.008 8.614 8.614 0 0 0 2.639 4.4l6.642 6.031 6.755-6.027a8.615 8.615 0 0 0 2.639-4.4 5.461 5.461 0 0 0 .163-2.012z" transform="translate(.756 -1.076)"></path>
                              </svg>
                            </div>
                          </div>
                          <div class="new-product-card__information-box">
                            <div class="new-product-card__information-box__title">
                              <a href="${product.url}" target="_blank">
                                <p class="product-name">${product.name}</p>
                              </a>
                            </div>
                            <div class="new-product-card__price">
                              <div class="price__current-price">${product.price} TL</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
            <button type="button" aria-label="next" class="buttonNext___2mOCa carousel__next-button carousel-arrow carousel-arrow-right rotate-180" disabled>
              <svg xmlns="http://www.w3.org/2000/svg" width="14.242" height="24.242" viewBox="0 0 14.242 24.242">
                <path fill="none" stroke="#333" stroke-linecap="round" stroke-width="3px" d="M2106.842 2395.467l-10 10 10 10" transform="translate(-2094.721 -2393.346)"></path>
              </svg>
            </button>
          </div>
        </div>
      `;

      $('.product-detail').append(html);
    };
  
    // Build CSS for the carousel
    const buildCSS = () => {
      const css = `
        .carousel-container {
          margin-top: 40px;
          padding: 0 15px;
        }
        .combine-products-title {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 15px;
        }
        .carousel.padded-carousel {
          position: relative;
        }
        .carousel__slider {
          overflow: hidden;
          width: 100%;
        }
        .carousel__slider-tray-wrapper {
          overflow: hidden;
        }
        .carousel__slider-tray {
          display: flex;
          transition: transform 0.3s ease;
        }
        .carousel__slide {
          flex: 0 0 33.3333%;
          min-width: 0;
        }
        .new-product-card {
          background-color: #fff;
          border: 1px solid #eee;
          border-radius: 4px;
          padding: 10px;
          margin: 0 5px;
          height: 100%;
        }
        .new-product-card__image-wrapper {
          position: relative;
        }
        .product-image {
          max-width: 100%;
          height: auto;
          display: block;
          margin: 0 auto;
        }
        .new-product-card-like-button {
          position: absolute;
          top: 5px;
          right: 5px;
          cursor: pointer;
        }
        .new-product-card-like-button.favorite-active svg path {
          fill: #0077cc;
          stroke: #0077cc;
        }
        .new-product-card__information-box__title {
          margin-top: 10px;
        }
        .product-name {
          font-size: 14px;
          margin: 5px 0;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .price__current-price {
          font-size: 16px;
          font-weight: bold;
          color: #333;
          margin-top: 5px;
        }
        .carousel-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          border: none;
          background-color: rgba(0,0,0,0.1);
          color: #333;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          cursor: pointer;
          z-index: 1;
        }
        .carousel-arrow-left {
          left: 5px;
        }
        .carousel-arrow-right {
          right: 5px;
        }
        .rotate-180 {
          transform: translateY(-50%) rotate(180deg);
        }
        /* Responsive styles */
        @media (max-width: 992px) {
          .carousel__slide {
            flex: 0 0 50%;
          }
        }
        @media (max-width: 576px) {
          .carousel__slide {
            flex: 0 0 100%;
          }
        }
      `;

      $('<style>').addClass('carousel-style').html(css).appendTo('head');
    };


    // Set up event handlers
    const setEvents = () => {
      // Initialize position variable
      let currentPosition = 0;
      
      // Heart icon toggle
      $('.new-product-card-like-button').on('click', function() {
        console.log('clicked heart icon');
        $(this).toggleClass('favorite-active');
        const productId = $(this).attr('optionid');
        
        // Update favorites
        if ($(this).hasClass('favorite-active')) {
          self.favoriteProducts[productId] = true;
        } else {
          delete self.favoriteProducts[productId];
        }
        localStorage.setItem('favoriteProducts', JSON.stringify(self.favoriteProducts));
      });
      
      // Next button
      $('.carousel__next-button').on('click', function() {
        console.log('clicked next button');
        $(this).prop('disabled', false);
        $('.carousel__back-button').prop('disabled', false);
        
        currentPosition -= 320; // Move 2 items at once
        
        // Prevent scrolling too far
        const maxScroll = $('.carousel__slider-tray').width() - $('.carousel__slider').width();
        if (Math.abs(currentPosition) > maxScroll) {
          currentPosition = -maxScroll;
          $(this).prop('disabled', true);
        }
        
        $('.carousel__slider-tray').css('transform', `translateX(${currentPosition}px)`);
      });
      
      // Prev button
      $('.carousel__back-button').on('click', function() {
        console.log('clicked prev button');
        $(this).prop('disabled', false);
        $('.carousel__next-button').prop('disabled', false);
        
        currentPosition += 320; // Move 2 items at once
        if (currentPosition > 0) {
          currentPosition = 0;
          $(this).prop('disabled', true);
        }
        
        $('.carousel__slider-tray').css('transform', `translateX(${currentPosition}px)`);
      });
    };
  

    // Entry point
    const init = async () => {
      if (hasProductDetail()) {
        console.log('Product detail page detected. Carousel code initialized.');
        await loadProducts();  // Load products
        buildHTML();  // Build and append HTML
        buildCSS();  // Build and append CSS
        setEvents();  // Set up event handlers
      } else {
        console.log('Not a product detail page. Carousel not initialized.');
      }
    };
  

    init();

})();
  