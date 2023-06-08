<template>
    <div>
      <div>
        <el-table :data="list" stripe style="width: 100%">
          <el-table-column prop="username" label="Username" />
          <el-table-column prop="password" label="Password" />
          <el-table-column prop="role" label="Role" />
          <el-table-column label="Operation">
            <template #default="scope">
              <el-button type="primary" plain @click="changeUser(scope.row)">Update</el-button>
              <el-button type="danger" plain @click="deleteUser(scope.row)">Delete</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
  
      <div>
        <el-button type="primary" plain @click="isShow = true">Add</el-button>
        <el-dialog v-model="isShow" :title=activeDialogTitle>
          <template v-if="isAddDialog">
            <el-form :model="active">
              <el-form-item>
                <el-input v-model="active.username" />
                <el-input v-model="active.password" />
              </el-form-item>
              <el-form-item>
                <el-select v-model="active.role" placeholder="Please select">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-form>
          </template>
  
          <template v-else>
            <span>Edit this information</span>
            <el-form :model="active">
              <el-form-item>
                <el-input v-model="active.username" />
                <el-input v-model="active.password" />
              </el-form-item>
              <el-form-item>
                <el-select v-model="active.role" placeholder="Please select">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-form>
          </template>
  
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="isShow = false">Cancel</el-button>
              <el-button type="primary" @click="confirmInformation">Confirm</el-button>
            </span>
          </template>
        </el-dialog>
      </div>
    </div>
  </template>
<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, computed } from "vue";
import { getUsers, putUser } from "../request/api";
import { usersData, userInt } from "../type/userList";
export default {

    setup() {
        onMounted(() => {
            getUsers()
        });

        const data = reactive(new usersData());

        const activeDialogTitle = computed(() => {
            return data.isAddDialog ? "Add an administrator" : "Edit information";
        });

        getUsers().then(res => {
            data.list = res.data.users
            console.log(data)
        })


        const changeUser = (row: userInt) => {
            // console.log(row);
            data.isShow=true;
            data.isAddDialog=false
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
            putUser(data.active.username).then(res => {
                data.list = res.data.context.users
                console.log(data)
            })
        }

        return { ...toRefs(data), onMounted, changeUser, confirmInformation, deleteUser, options, activeDialogTitle }
    }

}
</script>
<style lang="scss" scoped></style>