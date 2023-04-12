const state = () => {
  return {
    menu: [
      // {
      //   icon: "HomeIcon",
      //   pageName: "side-menu-dashboard",
      //   title: "Dashboard"
      // },
      {
        icon: "DownloadIcon",
        pageName: "download-luncher",
        title: "Download Luncher"
      },
      {
        icon: "SlidersIcon",
        pageName: "leaderboards",
        title: "LeaderBoards"
      },
      {
        icon: "HelpCircleIcon",
        pageName: "support",
        title: "Support"
      },
      "devider",
      {
        icon: "TrelloIcon",
        pageName: "profile",
        title: "profile"
      },
      {
        icon: "SettingsIcon",
        pageName: "settings",
        title: "Settings"
      },
      {
        icon: "FileTextIcon",
        pageName: "side-menu-file-manager",
        title: "Logs"
      },
      "devider",
      {
        icon: "ShoppingBagIcon",
        pageName: "shop",
        title: "Shop"
      },
      {
        icon: "DollarSignIcon",
        pageName: "donate",
        title: "Donate"
      },
      {
        icon: "CrosshairIcon",
        pageName: "side-menu-file-manager",
        title: "Roulette"
      },
    ]
  };
};

// getters
const getters = {
  menu: state => state.menu
};

// actions
const actions = {};

// mutations
const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
