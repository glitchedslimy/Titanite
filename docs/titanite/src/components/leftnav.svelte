<script lang="ts">
    import { onMount } from "svelte";
    import Searchbar from "./searchbar.svelte";
    import { active, showSubcategories, isFixed } from "./store.js";

    export let posts: any = [];

    const setActive = (category: string) => {
        active.set(category);
    };

    const toggleSubcategories = (show: boolean) => {
        showSubcategories.set(show);
    };

    onMount(() => {
        const checkScroll = () => {
            const scrollPosition =
                window.pageYOffset || document.documentElement.scrollTop;
            isFixed.set(scrollPosition > 0); // Set to true if not at the top of the page
        };

        window.addEventListener("scroll", checkScroll);

        return () => {
            window.removeEventListener("scroll", checkScroll);
        };
    });
</script>

<div class="w-1/4">
    <aside class={`h-screen ${$isFixed ? "sticky top-0" : ""}`}>
        <nav class="flex-col space-y-5 px-10 py-10 h-full overflow-y-auto">
            <div class="flex space-x-10">
                <button
                    on:click={() => setActive("code")}
                    class={$active === "code"
                        ? "text-xl font-medium text-primary"
                        : "text-xl font-medium"}>Code</button
                >
                <button
                    on:click={() => setActive("learning")}
                    class={$active === "learning"
                        ? "text-xl font-medium text-primary"
                        : "text-xl font-medium"}>Learning</button
                >
            </div>
            <Searchbar />
            <ul class="overflow-y-auto max-h-[37rem] w-[20rem]">
                {#each posts as post}
                    {#if post.frontmatter.subcategory}
                        {#if post.frontmatter.category === $active}
                            <li>
                                <button
                                    on:click={() =>
                                        toggleSubcategories(
                                            !$showSubcategories,
                                        )}
                                    class="py-2 flex items-center space-x-2 hover:text-white px-2"
                                >
                                    <i
                                        class={`ti ti-${
                                            post.frontmatter.icon
                                        } ${
                                            post.frontmatter.iconColor.includes(
                                                "#",
                                            )
                                                ? ""
                                                : `text-${post.frontmatter.iconColor}`
                                        }`}
                                        style={`color: ${
                                            post.frontmatter.iconColor.includes(
                                                "#",
                                            )
                                                ? `${post.frontmatter.iconColor}`
                                                : ""
                                        }`}
                                    />

                                    <span
                                        class={`${
                                            $showSubcategories
                                                ? "text-primary transition duration-300 "
                                                : "text-[#c4c4c4] hover:text-white duration-300 transition"
                                        }`}>{post.frontmatter.subcategory}</span
                                    >
                                    <i
                                        class={`ti ti-chevron-right transition duration-300 ${
                                            $showSubcategories
                                                ? "rotate-90"
                                                : "rotate-0"
                                        }`}
                                    />
                                </button>
                                {#if $showSubcategories}
                                    <ul>
                                        <li class="py-2">
                                            <a
                                                href={`/docs/${post.frontmatter.slug}`}
                                                >{post.frontmatter.title}</a
                                            >
                                        </li>
                                    </ul>
                                {/if}
                            </li>
                        {/if}
                    {:else if post.frontmatter.category === $active}
                        <a href={`/docs/${post.frontmatter.slug}`}
                            >{post.frontmatter.title}</a
                        >
                    {/if}
                {/each}
            </ul>
        </nav>
    </aside>
</div>
