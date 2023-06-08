<template>
    <div>
        <div>            
            <el-table :data="list" stripe style="width: 100%">
                <el-table-column prop="username" label="Username" />
                <el-table-column prop="password" label="Password" />
                <el-table-column prop="role" label="Role" />
                <el-table-column label="Operation">
                    <template #default="scope: any">
                        <el-button type="primary" plain @click="changeUser(scope.row)">Update</el-button>
                        <el-button type="danger" plain @click="deleteUser(scope.row)">Delete</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div>
            <el-row>
                <el-button type="primary" plain @click="isShow = true">Add</el-button>
            </el-row>
            <el-dialog 
                        title="Add an administor"
                        v-model="isShow"
            >
                <el-form :model=" active ">
                    <el-form-item>
                        <el-input v-model=" active.username " />
                        <el-input v-model=" active.password " />
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="active.role" placeholder="please select">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            />
                        </el-select>
                    </el-form-item>
                </el-form>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="isShow = false">Cancel</el-button>
                        <el-button type="primary" @click=" confirmInformation ">Confirm</el-button>
                    </span>
                </template>
            </el-dialog>
        </div>
        <div>
            <el-dialog v-model=" isShow " title="Edit information">
                <span>Edit this information</span>
                <el-form :model=" active ">
                    <el-form-item>
                        <el-input v-model=" active.username " />
                        <el-input v-model=" active.password " />
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="active.role" placeholder="please select">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            />
                        </el-select>
                    </el-form-item>
                </el-form>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="isShow = false">Cancel</el-button>
                        <el-button type="primary" @click=" confirmInformation ">Confirm</el-button>
                    </span>
                </template>
            </el-dialog>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from "vue";
import { getusers } from "../request/api";
import { usersData, userInt } from "../type/userList";
export default {

    setup() {
        onMounted(() => {
            getusers()
        });

        const data = reactive(new usersData());

        getusers().then(res => {
            data.list = res.data.users
            console.log(data)
        })

        const changeUser = (row: userInt) => {
            // console.log(row);
            data.isShow=true;
            data.active = {
                username: row.username,
                password: row.password,
                role: row.role
            }
        }

        const options = [
            {
                value:"ADMIN",
                label:"ADMIN"
            },
            {
                value:"USER",
                label:"USER"
            }

        ]

        const deleteUser = (row: userInt) => {
            console.log(row)
        }

        const confirmInformation = () => {
            console.log(data.active)
            data.isShow=false

        }

        return { ...toRefs(data), onMounted, changeUser, confirmInformation, deleteUser, options }
    }

}
</script>
<style lang="scss" scoped></style>