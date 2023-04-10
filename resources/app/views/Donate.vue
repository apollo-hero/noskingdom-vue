<template>
  <div class="grid grid-cols-12 gap-6">
    <div class="col-span-12 xxl:col-span-9 grid grid-cols-12 gap-6">
      <!-- BEGIN: General Report -->
      <div class="col-span-12 mt-8">
        <div class="intro-y flex items-center h-10">
          <h2 class="text-lg font-medium truncate mr-5">General Report</h2>
          <a href="" class="ml-auto flex text-theme-1 dark:text-theme-10">
            <RefreshCcwIcon class="w-4 h-4 mr-3" /> Reload Data
          </a>
        </div>
        <div class="grid grid-cols-12 gap-6 mt-5">
          <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
            <div class="report-box zoom-in">
              <div class="box p-5">
                <div class="flex">
                  <ShoppingCartIcon class="report-box__icon text-theme-10" />
                  <div class="ml-auto">
                    <Tippy
                      tag="div"
                      class="report-box__indicator bg-theme-9 cursor-pointer"
                      content="33% Higher than last month"
                    >
                      33% <ChevronUpIcon class="w-4 h-4" />
                    </Tippy>
                  </div>
                </div>
                <div class="text-3xl font-bold leading-8 mt-6">4.510</div>
                <div class="text-base text-gray-600 mt-1">Item Sales</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </template>
  