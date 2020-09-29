<template>
    <div class="content">
        <h1>open a new tab and create a new router for editting</h1>
        <el-button @click="openEdit">open edit tab</el-button>
    </div>
</template>

<script>
    import {Button} from 'element-ui'
    import {createRouterAndPush} from '@/utils/router-util'
    export default {
        name: 'DemoEditablePage',
        components: {
            'el-button': Button
        },
        computed: {
        },
        methods: {
            openEdit() {
                createRouterAndPush('/DemoEditablePage', 'edit')
            }
        }
    }
</script>

<style scoped>

</style>
