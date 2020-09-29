<template>
    <el-submenu v-if="menuItem.children" :index="menuItem.path" :popper-append-to-body="false">
        <template slot="title">
            <i :class="menuItem.icon"></i>
            <span slot="title">{{menuItem.label}}</span>
        </template>
        <template v-for="(item, index) in menuItem.children">
            <XSideMenuItem :menuItem="item" :key="index"></XSideMenuItem>
        </template>
    </el-submenu>
    <el-menu-item v-else :index="menuItem.path">
        <i :class="menuItem.icon"></i>
        <span slot="title">{{menuItem.label}}</span>
    </el-menu-item>
</template>

<script>
import {
    MenuItem,
    Submenu
} from 'element-ui'
import { XMenuItem } from '@/module/XMenuItem.ts'
export default {
    name: 'XSideMenuItem',
    components: {
        'el-menu-item': MenuItem,
        'el-submenu': Submenu
    },
    props: {
        menuItem: XMenuItem
    }
}
</script>

<style scoped>
    .el-submenu {
        position: static;
    }
</style>
