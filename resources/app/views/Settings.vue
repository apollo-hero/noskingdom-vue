<template>
    <div>
      <div class="intro-y flex items-center mt-8">
        <h2 class="text-lg font-medium mr-auto">Update Profile</h2>
      </div>
      <div class="grid grid-cols-12 gap-6">
        <!-- BEGIN: Profile Menu -->
        <div
          class="col-span-12 lg:col-span-4 xxl:col-span-3 flex lg:block flex-col-reverse"
        >
          <div class="intro-y box mt-5">
            <div class="relative flex items-center p-5">
              <div class="w-12 h-12 image-fit">
                <img
                  alt="Midone Tailwind HTML Admin Template"
                  class="rounded-full"
                  :src="require(`@/assets/images/${$f()[0].photos[0]}`)"
                />
              </div>
              <div class="ml-4 mr-auto">
                <div class="font-medium text-base">
                  {{ this.$store.state.main.user.Name }}
                </div>
                <div class="text-gray-600">{{ this.$store.state.main.user.Email }}</div>
              </div>
            </div>
            <div class="p-5 border-t border-gray-200 dark:border-dark-5">
              <a
                class="flex items-center text-theme-1 dark:text-theme-10 font-medium"
                href=""
              >
                <ActivityIcon class="w-4 h-4 mr-2" /> Personal Information
              </a>
              <a class="flex items-center mt-5" href="">
                <LockIcon class="w-4 h-4 mr-2" /> Change Password
              </a>
            </div>
            <div class="p-5 border-t border-gray-200 dark:border-dark-5">
              <a class="flex items-center" href="">
                <MailIcon class="w-4 h-4 mr-2" /> Email Settings
              </a>
            </div>
            <div class="p-5 border-t flex dark:border-dark-5">
              
            </div>
          </div>
        </div>
        <!-- END: Profile Menu -->
        <div class="col-span-12 lg:col-span-8 xxl:col-span-9">
          <!-- BEGIN: Change Password -->
        <div class="intro-y box lg:mt-5">
          <div
            class="flex items-center p-5 border-b border-gray-200 dark:border-dark-5"
          >
            <h2 class="font-medium text-base mr-auto">Change Password</h2>
          </div>
          <div class="p-5">
            <div>
              <label>Old Password</label>
              <input
                v-model="old_password"
                type="password"
                class="input w-full border mt-2"
                placeholder="Input text"
              />
            </div>
            <div class="mt-3">
              <label>New Password</label>
              <input
                v-model="new_password"
                type="password"
                class="input w-full border mt-2"
                placeholder="Input text"
              />
            </div>
            <div class="mt-3">
              <label>Confirm New Password</label>
              <input
                v-model="confirm_password"
                type="password"
                class="input w-full border mt-2"
                placeholder="Input text"
              />
            </div>
            <button @click="changePassword()" type="button" class="button bg-theme-1 text-white mt-4">
              Change Password
            </button>
          </div>
        </div>
        <!-- END: Change Password -->
        <!-- BEGIN: Change Email -->
        <div class="intro-y box lg:mt-5">
          <div
            class="flex items-center p-5 border-b border-gray-200 dark:border-dark-5"
          >
            <h2 class="font-medium text-base mr-auto">Change Email</h2>
          </div>
          <div class="p-5">
            <div>
              <label>Old Email</label>
              <input
                v-model="old_email"
                type="email"
                class="input w-full border mt-2"
                placeholder="Input text"
              />
            </div>
            <div class="mt-3">
              <label>New Email</label>
              <input
                v-model="new_email"
                type="email"
                class="input w-full border mt-2"
                placeholder="Input text"
              />
            </div>
            <div class="mt-3">
              <label>Confirm Password</label>
              <input
                v-model="password"
                type="password"
                class="input w-full border mt-2"
                placeholder="Input text"
              />
            </div>
            <button @click="changeEmail()" type="button" class="button bg-theme-1 text-white mt-4">
              Change Email
            </button>
          </div>
        </div>
        <!-- END: Change Email -->
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import Toastify from "toastify-js";

  export default {
    data() {
      return {
        old_email: '',
        new_email: '',
        password: '',
        old_password: '',
        new_password: '',
        confirm_password: ''
      };
    },
    mounted(){
        this.old_email = this.$store.state.main.user.Email;
    },  
    methods: {
        changeEmail() {
            let self = this;
            if(!self.new_email || !self.password){
                Toastify({
                        text: "please fill the fields!",
                        duration: 3000,
                        newWindow: true,
                        close: false,
                        gravity: "bottom",
                        position: "center",
                        backgroundColor: "#e80404",
                        stopOnFocus: true
                    }).showToast();
                return;
            }

            self.$store.dispatch('main/changeEmail', {
                email: self.new_email,
                password: self.password
            }).then((res) => {
                if(res.data.status == "success"){
                    Toastify({
                        text: res.data.message,
                        duration: 3000,
                        newWindow: true,
                        close: false,
                        gravity: "bottom",
                        position: "center",
                        backgroundColor: "#2af109",
                        stopOnFocus: true
                    }).showToast();
                    self.old_email = res.data.user.Email;
                    self.new_email = '';
                    self.password = '';
                } else {
                    Toastify({
                        text: res.data.message,
                        duration: 3000,
                        newWindow: true,
                        close: false,
                        gravity: "bottom",
                        position: "center",
                        backgroundColor: "#e80404",
                        stopOnFocus: true
                    }).showToast();
                }
                
            })
            .catch(() => {
                // Handle login errors
            });
        },
        changePassword(){
            let self = this;
            if(!self.new_password || !self.old_password || !self.confirm_password){
                Toastify({
                        text: "please fill the fields!",
                        duration: 3000,
                        newWindow: true,
                        close: false,
                        gravity: "bottom",
                        position: "center",
                        backgroundColor: "#e80404",
                        stopOnFocus: true
                    }).showToast();
                return;
            }
            
            self.$store.dispatch('main/changePassword', {
                old_password: self.old_password,
                new_password: self.new_password,
                confirm_password: self.confirm_password
            }).then((res) => {
                if(res.data.status == "success"){
                    Toastify({
                        text: res.data.message,
                        duration: 3000,
                        newWindow: true,
                        close: false,
                        gravity: "bottom",
                        position: "center",
                        backgroundColor: "#2af109",
                        stopOnFocus: true
                    }).showToast();
                    self.old_email = res.data.user.Email;
                    self.new_email = '';
                    self.password = '';
                } else {
                    Toastify({
                        text: res.data.message,
                        duration: 3000,
                        newWindow: true,
                        close: false,
                        gravity: "bottom",
                        position: "center",
                        backgroundColor: "#e80404",
                        stopOnFocus: true
                    }).showToast();
                }
                
            })
            .catch(() => {
                // Handle login errors
            });
        }
    }
  };
  </script>
  