<template>
    <div class="grid grid-cols-12 gap-6 mt-8">
        <div class="col-span-12 lg:col-span-12 xxl:col-span-12">
            <h2 class="intro-y text-lg font-medium mr-auto mt-2">
                Shop
            </h2>
        </div>

        <div class="col-span-12 lg:col-span-3 xxl:col-span-2">
            <!-- BEGIN: File Manager Menu -->
            <div class="intro-y box p-5 mt-6">
                <div class="mt-1">
                    Search
                </div>
                <div
                    class="border-t border-gray-200 dark:border-dark-5 mt-5 pt-5"
                >
                    <input v-model="search_text" type="text" class="input w-full border mt-2" placeholder="item name">
                </div>
                <div class="mt-6 pt-5 border-t border-gray-200 dark:border-dark-5">
                    Categories
                </div>
                <div
                    class="border-t border-gray-200 dark:border-dark-5 mt-5 pt-5"
                >
                    <a v-for="category, index in categories" :key="index" class="flex items-center mt-2" href="javascript:;">
                        <LayersIcon class="w-4 h-4 mr-2" /> {{ category.name }}
                    </a>
                </div>
            </div>
            <!-- END: File Manager Menu -->
        </div>
        <div class="col-span-12 lg:col-span-9 xxl:col-span-10">
            <!-- BEGIN: Directory & Files -->
            <div class="intro-y grid grid-cols-12 gap-3 sm:gap-6 mt-5">
                <div
                    v-for="(item, index) in shopItems"
                    :key="`item-${index}`"
                    class="intro-y col-span-6 sm:col-span-4 md:col-span-3 xxl:col-span-2"
                >
                    <div
                        class="file box rounded-md px-5 pt-8 pb-5 px-3 sm:px-5 relative zoom-in"
                    >
                        <a
                            href="javascript:;"
                            class="w-3/5 file__icon file__icon--image mx-auto"
                            data-toggle="modal"
                            data-target="#buy_modal"
                            @click="handleItem(item)"
                        >
                            <div class="file__icon--image__preview image-fit">
                                <img
                                    alt="Midone Tailwind HTML Admin Template"
                                    :src="
                                        require(`@/assets/items/${item.image}.png`)
                                    "
                                />
                            </div>
                        </a>
                        <a
                            href=""
                            class="block font-medium mt-4 text-center truncate"
                            >{{ item.name }}</a
                        >
                        <div class="text-gray-600 text-xs text-center">
                            {{ item.price }}
                        </div>
                    </div>
                </div>
            </div>
            <!-- END: Directory & Files -->
            <!-- BEGIN: Pagination -->
            <div
                class="intro-y flex flex-wrap sm:flex-row sm:flex-no-wrap items-center mt-6"
            >
                <ul class="pagination">
                    <li>
                        <a class="pagination__link" href="">
                            <ChevronsLeftIcon class="w-4 h-4" />
                        </a>
                    </li>
                    <li>
                        <a class="pagination__link" href="">
                            <ChevronLeftIcon class="w-4 h-4" />
                        </a>
                    </li>
                    <li>
                        <a class="pagination__link" href="">...</a>
                    </li>
                    <li>
                        <a class="pagination__link" href="">1</a>
                    </li>
                    <li>
                        <a
                            class="pagination__link pagination__link--active"
                            href=""
                            >2</a
                        >
                    </li>
                    <li>
                        <a class="pagination__link" href="">3</a>
                    </li>
                    <li>
                        <a class="pagination__link" href="">...</a>
                    </li>
                    <li>
                        <a class="pagination__link" href="">
                            <ChevronRightIcon class="w-4 h-4" />
                        </a>
                    </li>
                    <li>
                        <a class="pagination__link" href="">
                            <ChevronsRightIcon class="w-4 h-4" />
                        </a>
                    </li>
                </ul>
                <select class="w-20 input box mt-3 sm:mt-0">
                    <option>10</option>
                    <option>25</option>
                    <option>35</option>
                    <option>50</option>
                </select>
            </div>
            <!-- END: Pagination -->
        </div>

        <!-- Buy Modal -->
        <div class="modal" id="buy_modal">
            <div class="modal__content">
                <div
                    class="flex items-center px-5 py-5 sm:py-3 border-b border-gray-200 dark:border-dark-5"
                >
                    <h2 class="font-medium text-base mr-auto">
                        {{item.name}}
                    </h2>
                </div>
                <div class="p-5 grid grid-cols-12 gap-4 row-gap-3">
                    <div class="flex col-span-12">
                        <img v-if="item.name" :src="require(`@/assets/items/${item.image}.png`)"/>
                        <div class="flex items-center ml-3">{{ item.description }}</div>
                    </div>
                    <div class="col-span-12 sm:col-span-12">
                        <label>price</label>
                        <span>{{ item.price * quantity }}</span>
                    </div>
                </div>
                <div
                    class="px-5 py-3 text-right border-t border-gray-200 dark:border-dark-5 grid grid-cols-12 gap-4 row-gap-3"
                >
                    <div class="col-span-12 sm:col-span-6">
                        <select v-model="character" class="input w-full border mt-2 flex-1">
                            <option>select character</option> 
                            <option v-for="t, index in characters" :key="index" :value="t.Id">{{ t.Name }}</option> 
                        </select>
                    </div>
                    <div class="col-span-12 sm:col-span-3">
                        <input
                            v-model="quantity"
                            type="number"
                            class="input w-full border mt-2 flex-1"
                            placeholder=""
                        />
                    </div>

                    <div class="col-span-12 sm:col-span-3">
                        <button
                            @click="buy()"
                            type="button"
                            class="button w-20 bg-theme-1 text-white mt-2 inline-flex items-center"
                        >
                            BUY
                            <LoadingIcon
                                v-if="loading"
                                icon="oval"
                                color="white"
                                class="w-4 h-4 ml-auto"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios';
import ImageZoom from './ImageZoom.vue';
import Toastify from "toastify-js";

export default {
  components: { ImageZoom },
    data() {
        return {
            search_text: '',
            categories: [],
            shopItems: [],
            item: {},
            characters: [],
            quantity: 1,
            character: null,
            loading: false
        }
    },
    mounted(){
        this.getCategories();
        this.getShopItems();
        this.getCharacters();
    }, 
    methods : {
        getCategories(){
            let self = this;
            axios.get('/api/getCategories')
                .then((res)=>{
                    self.categories = res.data.categories;
                })
        },

        getShopItems(){
            let self = this;
            axios.get('/api/getShopItems')
                .then((res)=>{
                    self.shopItems = res.data.shopItems;
                })
        },

        handleItem(item){
            let self = this;

            self.item = item;
        },

        getCharacters(){
            let self = this;
            axios.get('/api/getCharacters')
                .then((res)=>{
                    self.characters = res.data.characters;
                })
        },

        buy() {
            let self = this;
            if(!self.character){
                Toastify({
                    text: "please select the character!",
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
            

            if(self.item.price * self.quantity > self.$store.state.main.user.Coins){
                Toastify({
                    text: "The coins is not enough!",
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

            if(self.quantity < 1){
                Toastify({
                    text: "The quantity should be greater than 1!",
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

            self.loading = true;

        }

    }
}
</script>
