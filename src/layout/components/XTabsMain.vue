<template>
    <div class="content x-tabs-main">
        <div class="tabs-bar">
            <template v-for="(item, index) of routerList">
                <el-tag
                        :key="index"
                        :effect="isCurTag(item.path)"
                        @click="tagClick(item)"
                        @close="tagClose(item.path)"
                        :closable="item.closable">
                    {{item.label}}
                </el-tag>
            </template>
        </div>
        <div class="router-view">
            <transition name="routerview">
                <keep-alive :include="cacheInclude">
                    <router-view/>
                </keep-alive>
            </transition>
        </div>
    </div>
</template>

<script>
import {
    Tag
} from 'element-ui'
import {closeTag} from '@/utils/router-util';
export default {
    name: 'XTabsMain',
    components: {
        'el-tag': Tag
    },
    data: () => {
        return {
        }
    },
    computed: {
        cacheInclude() {
            const arr = this.$store.state.recentRouters.map((item) => item.name)
            arr.push('Layout')
            return arr
        },
        routerList() {
            return this.$store.state.recentRouters
        },
        curRouter() {
            return this.$store.state.curRouter
        }
    },
    methods: {
        tagClick(item) {
            this.$router.push(item)
        },
        tagClose(path) {
            closeTag(path)
        },
        isCurTag(path) {
            if (path === this.curRouter) {
                return 'dark'
            }
            return 'plain'
        }
    }
}
</script>

<style scoped>
    .x-tabs-main {
        box-sizing: border-box;
        overflow: hidden;
    }
    .tabs-bar {
        box-sizing: border-box;
        height: 40px;
        overflow: auto;
        white-space: nowrap;
    }
    .el-tag {
        margin-right: 0.5em;
        cursor: pointer;
        transition: all .5s;
    }
    .router-view {
        height: calc(100% - 40px);
    }

    /* routerview transition */
    .routerview-enter-active,
    .routerview-leave-active {
        position: absolute;
        transition: all .5s;
    }
    .routerview-enter,
    .routerview-leave-active {
        opacity: 0;
        transform: translateX(200px);
    }
</style>
