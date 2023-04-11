<template>
    <div>
        <DarkModeSwitcher />
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
                            <div class="text-gray-600 mt-2">Don't forget to join our Discord server to be aware of our latest news, updates and more!</div>
                        </div>
                        <div class="p-5"> <label>Email</label> <input v-model="email" type="email" class="input w-full border mt-2" placeholder="example@gmail.com"> </div>
                        <div class="p-5"> <label>Password</label> <input v-model="password" type="password" class="input w-full border mt-2"> </div>
                        <div class="flex p-5 items-center text-gray-700 dark:text-gray-500"> <input type="checkbox" class="input border mr-2" id="vertical-remember-me"> <label class="cursor-pointer select-none" for="vertical-remember-me">Remember me</label> </div>
                        <div class="flex justify-center"><button @click="login()" type="button" class="button bg-theme-1 text-white w-full mx-5 mt-5">Login</button></div>
                        <div class="text-center mt-5">
                            Are you new? <a href="/register" class="text-purple-500">Create an account</a>
                        </div>
                        <div class="text-center mt-5">
                        ● Elitepvpers ● Cheat-Gam3 ● Inforge ●
                      </div>
                    </div>
                </div>
                <!-- END: Login Form -->
            </div>
        </div>
    </div>
</template>

<script>
import DarkModeSwitcher from "@/components/DarkModeSwitcher";
import axios from 'axios';
import Toastify from "toastify-js";

export default {
    components: {
        DarkModeSwitcher
    },
    data(){
        return {
        email: "",
        password: "",
        }
    },
    computed: {
        isAuthenticated() {
            return this.$store.state.main.authToken !== null;
        }
    },
    mounted() {
        cash("body")
            .removeClass("app")
            .addClass("login");
    },
    methods: {
        login() {
            let self = this;
            if(!self.email || !self.password){
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

            self.$store.dispatch('main/login', {
                email: self.email,
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
                    self.$router.push({ path: "/" });
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
        // login() {
        //     let self = this;
        //     if(!self.email || !self.password){
        //         Toastify({
        //                 text: "please fill the fields!",
        //                 duration: 3000,
        //                 newWindow: true,
        //                 close: false,
        //                 gravity: "bottom",
        //                 position: "center",
        //                 backgroundColor: "#e80404",
        //                 stopOnFocus: true
        //             }).showToast();
        //         return;
        //     }
        //     axios
        //         .post("/api/login", {
        //         email: self.email,
        //         password: self.password
        //         })
        //         .then(function(response) {
        //         if(response.data.status == "success"){
        //             Toastify({
        //                 text: response.data.message,
        //                 duration: 3000,
        //                 newWindow: true,
        //                 close: false,
        //                 gravity: "bottom",
        //                 position: "center",
        //                 backgroundColor: "#2af109",
        //                 stopOnFocus: true
        //             }).showToast();
        //             self.$router.push({ path: "/" });
        //         } else {
        //             Toastify({
        //                 text: response.data.message,
        //                 duration: 3000,
        //                 newWindow: true,
        //                 close: false,
        //                 gravity: "bottom",
        //                 position: "center",
        //                 backgroundColor: "#e80404",
        //                 stopOnFocus: true
        //             }).showToast();
        //         }
        //         })
        //         .catch(function(error) {
                
        //         });
        //     },
        }
};
</script>
<style scope>
.login {
    background: url("/images/login.jpg");
}
</style>
