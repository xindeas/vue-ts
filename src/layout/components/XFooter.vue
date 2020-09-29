<template>
    <div class="content x-footer">
        ©2020 XINDEAS All rights reserved.
    </div>
</template>

<script>
    export default {
        name: 'XFooter'
    }
</script>

<style scoped>
    .x-footer {
        display: inline-block;
        vertical-align: middle;
        font-weight: bold;
        height: 100%;
        font-size: .8em;
    }
    .x-footer:after {
        content: '';
        height: 100%;
        display: inline-block;
        vertical-align: middle;
    }
</style>
