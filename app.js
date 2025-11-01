const items = document.querySelectorAll(".gallery-item");

items.forEach((item, i) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.style.display = "none";

    item.addEventListener("click", () => input.click());

    input.addEventListener("change", e => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            item.style.backgroundImage = `url(${reader.result})`;
            localStorage.setItem(`gallery${i}`, reader.result);
        };
        reader.readAsDataURL(file);
    });

    const saved = localStorage.getItem(`gallery${i}`);
    if (saved) item.style.backgroundImage = `url(${saved})`;
});
