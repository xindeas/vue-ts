<template>
    <div class="header">
        <i :class="getClass" @click="collapse"></i>
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <transition-group name="breadcrumb">
                    <template v-for="(item, index) in breadcrumb">
                        <el-breadcrumb-item :key="item" v-if="item">{{item}}</el-breadcrumb-item>
                    </template>
                </transition-group>
            </el-breadcrumb>
        </div>
        <div class="header-right">
            <el-dropdown @command="handleCommand">
                <el-avatar fit="cover" :src="user.avatar"></el-avatar>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="profile">个人主页</el-dropdown-item>
                    <el-dropdown-item command="logout" class="danger-drop-item" divided>退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
    import {
        Breadcrumb,
        BreadcrumbItem,
        Dropdown,
        DropdownMenu,
        DropdownItem,
        Avatar
    } from 'element-ui'
    import {logout} from '@/utils/common-util'
    export default {
        name: 'XHeader',
        components: {
            'el-breadcrumb': Breadcrumb,
            'el-breadcrumb-item': BreadcrumbItem,
            'el-dropdown': Dropdown,
            'el-dropdown-menu': DropdownMenu,
            'el-dropdown-item': DropdownItem,
            'el-avatar': Avatar
        },
        computed: {
            user() {
                return this.$store.state.user || {}
            },
            curRouter() {
                return this.$store.state.curRouter
            },
            isCollapse() {
                return this.$store.state.isCollapse
            },
            breadcrumb() {
                return this.$store.state.breadcrumbs
            },
            getClass() {
                return {
                    'el-icon-s-fold': true,
                    'fold-icon': !this.isCollapse,
                    'open-icon': this.isCollapse,
                }
            }
        },
        methods: {
            collapse() {
                this.$store.commit('isCollapse', !this.isCollapse)
            },
            handleCommand(key) {
                switch (key) {
                    case('profile'):
                        this.$router.push('/Profile')
                        break
                    case('logout'):
                        logout()
                        break
                    default:
                        break
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .header {
        background-color: white;
        font-size: 1.5em;
        display: inline-block;
        vertical-align: middle;
        height: 100%;
        width: 100%;

        &:after {
            content: '';
            height: 100%;
            display: inline-block;
            vertical-align: middle;
        }

        .el-icon-s-fold {
            display: inline-block;
            vertical-align: middle;
            cursor: pointer;
            transition: all 250ms;
            margin-right: 1em;
        }
        .fold-icon {
            transform: rotate(0);
        }
        .open-icon {
            transform: rotate(180deg);
        }
        .header-right {
            height: 100%;
            display: flex;
            align-items: center;
            float: right;

            .el-avatar {
                cursor: pointer;
            }
        }
    }

    .breadcrumb {
        display: inline-block;
        vertical-align: middle;
    }

    .danger-drop-item {
        color: #F56C6C;
    }
    .danger-drop-item:hover {
        color: #F56C6C;
        background-color: #FDE2E2;
    }

    /* breadcrumb transition */
    .breadcrumb-enter-active,
    .breadcrumb-leave-active {
        transition: all .5s;
    }
    .breadcrumb-enter,
    .breadcrumb-leave-active {
        position: absolute;
        opacity: 0;
        transform: translateX(20px);
    }
</style>
