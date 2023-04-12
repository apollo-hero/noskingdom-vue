<template>
  <div>
      <div class="container sm:px-10">
          <div class="block xl:grid gap-4">
              <!-- BEGIN: Login Form -->
              <div
                  class="m-auto h-full flex py-5 xl:py-0 my-10 xl:my-0 bg-black"
                  style="min-width: 500px; width: 30%;"
              >
                  <div
                      class="intro-y flex-1 box py-16 lg:ml-5 mb-5 lg:mb-0"
                      style="background-color: black;"
                  >
                      <div class="p-5 text-center">
                          <div class="flex text-center justify-center">
                              <img
                                  alt="Noskingdom"
                                  class="rounded-full"
                                  :src="
                                      require(`@/assets/images/logo.png`)
                                  "
                              />
                              <div class="text-3xl mt-5">NOSKINGDOM</div>
                          </div>
                          <div class="text-gray-600 mt-2">Welcome back to Noskingdom!</div>
                      </div>
                      <div class="p-5"> <label>Username</label> <input v-model="username" type="text" class="input w-full border mt-2" placeholder="username"> </div>
                      <div class="p-5"> <label>Email</label> <input v-model="email" type="email" class="input w-full border mt-2" placeholder="example@gmail.com"> </div>
                      <div class="p-5"> <label>Password</label> <input v-model="password" type="password" class="input w-full border mt-2"> </div>
                      <div class="p-5"> <label>Confirm Password</label> <input v-model="confirm_password" type="password" class="input w-full border mt-2"> </div>
                      <div class="flex p-5 items-center text-gray-700 dark:text-gray-500"> 
                        <input v-model="terms_service" type="checkbox" class="input border mr-2" id="terms_service"> 
                        <label class="cursor-pointer select-none" for="vertical-remember-me">
                          I agree to <a href="/term_service" class="text-purple-500">Terms of Service</a> and <a href="/privacy_policy" class="text-purple-500">Privacy Policy</a>
                        </label> 
                      </div>
                      <div class="flex justify-center">
                        <button :disabled="isButtonDisabled" @click="register()" type="button" class="button bg-theme-1 text-white w-full mx-5 mt-5">Register</button>
                      </div>
                      <div class="text-center mt-5">
                        Already have an account? <a href="/login" class="text-purple-500">Login</a>
                      </div>
                      <div class="text-center mt-5">
                        ● <a href="">Elitepvpers</a> ● <a href="">Cheat-Gam3</a> ● <a href="">Inforge</a> ●
                      </div>
                  </div>
              </div>
              <!-- END: Login Form -->
          </div>
      </div>
  </div>
</template>

<script>
import axios from "axios";
import Toastify from "toastify-js";

export default {
  data(){
    return {
      username: "",
      email: "",
      password: "",
      confirm_password: "",
      show: false,
      terms_service: false, 
    }
  },
  computed: {
    isButtonDisabled() {
      return !this.terms_service;
    }
  },
  mounted() {
      cash("body")
          .removeClass("app")
          .addClass("login");
  }, 
  methods: {
    register() {
      let self = this;
      self.show = true;
      if(!self.username || !self.email || !self.password || !self.confirm_password){
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
      axios
        .post("/api/register", {
          username: self.username,
          email: self.email,
          password: self.password,
          confirm_password: self.confirm_password
        })
        .then(function(response) {
          if(response.data.status == "success"){
            Toastify({
                text: response.data.message,
                duration: 3000,
                newWindow: true,
                close: false,
                gravity: "bottom",
                position: "center",
                backgroundColor: "#2af109",
                stopOnFocus: true
            }).showToast();
          } else {
            Toastify({
                text: response.data.message,
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
        .catch(function(error) {
          
        });
    },
  }
};
</script>
<style scope>
.login {
  background: url("/images/login.jpg");
}
</style>
