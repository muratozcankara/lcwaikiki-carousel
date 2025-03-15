(() => {
    const self = {};
  
    // page should contains .product-detail element
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
  
    // Entry point
    const init = async () => {
      if (hasProductDetail()) {
        console.log('Product detail page detected. Carousel code initialized.');
        await loadProducts();  // wilload products

      } else {
        console.log('Not a product detail page. Carousel not initialized.');
      }
    };
  

    init();

})();
  