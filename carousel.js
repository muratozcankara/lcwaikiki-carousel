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
    };
    
    // Build HTML for the carousel
    const buildHTML = () => {
      const html = `
        <div class="carousel-container">
          <h1>You Might Also Like</h1>
          <p>Product carousel will appear here soon...</p>
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
        .carousel-container h2 {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 15px;
        }
        /* More styles wil be added later */
      `;

      $('<style>').addClass('carousel-style').html(css).appendTo('head');
    };
  
    // Entry point
    const init = async () => {
      if (hasProductDetail()) {
        console.log('Product detail page detected. Carousel code initialized.');
        await loadProducts();  // Load products
        buildHTML();  // Build and append HTML
        buildCSS();  // Build and append CSS
      } else {
        console.log('Not a product detail page. Carousel not initialized.');
      }
    };
  

    init();

})();
  