

document.getElementById("form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const inputs = e.target.querySelectorAll("input");

    const data = {
        username: inputs[0].value,
        email: inputs[1].value,
        dateOfBirth: inputs[2].value
    };

    try {
        const res = await fetch("https://birthday-remainder-ltti.onrender.com/api/users", {
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
        alert("Server not reachable");
        console.error(err);
    }
});
