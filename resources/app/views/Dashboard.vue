<template>
    <div>
        <div class="intro-y flex items-center mt-8">
            <h2 class="text-lg font-medium mr-auto">Profile</h2>
        </div>
        <!-- BEGIN: Profile Info -->
        <div class="intro-y box px-5 pt-5 mt-5">
            <div
                class="flex flex-col lg:flex-row border-b border-gray-200 dark:border-dark-5 pb-5 -mx-5"
            >
                <div
                    class="flex flex-1 px-5 items-center justify-center lg:justify-start"
                >
                    <div
                        class="w-20 h-20 sm:w-24 sm:h-24 flex-none lg:w-32 lg:h-32 image-fit relative"
                    >
                        <img
                            alt="Midone Tailwind HTML Admin Template"
                            class="rounded-full"
                            :src="
                                require(`@/assets/avatars/user-1.png`)
                            "
                        />
                        <div
                            class="absolute mb-1 mr-1 flex items-center justify-center bottom-0 right-0 bg-theme-1 rounded-full p-2"
                        >
                            <CameraIcon class="w-4 h-4 text-white" />
                        </div>
                    </div>
                    <div class="ml-5">
                        <div
                            class="w-24 sm:w-40 truncate sm:whitespace-normal font-medium text-lg"
                        >
                            {{ this.$store.state.main.user.Name }}
                        </div>
                        <div class="text-gray-600">{{ this.$store.state.main.user.Email }}</div>
                    </div>
                </div>
                <div
                    class="flex mt-6 lg:mt-0 items-center lg:items-start flex-1 flex-col justify-center text-gray-600 dark:text-gray-300 px-5 border-l border-r border-gray-200 dark:border-dark-5 border-t lg:border-t-0 pt-5 lg:pt-0"
                >
                    <div
                        class="truncate sm:whitespace-normal flex items-center"
                    >
                        {{  }}
                    </div>
                    <div
                        class="truncate sm:whitespace-normal flex items-center mt-3"
                    >
                        {{ }}
                    </div>
                    <div
                        class="truncate sm:whitespace-normal flex items-center mt-3"
                    >
                        {{  }}
                    </div>
                </div>
                <div
                    class="mt-6 lg:mt-0 flex-1 px-5 border-t lg:border-0 border-gray-200 dark:border-dark-5 pt-5 lg:pt-0"
                >
                    <div class="font-medium text-center lg:text-left lg:mt-5">
                        
                    </div>
                    <div
                        class="flex items-center justify-center lg:justify-start mt-2"
                    >
                        <div class="mr-2 w-20 flex">
                            
                            <span class="ml-3 font-medium text-theme-9"
                                ></span
                            >
                        </div>
                        <div class="w-32 lg:w-40">
                            <canvas
                                class="simple-line-chart-1"
                                height="40"
                            ></canvas>
                        </div>
                    </div>
                    <div
                        class="flex items-center justify-center lg:justify-start"
                    >
                        <div class="mr-2 w-20 flex">
                            
                            <span class="ml-3 font-medium text-theme-6"
                                ></span
                            >
                        </div>
                        <div class="w-32 lg:w-40">
                            <canvas
                                class="simple-line-chart-2"
                                height="40"
                            ></canvas>
                        </div>
                    </div>
                </div>
            </div>
            <div
                class="nav-tabs flex flex-col sm:flex-row justify-center lg:justify-start"
            >
                <a
                    data-toggle="tab"
                    data-target="#dashboard"
                    href="javascript:;"
                    class="py-4 sm:mr-8 active"
                    >Charactors</a
                >
            </div>
        </div>
        <!-- END: Profile Info -->
        <div class="intro-y tab-content mt-5">
            <div id="dashboard" class="tab-content__pane active">
                <div class="grid grid-cols-12 gap-6">
                    <!-- BEGIN: Charactors -->
                    <div class="intro-y box col-span-12 lg:col-span-12">
                        <div
                            class="flex items-center px-5 py-5 sm:py-3 border-b border-gray-200 dark:border-dark-5"
                        >
                            <h2 class="font-medium text-base mr-auto">
                                Charactors
                            </h2>
                        </div>
                        <div class="p-5">
                            <div v-for="character, index in characters" :key="index" class="relative flex items-center mt-5">
                                <div class="w-12 h-12 flex-none image-fit">
                                    <img
                                        alt="Midone Tailwind HTML Admin Template"
                                        class="rounded-full"
                                        :src="getCharacterImage(character)"
                                    />
                                </div>
                                <div class="ml-4 mr-auto">
                                    <a href="" class="font-medium">{{
                                        character.Name
                                    }}</a>
                                    <div class="text-gray-600 mr-5 sm:mr-5">
                                        {{ character.CreatedAt}}
                                    </div>
                                </div>
                                <div
                                    class="font-medium text-gray-700 dark:text-gray-600"
                                >
                                    Level - {{character.Level}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- END: Charactors -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            salesReportFilter: "",
            characters: []
        };
    },
    mounted(){
        this.getCharacters();
    },
    methods: {
        prevImportantNotes() {
            this.$refs["important-notes"].prev();
        },
        nextImportantNotes() {
            this.$refs["important-notes"].next();
        },
        getCharacters(){
            let self = this;
            axios.get('/api/getCharacters')
                .then((res)=>{
                    self.characters = res.data.characters;
                })
        },

        getCharacterImage(t){
            let image = t.Class == 0 && t.Gender == 0 ? '32000' :
                                    t.Class == 0 && t.Gender == 1 ? '32020' :
                                    t.Class == 1 && t.Gender == 0 ? '32040' :
                                    t.Class == 1 && t.Gender == 1 ? '32060' :
                                    t.Class == 2 && t.Gender == 0 ? '32080' :
                                    t.Class == 2 && t.Gender == 1 ? '32100' :
                                    t.Class == 3 && t.Gender == 0 ? '32120' : '32140';

            return require(`@/assets/items/` + image + `.png`);
        }
    }
};
</script>
