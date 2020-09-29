<template>
        <el-menu
                :default-active="defaultActive"
                :collapse="isCollapse"
                class="el-menu-vertical-demo"
                router
                unique-opened
                background-color="#43454c"
                text-color="#ffffff"
        >
            <div index="/Home" class="menu-title" @click="logoClick">
                <img class="logo-pic" src="@/assets/img/logo.png">
                <span v-show="!isCollapse" slot="title">{{sysName}}</span>
            </div>
            <template v-for="(item, index) in menuList">
                <XSideMenuItem :menuItem="item" :key="index"></XSideMenuItem>
            </template>
        </el-menu>
</template>

<script>
import {
    Menu,
    MenuItem,
    Submenu
} from 'element-ui'
import XSideMenuItem from './XSideMenuItem';
import {DEFAULT_TAG, SYS_NAME} from '@/config';
export default {
    name: 'XSideMenu',
    components: {
        'el-menu': Menu,
        'el-menu-item': MenuItem,
        'el-submenu': Submenu,
        XSideMenuItem
    },
    props: {
        menuList: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
        }
    },
    computed: {
        isCollapse() {
            return this.$store.state.isCollapse
        },
        sysName() {
            return SYS_NAME;
        },
        menuClass() {
            return {
                'el-menu': true,
                'open-menu': !this.isCollapse
            }
        },
        defaultActive() {
            return this.$store.state.curRouter
        }
    },
    methods: {
        logoClick() {
            this.$router.push(DEFAULT_TAG)
        }
    }
}
</script>

<style scoped>
    .el-menu {
        height: 100%;
        position: static;
    }
    .menu-title {
        width: 100%;
        display: flex;
        align-items: center;
        height: 4em;
        cursor: pointer;
    }
    .menu-title img {
        width: 2em;
        height: 2em;
        margin-left: 1em;
        display: inline-block;
    }
    .menu-title span {
        font-weight: bold;
        font-size: 1em;
        display: inline-block;
        margin-left: 0.5em;
        color: white;
        white-space: nowrap;
        word-break: keep-all;
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 15em;
    }
</style>
