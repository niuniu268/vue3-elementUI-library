<template>
    <div>
        <div class="select-box">
            <el-form :inline="true" :model="selectData" class="demo-form-inline">
            <el-form-item label="title">
                <el-input v-model="selectData.title" placeholder="Input Title" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">Query</el-button>
            </el-form-item>
            </el-form>
        </div>

        <div>
            <el-table :data="list" stripe style="width: 100%">
                <el-table-column prop="title" label="Title" />
                <el-table-column prop="author" label="Author" />
                <el-table-column prop="quantity" label="Quantity" />
            </el-table>
        </div>
        
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, watch, onMounted } from "vue";
import { getBooks } from "../request/api";
import { booksData, booksInt } from "../type/bookList";
export default {
    setup(){
        onMounted(() => {
            getBooks()
        });

        const data = reactive(new booksData())
        console.log(data)
        
        getBooks().then(res=>{
            data.list = res.data.books

        })


        const onSubmit = ()=>{

            let arr:booksInt[] = []

            if(data.selectData.title){
                arr = data.list.filter((value)=>{
                    return value.title.indexOf(data.selectData.title) != -1
                })
            } else {
                arr = data.list
            }

            data.list = arr

        }

        return {...toRefs(data), onMounted, onSubmit};
    }
    
}
</script>
<style lang="scss" scoped>
    
</style>