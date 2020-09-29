<template>
    <div id="app">
        <transition name="appmain"
                    :enter-class="enterClass"
                    :leave-to-class="leaveActiveClass">
            <router-view/>
        </transition>
    </div>
</template>
<script>
    export default {
        name: 'App',
        computed: {
            curRouter() {
                return this.$store.state.curRouter
            },
            enterClass() {
                if (this.curRouter === '/Login') {
                    return 'anim-left'
                } else {
                    return 'anim-right'
                }
            },
            leaveActiveClass() {
                if (this.curRouter === '/Login') {
                    return 'anim-right'
                } else {
                    return 'anim-left'
                }
            }
        }
    }
</script>

<style lang="scss">
    #app {
        overflow: hidden;
        height: 100%;
        width: 100%;
    }
    /* appmain transition */
    .appmain-enter-active,
    .appmain-leave-active {
        position: absolute;
        transition: all .5s;
    }
    .anim-right {
        position: absolute;
        transform: translateX(100%);
    }
    .anim-left {
        position: absolute;
        transform: translateX(-100%);
    }
</style>
