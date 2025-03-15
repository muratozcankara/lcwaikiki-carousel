(() => {
    const self = {};
  
    // page should contains .product-detail element or do not start
    const hasProductDetail = () => {
      return document.querySelector('.product-detail') !== null;
    };
    
    // Load products either from localStorage or by fetching
    const loadProducts = async () => {
      const cachedProducts = localStorage.getItem('carouselProducts');
      const favorites = JSON.parse(localStorage.getItem('favoriteProducts')) || {};
  
      if (cachedProducts) {
        const products = JSON.parse(cachedProducts);
        // Update products with favorite stas
        const updatedProducts = products.map(product => ({
          ...product,
          isFavorite: favorites[product.id] === true
        }));
        self.products = updatedProducts;
        console.log('Loaded products from localStorage:');
      } else {
        // Fetch from gist URL
        const url = 'https://gist.githubusercontent.com/sevindi/5765c5812bbc8238a38b3cf52f233651/raw/56261d81af8561bf0a7cf692fe572f9e1e91f372/products.json';
  
        try {
          const response = await fetch(url);
          const data = await response.json();
          // Update products with favorite status before saving
          const updatedProducts = data.map(product => ({
            ...product,
            isFavorite: favorites.includes(product.id)
          }));
          self.products = updatedProducts;
          console.log('Fetched products from API:', self.products);
  
          // Save to localStorage
          localStorage.setItem('carouselProducts', JSON.stringify(data));
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
        <div class="recommendation-carousel custom-recommendation-carousel">
          <div class="carousel-container">
            <p class="combine-products-title">You Might Also Like</p>
            <div class="carousel padded-carousel">
              <button type="button" aria-label="previous" class="buttonBack___1mlaL carousel__back-button carousel-arrow carousel-arrow-left custom-prev-btn" disabled>
                <svg xmlns="http://www.w3.org/2000/svg" width="14.242" height="24.242" viewBox="0 0 14.242 24.242">
                  <path fill="none" stroke="#333" stroke-linecap="round" stroke-width="3px" d="M2106.842 2395.467l-10 10 10 10" transform="translate(-2094.721 -2393.346)"></path>
                </svg>
              </button>
              <div class="horizontalSlider___281Ls carousel__slider carousel__slider--horizontal custom-slider" aria-live="polite" aria-label="slider" role="listbox">
                <div class="carousel__slider-tray-wrapper carousel__slider-tray-wrap--horizontal">
                  <div class="sliderTray___-vHFQ sliderAnimation___300FY carousel__slider-tray carousel__slider-tray--horizontal custom-slider-tray" style="display: flex; align-items: stretch; width: ${self.products.length * 33.3333}%; transform: translateX(0px); flex-direction: row;">
                    ${self.products.map(product => `
                      <div aria-selected="false" aria-label="slide" role="option" class="slide___3-Nqo slideHorizontal___1NzNV carousel__slide carousel__slide--hidden custom-slide" style="width: 33.3333%; padding-bottom: unset; height: unset;">
                        <div class="slideInner___2mfX9 carousel__inner-slide" style="position: unset;">
                          <div class="new-product-card">
                            <div class="new-product-card__image-wrapper">
                              <a href="${product.url}">
                              <img class="product-image lazyloaded" alt="Product Image" src="${product.img}" data-src="${product.img}">
                          </a>
                          <div class="new-product-card-like-button custom-like-btn ${product.isFavorite ? 'new-product-card-like-button-fav' : ''}" optionid="${product.id}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20.576" height="19.483" viewBox="0 0 20.576 19.483">
                                  <path fill="none" stroke="#555" stroke-width="1.5px" d="M19.032 7.111c-.278-3.063-2.446-5.285-5.159-5.285a5.128 5.128 0 0 0-4.394 2.532 4.942 4.942 0 0 0-4.288-2.532C2.478 1.826.31 4.048.032 7.111a5.449 5.449 0 0 0 .162 2.008 8.614 8.614 0 0 0 2.639 4.4l6.642 6.031 6.755-6.027a8.615 8.615 0 0 0 2.639-4.4 5.461 5.461 0 0 0 .163-2.012z" transform="translate(.756 -1.076)"></path>
                                </svg>
                              </div>
                            </div>
                            <div class="new-product-card__information-box">
                              <div class="new-product-card__information-box__title">
                                <a href="${product.url}">
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
              <button type="button" aria-label="next" class="buttonNext___2mOCa carousel__next-button carousel-arrow carousel-arrow-right rotate-180 custom-next-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="14.242" height="24.242" viewBox="0 0 14.242 24.242">
                  <path fill="none" stroke="#333" stroke-linecap="round" stroke-width="3px" d="M2106.842 2395.467l-10 10 10 10" transform="translate(-2094.721 -2393.346)"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      `;

      $('.product-detail').append(html);
    };
  
    // Build CSS for the carousel
    const buildCSS = () => {
      const css = `
        .custom-recommendation-carousel {
          margin-top: 40px;
        }
        .carousel-container {
          padding: 0 15px;
          display: flex;
          gap: 20px;
          transition: transform 0.3s ease-out;
          touch-action: pan-x;
          -webkit-overflow-scrolling: touch;
        }
        .combine-products-title {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 15px;
        }
        .carousel.padded-carousel {
          position: relative;
        }
        .custom-slider {
          overflow: hidden;
          width: 100%;
        }
        .carousel__slider-tray-wrapper {
          overflow: hidden;
        }
        .custom-slider-tray {
          display: flex;
          transition: transform 0.3s ease;
          flex-wrap: nowrap;
        }
        .custom-slide {
          flex: 0 0 33.3333%;
          min-width: 0;
          padding: 0;
          box-sizing: border-box;
        }
        .new-product-card {
          background-color: #fff;
          border: 1px solid #eee;
          border-radius: 4px;
          padding: 0;
          margin: 0;
          height: 100%;
          box-sizing: border-box;
        }
        .new-product-card__image-wrapper {
          position: relative;
        }
        .product-image {
          width: 100%;
          height: auto;
          display: block;
          margin: 0 auto;
        }
        .new-product-card-like-button {
          position: absolute;
          top: 10px;
          right: 10px;
          cursor: pointer;
          background: white;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .new-product-card-like-button.favorite-active svg path,
        .new-product-card-like-button.new-product-card-like-button-fav svg path {
          fill: #0077cc;
          stroke: #0077cc;
        }
        .new-product-card__information-box {
          padding: 10px;
        }
        .new-product-card__information-box__title {
          margin-top: 0;
        }
        .product-name {
          font-size: 14px;
          margin: 5px 0;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          height: 40px;
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
          background-color: rgba(255,255,255,0.8);
          color: #333;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          cursor: pointer;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 5px rgba(0,0,0,0.2);
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
        .carousel-arrow:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        /* Responsive styles */
        @media (max-width: 1200px) {
          .carousel-wrapper {
            max-width: 960px;
          }
        }
        @media (max-width: 992px) {
          .carousel-wrapper {
            max-width: 720px;
          }
        }
        @media (max-width: 768px) {
          .carousel-wrapper {
            max-width: 540px;
          }
        }
        @media (max-width: 576px) {
          .carousel-wrapper {
            max-width: 100%;
            padding: 0 15px;
          }
        }
      `;

      $('<style>').addClass('carousel-style').html(css).appendTo('head');
    };


    // Set up event handlers
    const setEvents = () => {
      // Initialize position variable
      let currentPosition = 0;
      let slideWidth = 0;
      let visibleSlides = 0;
      
      // Calculate visible slides based on screen width
      const calculateVisibleSlides = () => {
        const windowWidth = $(window).width();
        if (windowWidth <= 576) {
          visibleSlides = 1;
        } else if (windowWidth <= 768) {
          visibleSlides = 2;
        } else if (windowWidth <= 992) {
          visibleSlides = 3;
        } else if (windowWidth <= 1200) {
          visibleSlides = 4;
        } else if (windowWidth <= 1444) {
          visibleSlides = 5;
        } else {
          visibleSlides = 6;
        }
        
        // Calculate total width of the slider tray
        const totalWidth = (self.products.length / visibleSlides) * 100;
        $('.custom-slider-tray').css('width', totalWidth + '%');
        
        // Recalculate slide width
        slideWidth = $('.custom-slider').width() / visibleSlides;
        $('.custom-slide').css({
          'width': (100 / self.products.length) + '%',
          'flex-basis': (100 / self.products.length) + '%'
        });
        
        // Reset position if needed
        if (Math.abs(currentPosition) > $('.custom-slider-tray').width() - $('.custom-slider').width()) {
          currentPosition = 0;
          $('.custom-slider-tray').css('transform', `translateX(${currentPosition}px)`);
        }
        
        // Update button states
        updateButtonStates();
      };
      
      // Update button states
      const updateButtonStates = () => {
        // Enable/disable prev button
        if (currentPosition >= 0) {
          $('.custom-prev-btn').prop('disabled', true);
        } else {
          $('.custom-prev-btn').prop('disabled', false);
        }
        
        // Enable/disable next button
        const maxScroll = $('.custom-slider-tray').width() - $('.custom-slider').width();
        if (Math.abs(currentPosition) >= maxScroll) {
          $('.custom-next-btn').prop('disabled', true);
        } else {
          $('.custom-next-btn').prop('disabled', false);
        }
      };
      
      // Calculate initial values
      calculateVisibleSlides();
      
      // Recalculate on window resize
      $(window).on('resize', calculateVisibleSlides);
      
      // Heart icon toggle
      $('.custom-like-btn').on('click', function(e) {
        console.log('clicked heart icon');
        e.preventDefault();
        e.stopPropagation();
        
        $(this).toggleClass('new-product-card-like-button-fav');
        const productId = $(this).attr('optionid');
        
        // Update favorites
        if ($(this).hasClass('new-product-card-like-button-fav')) {
          self.favoriteProducts[productId] = true;
        } else {
          delete self.favoriteProducts[productId];
        }
        localStorage.setItem('favoriteProducts', JSON.stringify(self.favoriteProducts));
      });
      
      // Next button
      $('.custom-next-btn').on('click', function() {
        console.log('clicked next button');
        
        // Calculate how many slides to move
        const moveBy = slideWidth * visibleSlides;
        currentPosition -= moveBy;
        
        // Prevent scrolling too far
        const maxScroll = $('.custom-slider-tray').width() - $('.custom-slider').width();
        if (Math.abs(currentPosition) > maxScroll) {
          currentPosition = -maxScroll;
        }
        
        // Apply the transform
        $('.custom-slider-tray').css('transform', `translateX(${currentPosition}px)`);
        
        // Update button states
        updateButtonStates();
      });
      
      // Prev button
      $('.custom-prev-btn').on('click', function() {
        console.log('clicked prev button');
        
        // Calculate how many slides to move
        const moveBy = slideWidth * visibleSlides;
        currentPosition += moveBy;
        
        // Prevent scrolling too far
        if (currentPosition > 0) {
          currentPosition = 0;
        }
        
        // Apply the transform
        $('.custom-slider-tray').css('transform', `translateX(${currentPosition}px)`);
        
        // Update button states
        updateButtonStates();
      });
      
      // Initial button state
      updateButtonStates();
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
  