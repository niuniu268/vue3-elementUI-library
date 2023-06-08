<template>
    <div>
        <div>
            <el-table :data="list" stripe style="width: 100%">
                <el-table-column prop="username" label="Username" />
                <el-table-column prop="password" label="Password" />
                <el-table-column prop="role" label="Role" />
            </el-table>
        </div>
        
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from "vue";
import { getusers } from "../request/api";
import { usersData, userInt } from "../type/userList";
export default {

    setup(){
        onMounted(()=>{
            getusers()

        });

        const data = reactive(new usersData());

        getusers().then(res=>{
            data.list = res.data.users
            console.log(data)
        })

        return{...toRefs(data), onMounted}
    }
    
}
</script>
<style lang="scss" scoped>
    
</style>