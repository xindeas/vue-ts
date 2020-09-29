<template>
    <div class="content layout">
        <el-container class="holl-container">
            <el-aside width="auto">
                <XSideMenu :menu-list="menuList"></XSideMenu>
            </el-aside>
            <el-container>
                <el-header>
                    <XHeader></XHeader>
                </el-header>
                <el-main>
                    <XTabsMain></XTabsMain>
                </el-main>
                <el-footer>
                    <XFooter></XFooter>
                </el-footer>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import {
    Container,
    Aside,
    Header,
    Footer,
    Main
} from 'element-ui'
import XSideMenu from './components/XSideMenu'
import XHeader from './components/XHeader'
import XFooter from './components/XFooter'
import XTabsMain from './components/XTabsMain'

export default {
        name: 'Layout',
        components: {
            'el-container': Container,
            'el-aside': Aside,
            'el-header': Header,
            'el-footer': Footer,
            'el-main': Main,
            XSideMenu,
            XHeader,
            XTabsMain,
            XFooter
        },
        data: () => {
            return {}
        },
        computed: {
            menuList() {
                return this.$store.state.menuList
            }
        }
    }
</script>

<style scoped>
    .layout {
        padding: 0;
    }
    .holl-container {
        height: 100%;
        width: 100%;
    }
    .el-aside {
        height: 100%;
        box-shadow: 0 0 15px 0 #999;
    }

    .el-main {
        margin-top: 0;
        padding-top: 0;
        padding-bottom: 0;
        box-sizing: border-box;
    }
</style>
