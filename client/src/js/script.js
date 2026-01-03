// In client/src/js/script.js
document.getElementById("form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const inputs = e.target.querySelectorAll("input");

    const data = {
        username: inputs[0].value,
        email: inputs[1].value,
        dateOfBirth: inputs[2].value
    };

    try {
        // Use relative path since API is on same domain
        const res = await fetch("/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await res.json();

        if (!res.ok) {
            alert(result.error || "Something went wrong");
            return;
        }

        alert(result.message);
        e.target.reset();
    } catch (err) {
        alert("Server error. Please try again.");
        console.error(err);
    }
});