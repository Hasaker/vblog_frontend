<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  created() {
    // Load state from sessionStorage when page loading
    if (sessionStorage.getItem("state") !== null) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem("state"))))
    }

    // Save state to sessionStorage when refresh
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("state", JSON.stringify(this.$store.state))
    })
  }
}
</script>

<style>
  * { margin: 0; padding: 0; }

  body {
    background-color: #F2F6FC;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    font-weight: 400;
  }

  a {
      cursor: pointer;
      text-decoration: none;
      transition: none 86ms ease-out;
  }

  html{height:100%;}
  body{min-height:100%;}
  body{position:relative;}

</style>
