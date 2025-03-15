(() => {
    const self = {};
  
    // page should contains .product-detail element
    const hasProductDetail = () => {
      return document.querySelector('.product-detail') !== null;
    };
  
    // entry
    const init = () => {
      if (hasProductDetail()) {
        console.log('Product detail page detected. Carousel code initialized.');
  
      } else {
        console.log('Not a product detail page. Carousel not initialized.');
      }
    };
  
    // Immediately invoke init
    init();
  })();
  