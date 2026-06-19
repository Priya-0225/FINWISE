window.analyze = async function () {

    const product = document.getElementById("product").value.trim();
    const platform = document.getElementById("platform").value;

    if (!product || !platform) {
        alert("Enter product & platform");
        return;
    }

    const apiKey = "YOUR_API_KEY";

    if (apiKey === "YOUR_API_KEY") {

        let manual = prompt("API key not configured.\n\nEnter estimated price manually:");

        if (!manual) return;

        let price = parseInt(manual);

        if (isNaN(price)) {
            alert("Invalid price");
            return;
        }

        localStorage.setItem("p_product", product);
        localStorage.setItem("p_price", price);
        localStorage.setItem("p_platform", platform);

        window.location.href = "advisor-result.html";
        return;
    }

    try {

        const url = `https://real-time-product-search.p.rapidapi.com/search?q=${encodeURIComponent(product)}&country=in&language=en`;

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': 'real-time-product-search.p.rapidapi.com'
            }
        };

        const res = await fetch(url, options);
        const data = await res.json();

        if (!data.data || !data.data.products) {
            throw new Error("No data");
        }

        let minPrice = product.toLowerCase().includes("iphone") ? 50000 : 1000;

        let validProducts = data.data.products.filter(item => {

            let priceText =
                item.product_price ||
                item.offer?.price ||
                item.price ||
                null;

            if (!priceText) return false;

            let price = parseInt(priceText.toString().replace(/[₹,]/g, ""));

            return !isNaN(price) && price > minPrice;
        });

        if (validProducts.length === 0) throw new Error("No valid products");

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

        let manual = prompt("Could not fetch reliable data.\n\nEnter estimated price manually:");

        if (!manual) return;

        let price = parseInt(manual);

        if (isNaN(price)) {
            alert("Invalid price");
            return;
        }

        localStorage.setItem("p_product", product);
        localStorage.setItem("p_price", price);
        localStorage.setItem("p_platform", platform);

        window.location.href = "advisor-result.html";
    }
};
