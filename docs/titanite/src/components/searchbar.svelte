<script lang="ts">
    let focus = false;
</script>

<div
    class={`group flex items-center w-fit space-x-2 ${
        focus
            ? "border border-primary py-2 px-3 rounded-full"
            : "border border-white py-2 px-3 rounded-full"
    }`}
>
    <i class="ti ti-search" />
    <input
        on:blur={() => (focus = false)}
        on:focus={() => (focus = true)}
        type="text"
        class="w-40 bg-black text-white focus:outline-none"
        placeholder="Search in docs"
    />
    <p class="px-3 rounded-md py-1 text-sm">/</p>
</div>
