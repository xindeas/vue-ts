<template>
    <div class="content">
        <el-table
                :data="tableData"
                border
                height="300"
                style="width: 100%;height: 100%;">
            <el-table-column
                    type="index">
            </el-table-column>
            <el-table-column
                    prop="date"
                    label="日期"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="地址">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {
        Table,
        TableColumn,
    } from 'element-ui'
    export default {
        name: 'DemoTable',
        components: {
            'el-table': Table,
            'el-table-column': TableColumn
        },
        data() {
            return {
            }
        },
        computed: {
            tableData() {
                const arr = []
                for (let i = 0; i < 20; i ++) {
                    arr.push({
                        date: '2016-05-03',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1516 弄'
                    })
                }
                return arr
            }
        }
    }
</script>

<style scoped>

</style>
