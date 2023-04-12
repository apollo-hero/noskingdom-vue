<template>
    <div>
        <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
            <div
                class="nav-tabs flex flex-col sm:flex-row justify-center lg:justify-start"
            >
                <a
                    data-toggle="tab"
                    data-target="#level"
                    href="javascript:;"
                    class="py-4 sm:mr-8 active"
                    >Level</a
                >
                <a
                    data-toggle="tab"
                    data-target="#hero_level"
                    href="javascript:;"
                    class="py-4 sm:mr-8"
                    >Heroic Level</a
                >
                <a
                    data-toggle="tab"
                    data-target="#reputation"
                    href="javascript:;"
                    class="py-4 sm:mr-8"
                    >Reputation</a
                >
            </div>
        </div>
        <!-- BEGIN: HTML Table Data -->
        <div class="intro-y tab-content mt-5">
            <div
                id="level"
                class="intro-y box p-5 mt-5 tab-content__pane active"
            >
                <div class="overflow-x-auto scrollbar-hidden">
                    <div
                        id="tabulator"
                        ref="table"
                        class="mt-5 table-report table-report--tabulator"
                    ></div>
                </div>
            </div>
            <div
                id="hero_level"
                class="intro-y box p-5 mt-5 tab-content__pane"
            >
                <div class="overflow-x-auto scrollbar-hidden">
                    <div
                        id="tabulator"
                        ref="table_hero"
                        class="mt-5 table-report table-report--tabulator"
                    ></div>
                </div>
            </div>
            <div
                id="reputation"
                class="intro-y box p-5 mt-5 tab-content__pane"
            >
                <div class="overflow-x-auto scrollbar-hidden">
                    <div
                        id="tabulator"
                        ref="table_reputation"
                        class="mt-5 table-report table-report--tabulator"
                    ></div>
                </div>
            </div>
        </div>

        <!-- END: HTML Table Data -->
    </div>
</template>

<script>
import xlsx from "xlsx";
import feather from "feather-icons";
import Tabulator from "tabulator-tables";

