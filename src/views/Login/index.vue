<template>
    <div class="content login">
        <el-form :model="loginForm" status-icon ref="loginForm" label-width="5em" class="demo-loginForm">
            <h1>{{sysName}}</h1>
            <el-form-item label="账号" prop="account">
                <el-input type="account" v-model="loginForm.account" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="loginForm.password" autocomplete="off" show-password></el-input>
            </el-form-item>
            <el-form-item>
                <el-button class="width-100p" type="primary" @click="jumpTo">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {DEFAULT_TAG, SYS_NAME} from '@/config';
import LoginService from '@/service/login.service.ts'
import {
    Form,
    FormItem,
    Input,
    Button
} from 'element-ui'

export default {
    name: 'Login',
    components: {
        'el-form': Form,
        'el-form-item': FormItem,
        'el-input': Input,
        'el-button': Button
    },
    data() {
        return {
            loginForm: {
                account: 'admin',
                password: 'admin'
            }
        }
    },
    computed: {
        sysName() {
            return SYS_NAME;
        }
    },
    methods: {
        jumpTo() {
            LoginService.login().subscribe((user) => {
                sessionStorage.setItem('user', JSON.stringify(user))
                this.$router.push(DEFAULT_TAG.path)
            })
        }
    }
}
</script>

<style scoped>
    .login {
        display: flex;
        justify-content: center;
        align-items: center;
        background: #43454c;
    }
    .demo-loginForm {
        width: 30em;
        padding: 1em 3em 1em 1em;
        border-radius: .5em;
        background: rgba(255,255,255,.5);
    }
    .demo-loginForm h1 {
        width: 100%;
        text-align: center;
    }
    .width-100p {
        width: 100%;
    }
</style>
