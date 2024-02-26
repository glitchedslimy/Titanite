<script>
    import { onMount } from "svelte";
    import "../styles/prism/prism.js";
    import confetti from "canvas-confetti";

    let selected = "npm";
    let highlightedCode = "";

    function handleClick(option) {
        selected = option;
        highlightedCode = Prism.highlight(
            `${selected} ${
                selected === "yarn" || selected === "pnpm" ? "add" : "install"
            } titanite`,
            Prism.languages.bash,
            "bash",
        );
    }

    function firework() {
        var duration = 2 * 1000;
        var animationEnd = Date.now() + duration;
        var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        var interval = setInterval(function () {
            var timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            var particleCount = 50 * (timeLeft / duration);
            confetti({
                particleCount,
                origin: { x: Math.random(), y: Math.random() - 0.2 },
                ...defaults,
            });
        }, 250);
    }

    onMount(() => {
        handleClick(selected);
    });

    function showToast(message) {
        // Create toast element
        const toast = document.createElement("div");
        toast.textContent = message;
        toast.style.position = "fixed";
        toast.style.bottom = "20px";
        toast.style.left = "20px";
        toast.style.borderRadius = "5px";
        toast.style.padding = "10px";
        toast.style.backgroundColor = "#00d557";
        toast.style.color = "#05101b";
        toast.style.opacity = "0";
        toast.style.transition = "opacity 0.5s";

        // Add toast to body
        document.body.appendChild(toast);

        // Show toast
        setTimeout(() => {
            toast.style.opacity = "1";
        }, 0);

        // Hide and remove toast after 3 seconds
        setTimeout(() => {
            toast.style.opacity = "0";
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 500);
        }, 3000);
    }

    function copyToClipboard(callback) {
        navigator.clipboard.writeText(`${selected} install titanite`);
        callback(`Copied to clipboard!`);
        firework();
    }
</script>

<section class="inline-block my-10 bg-[#292c33] rounded-md">
    <div class="flex items-center">
        <button
            on:click={() => handleClick("npm")}
            class={selected === "npm"
                ? "bg-primary text-black px-4 py-2 rounded-tl-md flex items-center justify-center space-x-1"
                : "px-4 py-2 hover:bg-[#373b45] rounded-tl-md flex items-center justify-center space-x-1"}
            ><i class="ti ti-brand-npm" /><span>npm</span></button
        >
        <button
            on:click={() => handleClick("yarn")}
            class={selected === "yarn"
                ? "bg-primary text-black px-4 py-2 flex items-center justify-center space-x-1"
                : "px-4 py-2 hover:bg-[#373b45] flex items-center justify-center space-x-1"}
            ><i class="ti ti-brand-yarn" /><span>yarn</span></button
        >
        <button
            on:click={() => handleClick("pnpm")}
            class={selected === "pnpm"
                ? "bg-primary text-black px-4 py-2 rounded-tr-md flex items-center justify-center space-x-1 transition duration-500"
                : "px-4 py-2 hover:bg-[#373b45] rounded-tr-md flex items-center justify-center space-x-1"}
            ><i class="ti ti-brand-pnpm" /><span>pnpm</span></button
        >
    </div>
    <div class="my-4 flex items-center justify-center space-x-5 no-prose">
        <pre class="no-prose"><code class="language-bash no-prose"
                >{@html highlightedCode}</code
            ></pre>
        <button
            on:click={() =>
                copyToClipboard(() => showToast("Copied to clipboard!"))}
            class="hover:text-primary transition duration-500"
            ><i class="ti ti-copy" /></button
        >
    </div>
</section>