export default {
    data() {
        return {
            table: null,
            table_hero: null,
            table_reputation: null,
        };
    },
    mounted() {
        this.table = new Tabulator(this.$refs.table, {
            ajaxURL: "/api/getRankLevel",
            ajaxFiltering: true,
            ajaxSorting: false,
            printAsHtml: true,
            printStyled: true,
            pagination: "remote",
            paginationSize: 10,
            paginationSizeSelector: [10, 20, 30, 40],
            layout: "fitColumns",
            responsiveLayout: "collapse",
            placeholder: "No matching records found",
            columns: [
                {
                    formatter: "responsiveCollapse",
                    width: 40,
                    minWidth: 30,
                    align: "center",
                    resizable: false,
                    headerSort: false
                },

                // For HTML table
                {
                    title: "RANK",
                    minWidth: 200,
                    responsive: 0,
                    field: "Name",
                    vertAlign: "middle",
                    print: false,
                    download: false,
                    formatter(cell) {
                        return `<div class="font-medium whitespace-no-wrap">${cell.getData().Id}</div>`;
                    }
                },
                {
                    title: "IMAGES",
                    minWidth: 200,
                    field: "images",
                    hozAlign: "center",
                    vertAlign: "middle",
                    print: false,
                    download: false,
                    formatter(cell) {
                        let image = cell.getData().Class == 0 && cell.getData().Gender == 0 ? '32000' :
                                    cell.getData().Class == 0 && cell.getData().Gender == 1 ? '32020' :
                                    cell.getData().Class == 1 && cell.getData().Gender == 0 ? '32040' :
                                    cell.getData().Class == 1 && cell.getData().Gender == 1 ? '32060' :
                                    cell.getData().Class == 2 && cell.getData().Gender == 0 ? '32080' :
                                    cell.getData().Class == 2 && cell.getData().Gender == 1 ? '32100' :
                                    cell.getData().Class == 3 && cell.getData().Gender == 0 ? '32120' : '32140';
                                    
                        return `<div class="flex lg:justify-center">
                                    <div class="intro-x w-10 h-10 image-fit">
                                        <img alt="" class="rounded-full" src="${require("@/assets/items/" + image + ".png")}">
                                    </div>
                                </div>`;
                    }
                },
                {
                    title: "CLASS",
                    minWidth: 200,
                    field: "remaining_stock",
                    hozAlign: "center",
                    vertAlign: "middle",
                    print: false,
                    download: false,
                    formatter(cell) {
                        return `<div class="flex items-center lg:justify-center">${cell.getData().Class}</div>`;
                    }
                },
                {
                    title: "NAME",
                    minWidth: 200,
                    field: "status",
                    hozAlign: "center",
                    vertAlign: "middle",
                    print: false,
                    download: false,
                    formatter(cell) {
                        return `<div class="flex items-center lg:justify-center">${cell.getData().Name}</div>`;
                    }
                },
                {
                    title: "LEVEL",
                    minWidth: 200,
                    field: "actions",
                    responsive: 1,
                    hozAlign: "center",
                    vertAlign: "middle",
                    print: false,
                    download: false,
                    formatter(cell) {
                        return `<div class="flex lg:justify-center items-center">  ${cell.getData().Level}</div>`;
                    }
                },
            ],
            renderComplete() {
                feather.replace({
                    "stroke-width": 1.5
                });
            }
        });

        this.table_hero = new Tabulator(this.$refs.table_hero, {
            ajaxURL: "/api/getRankHero",
            ajaxFiltering: true,
            ajaxSorting: false,
            printAsHtml: true,
            printStyled: true,
            pagination: "remote",
            paginationSize: 10,
            paginationSizeSelector: [10, 20, 30, 40],
            layout: "fitColumns",
            responsiveLayout: "collapse",
            placeholder: "No matching records found",
            columns: [
                {
                    formatter: "responsiveCollapse",
                    width: 40,
                    minWidth: 30,
                    align: "center",
                    resizable: false,
                    headerSort: false
                },

                // For HTML table
                {
                    title: "RANK",
                    minWidth: 200,
                    responsive: 0,
                    field: "Name",
                    vertAlign: "middle",
                    print: false,
                    download: false,
                    formatter(cell) {
                        return `<div class="font-medium whitespace-no-wrap">${cell.getData().Id}</div>`;
                    }
                },
                {
                    title: "IMAGES",
                    minWidth: 200,
                    field: "images",
                    hozAlign: "center",
                    vertAlign: "middle",
                    print: false,
                    download: false,
                    formatter(cell) {
                        let image = cell.getData().Class == 0 && cell.getData().Gender == 0 ? '32000' :
                                    cell.getData().Class == 0 && cell.getData().Gender == 1 ? '32020' :
                                    cell.getData().Class == 1 && cell.getData().Gender == 0 ? '32040' :
                                    cell.getData().Class == 1 && cell.getData().Gender == 1 ? '32060' :
                                    cell.getData().Class == 2 && cell.getData().Gender == 0 ? '32080' :
                                    cell.getData().Class == 2 && cell.getData().Gender == 1 ? '32100' :
                                    cell.getData().Class == 3 && cell.getData().Gender == 0 ? '32120' : '32140';
                                    
                        return `<div class="flex lg:justify-center">
                                    <div class="intro-x w-10 h-10 image-fit">
                                        <img alt="" class="rounded-full" src="${require("@/assets/items/" + image + ".png")}">
                                    </div>
                                </div>`;
                    }
                },
                {
                    title: "CLASS",
                    minWidth: 200,
                    field: "remaining_stock",
                    hozAlign: "center",
                    vertAlign: "middle",
                    print: false,
                    download: false,
                    formatter(cell) {
                        return `<div class="flex items-center lg:justify-center">${cell.getData().Class}</div>`;
                    }
                },
                {
                    title: "NAME",
                    minWidth: 200,
                    field: "status",
                    hozAlign: "center",
                    vertAlign: "middle",
                    print: false,
                    download: false,
                    formatter(cell) {
                        return `<div class="flex items-center lg:justify-center">${cell.getData().Name}</div>`;
                    }
                },
                {
                    title: "hEROLEVEL",
                    minWidth: 200,
                    field: "actions",
                    responsive: 1,
                    hozAlign: "center",
                    vertAlign: "middle",
                    print: false,
                    download: false,
                    formatter(cell) {
                        return `<div class="flex lg:justify-center items-center">  ${cell.getData().HeroLevel}</div>`;
                    }
                },
            ],
            renderComplete() {
                feather.replace({
                    "stroke-width": 1.5
                });
            }
        });

        this.table_reputation = new Tabulator(this.$refs.table_reputation, {
            ajaxURL: "/api/getRankReput",
            ajaxFiltering: true,
            ajaxSorting: true,
            printAsHtml: true,
            printStyled: true,
            pagination: "remote",
            paginationSize: 10,
            paginationSizeSelector: [10, 20, 30, 40],
            layout: "fitColumns",
            responsiveLayout: "collapse",
            placeholder: "No matching records found",
            columns: [
                {
                    formatter: "responsiveCollapse",
                    width: 40,
                    minWidth: 30,
                    align: "center",
                    resizable: false,
                    headerSort: false
                },

                // For HTML table
                {
                    title: "RANK",
                    minWidth: 200,
                    responsive: 0,
                    field: "Name",
                    vertAlign: "middle",
                    print: false,
                    download: false,
                    formatter(cell) {
                        return `<div class="font-medium whitespace-no-wrap">${cell.getData().Id}</div>`;
                    }
                },
                {
                    title: "IMAGES",
                    minWidth: 200,
                    field: "images",
                    hozAlign: "center",
                    vertAlign: "middle",
                    print: false,
                    download: false,
                    formatter(cell) {
                        let image = cell.getData().Class == 0 && cell.getData().Gender == 0 ? '32000' :
                                    cell.getData().Class == 0 && cell.getData().Gender == 1 ? '32020' :
                                    cell.getData().Class == 1 && cell.getData().Gender == 0 ? '32040' :
                                    cell.getData().Class == 1 && cell.getData().Gender == 1 ? '32060' :
                                    cell.getData().Class == 2 && cell.getData().Gender == 0 ? '32080' :
                                    cell.getData().Class == 2 && cell.getData().Gender == 1 ? '32100' :
                                    cell.getData().Class == 3 && cell.getData().Gender == 0 ? '32120' : '32140';
                                    
                        return `<div class="flex lg:justify-center">
                                    <div class="intro-x w-10 h-10 image-fit">
                                        <img alt="" class="rounded-full" src="${require("@/assets/items/" + image + ".png")}">
                                    </div>
                                </div>`;
                    }
                },
                {
                    title: "CLASS",
                    minWidth: 200,
                    field: "remaining_stock",
                    hozAlign: "center",
                    vertAlign: "middle",
                    print: false,
                    download: false,
                    formatter(cell) {
                        return `<div class="flex items-center lg:justify-center">${cell.getData().Class}</div>`;
                    }
                },
                {
                    title: "NAME",
                    minWidth: 200,
                    field: "status",
                    hozAlign: "center",
                    vertAlign: "middle",
                    print: false,
                    download: false,
                    formatter(cell) {
                        return `<div class="flex items-center lg:justify-center">${cell.getData().Name}</div>`;
                    }
                },
                {
                    title: "REPUTATION",
                    minWidth: 200,
                    field: "actions",
                    responsive: 1,
                    hozAlign: "center",
                    vertAlign: "middle",
                    print: false,
                    download: false,
                    formatter(cell) {
                        return `<div class="flex lg:justify-center items-center">  ${cell.getData().Reput}</div>`;
                    }
                },
            ],
            renderComplete() {
                feather.replace({
                    "stroke-width": 1.5
                });
            }
        });

        // Redraw table onresize
        window.addEventListener("resize", () => {
            this.table.redraw();
            feather.replace({
                "stroke-width": 1.5
            });
        });
    },
    methods: {
    }
};
</script>
