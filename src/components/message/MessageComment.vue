<template>
  <div class="message-card">
    <div>
      <b>评论信息</b>
      <el-link type="primary" :underline=false class="message-button-read-all" v-on:click="readAllMessage()">
        <i class="el-icon-finished"></i>
      </el-link>
    </div>
    <div v-for="message in messageComments" :key="message.id" class="text item message-item">
      <div>
        <el-link type="primary" :underline=false class="message-item-text"
                 :disabled="message.status === 1" v-on:click="userPage(message)">
          {{ message.createUser.nickname }}
        </el-link>
        <el-link v-if="message.commentId === null" :underline=false class="message-item-text"
                 :disabled="message.status === 1" v-on:click="mainPage(message)">
          评论了你:
        </el-link>
        <el-link v-else :underline=false class="message-item-text">
          回复了你:
        </el-link>
        <el-link type="primary" :underline=false class="message-item-text"
                 :disabled="message.status === 1" v-on:click="mainPage(message)">
          {{ message.commentSummary }}
        </el-link>
        <span class="message-time">
        {{ formatTime(message.createTime) }}
      </span>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { mapState, mapActions } from 'vuex'
  import { formatTime } from "../../utils/time";

  export default {
    name: 'MessageComment',

    computed: {
      ...mapState(['messageComments'])
    },

    methods: {
      ...mapActions(['user', 'main']),
      mainPage(message) {
        this.main(message.postId)
        this.readMessage(message.id)
        if (this.$route.path !== '/') {
          this.$router.push({path: '/'})
        }
      },
      userPage(message) {
        this.user(message.createUser.id)
        this.readMessage(message.id)
        if (this.$route.path !== '/user') {
          this.$router.push({path: '/user'})
        }
      },

      readMessage(messageId) {
        this.messageComments.filter(message => message.id === messageId).map(message => message.status = 1)
        this.$store.commit('initMessageComments', this.messageComments)
        console.log(this.messageComments)
        axios.post('/post/post/read-message', {
          messageIds: [messageId],
          messageType: 'COMMENT'
        })
      },
      readAllMessage() {
        this.messageComments.map(message => message.status = 1)
        this.$store.commit('initMessageComments', this.messageComments)
        axios.post('/post/post/read-message', {
          messageIds: this.messageComments.map(message => message.id),
          messageType: 'COMMENT'
        })
      },

      formatTime(time) {
        return formatTime(time);
      }
    }
  }
</script>

<style scoped>
  .message-card {
    padding: 5px;
    margin-top: 5px;
  }
  .message-item {
    width: 400px;
    margin-top: 6px;
  }
  .message-item-text {
    font-weight: normal;
    font-size: 13px;
  }
  .message-button-read-all {
    float: right;
    padding-top: 2px;
  }
  .el-icon-finished {
    font-weight: bold;
    font-size: 16px;
    float: right;
    text-align: center;
    vertical-align: middle;
  }
  .message-button {
    font-weight: normal;
    font-size: 12px;
    float: right;
    margin-left: 5px;
    padding-top: 4px;
  }
  .message-time {
    padding: 2px 0 0 0;
    font-size: 11px;
    color: #606266;
    float: right;
  }
</style>
