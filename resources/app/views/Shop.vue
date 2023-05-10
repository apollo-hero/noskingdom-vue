<template>
    <div class="grid grid-cols-12 gap-6 mt-8">
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
                    <a class="flex items-center mt-2" :class="{'bg-theme-1' : !category}" href="javascript:;" @click="searchCategory(0)">
                        <LayersIcon class="w-4 h-4 mr-2" /> ALL
                    </a>
                    <a v-for="c, index in categories" :key="index" :class="{'bg-theme-1' : category == c.categoriesid}" class="flex items-center mt-2" href="javascript:;" @click="searchCategory(c.categoriesid)">
                        <LayersIcon class="w-4 h-4 mr-2" /> {{ c.name }}
                    </a>
                </div>
            </div>
            <!-- END: File Manager Menu -->
        </div>
        <div class="col-span-12 lg:col-span-9 xxl:col-span-10">
            <!-- BEGIN: Directory & Files -->
            <div class="intro-y grid grid-cols-12 gap-3 sm:gap-6 mt-5">
                <div
                    v-for="(item, index) in paginatedData"
                    :key="`item-${index}`"
                    class="intro-y col-span-6 sm:col-span-4 md:col-span-3 xxl:col-span-2"
                >
                    <div
                        class="file box rounded-md px-5 pt-8 pb-5 px-3 sm:px-5 relative zoom-in"
                    >
                        <a
                            href="javascript:;"
                            class="w-3/5 file__icon--image mx-auto"
                            data-toggle="modal"
                            data-target="#buy_modal"
                            @click="handleItem(item)"
                        >
                            <div class="">
                                <img
                                    alt="Midone Tailwind HTML Admin Template"
                                    :src="
                                        require(`@/assets/items/${item.image}.png`)
                                    "
                                    style="width:40px; height:40px; margin:auto;"
                                />
                            </div>
                        </a>
                        <a
                            href="javascript:;"
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
                class="intro-y flex flex-wrap sm:flex-row sm:flex-no-wrap items-center mt-6 justify-between"
            >
                <div class="">Showing {{ (currentPage - 1) * perPage + 1 }} to {{ currentPage * perPage > filteredData.length ? filteredData.length : currentPage * perPage }} of {{ filteredData.length }} items</div>
                <nav aria-label="Page navigation">
                    <ul class="pagination">
                        <li class="page-item" :class="{ disabled: currentPage <= 1 }">
                            <a class="pagination__link" href="#" @click.prevent="prevPage">Previous</a>
                        </li>
                        <li class="page-item" v-for="page in pages" :key="page">
                            <a class="pagination__link" :class="{ 'pagination__link--active' : currentPage === page }" href="#" @click.prevent="setPage(page)">{{ page }}</a>
                        </li>
                        <li class="page-item" :class="{ disabled: currentPage >= totalPages }">
                            <a class="pagination__link" href="#" @click.prevent="nextPage">Next</a>
                        </li>
                    </ul>
                </nav>
                <!-- <select class="w-20 input box mt-3 sm:mt-0">
                    <option>10</option>
                    <option>25</option>
                    <option>35</option>
                    <option>50</option>
                </select> -->
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
                        <img v-if="item.name" :src="require(`@/assets/items/${item.image}.png`)" height="40px" width="40px" class="flex items-center left"/>
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
import { setFips } from 'crypto';

export default {
  components: { ImageZoom },
    data() {
        return {
            search_text: '',
            categories: [],
            category: null,
            data: [],
            shopItems: [],
            item: {},
            characters: [],
            quantity: 1,
            character: null,
            loading: false,

            currentPage: 1,
            perPage: 20,
            totalPages: 0,
            pages: [],
        }
    },
    computed: {
        filteredData() {
            if (this.search_text && !this.category) {
                return this.data.filter(item => item.name.toLowerCase().indexOf(this.search_text.toLowerCase()) !== -1);
            } else if(!this.search_text && this.category){
                return this.data.filter(item => item.categoriesid == this.category);
            } else if(this.search_text && this.category){
                return this.data.filter(item => item.categoriesid == this.category && item.name.toLowerCase().indexOf(this.search_text.toLowerCase()) !== -1);
            } else {
                return this.data;
            }
        },
        paginatedData() {
            const from = (this.currentPage - 1) * this.perPage;
            const to = this.currentPage * this.perPage;
            return this.filteredData.slice(from, to);
        }
    },
    mounted(){
        this.getCategories();
        // this.getShopItems();
        this.getCharacters();
        this.getShopItems();
    }, 
    methods : {
        getCategories(){
            let self = this;
            axios.get('/api/getCategories')
                .then((res)=>{
                    self.categories = res.data.categories;
                })
        },

        getShopItems(page){
            let self = this;
            axios.get('/api/getShopItems')
                .then((res)=>{
                    self.data = res.data.shopItems;
                    self.totalPages = Math.ceil(this.filteredData.length / this.perPage);
                    self.generatePages();
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

            

        },

        filterData() {
            this.currentPage = 1;
            this.totalPages = Math.ceil(this.filteredData.length / this.perPage);
            this.generatePages();
        },
        showData() {
            this.totalPages = Math.ceil(this.filteredData.length / this.perPage);
            this.generatePages();
        },
        setPage(page) {
            this.currentPage = page;
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        generatePages() {
            this.pages = [];
            for (let i = 1; i <= this.totalPages; i++) {
                this.pages.push(i);
            }
        },
        searchCategory(id){
            console.log(id);
            this.category = id;
        }
    },
    watch: {
        filteredData() {
            this.showData();
            if(this.currentPage > this.totalPages){
                this.currentPage = 1;
            }
        },
        currentPage() {
            this.generatePages();
        },
        perPage() {
           this.showData();
        }
    }
}
</script>
