
window.analyze = async function () {

    const product = document.getElementById("product").value.trim();
    const platform = document.getElementById("platform").value;

    if (!product || !platform) {
        alert("⚠️ Enter product & platform");
        return;
    }

    const API_KEY = "your-key"; // 🔒 Keep "your-key" 

    // ================= DEMO MODE =================
    if (!API_KEY || API_KEY === "your-key") {

        console.log("⚡ Demo mode activated");

        
        let demoPrice = Math.floor(Math.random() * (60000 - 10000)) + 10000;

        localStorage.setItem("p_product", product);
        localStorage.setItem("p_price", demoPrice);
        localStorage.setItem("p_platform", platform);

        window.location.href = "advisor-result.html";
        return;
    }

    // ================= REAL API MODE =================
    try {

        const url = `https://real-time-product-search.p.rapidapi.com/search?q=${encodeURIComponent(product)}&country=in&language=en`;

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': API_KEY,
                'X-RapidAPI-Host': 'real-time-product-search.p.rapidapi.com'
            }
        };

        console.log("🔄 Fetching from RapidAPI...");

        const res = await fetch(url, options);
        const data = await res.json();

        console.log("FULL RESPONSE:", data);

        if (!data.data || !data.data.products || data.data.products.length === 0) {
            alert("No product found");
            return;
        }

        let item = data.data.products[0];

        let title = item.product_title || product;

        let priceText =
            item.product_price ||
            item.offer?.price ||
            item.price ||
            null;

        if (!priceText) {
            alert("Price not available for this product");
            return;
        }

        let price = parseInt(priceText.toString().replace(/[₹,]/g, ""));

        if (isNaN(price)) {
            alert("Invalid price format");
            return;
        }

        console.log("Title:", title);
        console.log("Price:", price);

        localStorage.setItem("p_product", title);
        localStorage.setItem("p_price", price);
        localStorage.setItem("p_platform", platform);

        window.location.href = "advisor-result.html";

    } catch (err) {
        console.error("ERROR:", err);
        alert("Error fetching from RapidAPI");
    }
};