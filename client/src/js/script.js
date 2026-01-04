document.getElementById("form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const button = e.target.querySelector("button");
    const originalText = button.textContent;
    button.textContent = "Sending...";
    button.disabled = true;

    const inputs = e.target.querySelectorAll("input");

    const data = {
        username: inputs[0].value.trim(),
        email: inputs[1].value.trim(),
        dateOfBirth: inputs[2].value
    };

    console.log(" Sending:", data);

    try {
        const response = await fetch("https://birthday-remainder-ltti.onrender.com/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        console.log(" Status:", response.status);

        // Get response as text first
        const text = await response.text();
        console.log(" Raw response:", text);

        let result;
        try {
            result = JSON.parse(text);
        } catch (jsonError) {
            console.error(" Not JSON. Is backend returning HTML?");
            console.error("Raw text:", text.substring(0, 200)); // First 200 chars

            // Check if it's HTML
            if (text.includes('<!DOCTYPE') || text.includes('<html>')) {
                throw new Error("Backend returned HTML error page. Check server logs.");
            }
            throw new Error(`Invalid response: ${text.substring(0, 100)}`);
        }

        if (!response.ok) {
            throw new Error(result.error || result.message || `Error ${response.status}`);
        }

        alert(" " + (result.message || "Birthday reminder set successfully!"));
        e.target.reset();

    } catch (error) {
        console.error(" Full error:", error);
        alert(" " + error.message);
    } finally {
        button.textContent = originalText;
        button.disabled = false;
    }
});