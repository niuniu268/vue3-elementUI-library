<template>
    <div class="login-box">
        <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        label-width="100px"
        class="demo-ruleForm"
        >

            <el-form-item label="Username" prop="Username">
            <el-input v-model="ruleForm.username" type="text" autocomplete="off" />
            </el-form-item>
            
            <el-form-item label="Password" prop="Password">
            <el-input
                v-model="ruleForm.password"
                type="password"
                autocomplete="off"
            />
            </el-form-item>

            <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)">Submit</el-button>
            <el-button @click="resetForm">Reset</el-button>
            </el-form-item>
        </el-form>
    </div>

</template>
<script lang="ts">
import {  reactive,ref, toRefs } from "vue";
import { LoginData } from "../type/login";
import { FormInstance } from "element-plus";
import { login } from "../request/api";
import { useRouter } from "vue-router";
export default {
    setup(){
        const router = useRouter()

        const data = reactive(new LoginData())

        const ruleFormRef = ref<FormInstance>()

        const submitForm = (formEl: FormInstance | undefined)=>{
            if(!formEl) return;
            formEl.validate((valid)=>{
                if(valid){
                    // console.log("submit")
                    login(data.ruleForm).then((res)=>{
                        console.log(res)
                        localStorage.setItem('Authorization', res.data.token);
                        router.push("/");
                    })

                }else{
                    console.log("error submit")
                    return false
                }
            })
        }

        const resetForm = ()=>{
            data.ruleForm.username="";
            data.ruleForm.password="";
        }
        
        return{...toRefs(data), resetForm, ruleFormRef, submitForm}
    }

}
</script>
<style lang="scss"></style>