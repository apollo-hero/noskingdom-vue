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
                    <input
                        type="checkbox"
                        class="input border mr-2"
                        id="horizontal-checkbox-chris-evans"
                    />Images
                </div>
                <div
                    class="border-t border-gray-200 dark:border-dark-5 mt-5 pt-5"
                ></div>
            </div>
            <!-- END: File Manager Menu -->
        </div>
        <div class="col-span-12 lg:col-span-9 xxl:col-span-10">
            <!-- BEGIN: Directory & Files -->
            <div class="intro-y grid grid-cols-12 gap-3 sm:gap-6 mt-5">
                <div
                    v-for="(faker, fakerKey) in $f()"
                    :key="fakerKey"
                    class="intro-y col-span-6 sm:col-span-4 md:col-span-3 xxl:col-span-2"
                >
                    <div
                        class="file box rounded-md px-5 pt-8 pb-5 px-3 sm:px-5 relative zoom-in"
                    >
                        <a
                            v-if="faker.files[0].type == 'Empty Folder'"
                            href="javascript:;"
                            class="w-3/5 file__icon file__icon--empty-directory mx-auto"
                            data-toggle="modal"
                            data-target="#buy_modal"
                        ></a>
                        <a
                            v-else-if="faker.files[0].type == 'Folder'"
                            href=""
                            class="w-3/5 file__icon file__icon--directory mx-auto"
                        ></a>
                        <a
                            v-else-if="faker.files[0].type == 'Image'"
                            href=""
                            class="w-3/5 file__icon file__icon--image mx-auto"
                        >
                            <div class="file__icon--image__preview image-fit">
                                <img
                                    alt="Midone Tailwind HTML Admin Template"
                                    :src="
                                        require(`@/assets/images/${$_.toLower(
                                            faker.files[0]['file_name']
                                        )}`)
                                    "
                                />
                            </div>
                        </a>
                        <a
                            v-else
                            href=""
                            class="w-3/5 file__icon file__icon--file mx-auto"
                        >
                            <div class="file__icon__file-name">
                                {{ faker.files[0].type }}
                            </div>
                        </a>
                        <a
                            href=""
                            class="block font-medium mt-4 text-center truncate"
                            >{{ faker.files[0].file_name }}</a
                        >
                        <div class="text-gray-600 text-xs text-center">
                            {{ faker.files[0].size }}
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
                        Broadcast Message
                    </h2>
                </div>
                <div class="p-5 grid grid-cols-12 gap-4 row-gap-3">
                    <div class="col-span-12 sm:col-span-6">
                        <label>From</label>
                        <input
                            type="text"
                            class="input w-full border mt-2 flex-1"
                            placeholder="example@gmail.com"
                        />
                    </div>
                    <div class="col-span-12 sm:col-span-6">
                        <label>To</label>
                        <input
                            type="text"
                            class="input w-full border mt-2 flex-1"
                            placeholder="example@gmail.com"
                        />
                    </div>
                    <div class="col-span-12 sm:col-span-6">
                        <label>Subject</label>
                        <input
                            type="text"
                            class="input w-full border mt-2 flex-1"
                            placeholder="Important Meeting"
                        />
                    </div>
                    <div class="col-span-12 sm:col-span-6">
                        <label>Has the Words</label>
                        <input
                            type="text"
                            class="input w-full border mt-2 flex-1"
                            placeholder="Job, Work, Documentation"
                        />
                    </div>
                    <div class="col-span-12 sm:col-span-6">
                        <label>Doesn't Have</label>
                        <input
                            type="text"
                            class="input w-full border mt-2 flex-1"
                            placeholder="Job, Work, Documentation"
                        />
                    </div>
                    <div class="col-span-12 sm:col-span-6">
                        <label>Size</label>
                        <select class="input w-full border mt-2 flex-1">
                            <option>10</option>
                            <option>25</option>
                            <option>35</option>
                            <option>50</option>
                        </select>
                    </div>
                </div>
                <div
                    class="px-5 py-3 text-right border-t border-gray-200 dark:border-dark-5"
                >
                    <button
                        type="button"
                        class="button w-20 border text-gray-700 dark:border-dark-5 dark:text-gray-300 mr-1"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        class="button w-20 bg-theme-1 text-white"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
