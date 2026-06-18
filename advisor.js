window.analyze = async function () {

    const product = document.getElementById("product").value.trim();
    const platform = document.getElementById("platform").value;

    if (!product || !platform) {
        alert("Enter product & platform");
        return;
    }

    try {

        const url = `https://real-time-product-search.p.rapidapi.com/search?q=${encodeURIComponent(product)}&country=in&language=en`;

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'YOUR_API_KEY',
                'X-RapidAPI-Host': 'real-time-product-search.p.rapidapi.com'
            }
        };

        const res = await fetch(url, options);
        const data = await res.json();

        if (!data.data || !data.data.products) {
            alert("No product found");
            return;
        }

        let minPrice = 1000;

        if (product.toLowerCase().includes("iphone")) {
            minPrice = 50000;
        }

        let validProducts = data.data.products.filter(item => {

            let priceText =
                item.product_price ||
                item.offer?.price ||
                item.price ||
                null;

            if (!priceText) return false;

            let price = parseInt(priceText.toString().replace(/[₹,]/g, ""));

            if (isNaN(price)) return false;

            return price > minPrice;
        });

        if (validProducts.length === 0) {
            alert("No reliable product data found");
            return;
        }

        let item = validProducts[0];

        let title = item.product_title || product;

        let priceText =
            item.product_price ||
            item.offer?.price ||
            item.price;

        let price = parseInt(priceText.toString().replace(/[₹,]/g, ""));

        localStorage.setItem("p_product", title);
        localStorage.setItem("p_price", price);
        localStorage.setItem("p_platform", platform);

        window.location.href = "advisor-result.html";

    } catch (err) {
        console.error(err);
        alert("Error fetching product");
    }
};
