<template>
  <v-layout
    column
    justify-center
    align-center>
    <v-flex
      xs12
      sm8
      md6>
      <div class="text-xs-center">
        <logo/>
        <vuetify-logo/>
      </div>
      <v-card>
        <v-card-title class="headline">Welcome to the Vuetify + Nuxt.js template</v-card-title>
        <v-card-text>
          <p>Vuetify is a progressive Material Design component framework for Vue.js. It was designed to empower developers to create amazing applications.</p>
          <p>For more information on Vuetify, check out the <a
            href="https://vuetifyjs.com"
            target="_blank">documentation</a>.</p>
          <p>If you have questions, please join the official <a
            href="https://chat.vuetifyjs.com/"
            target="_blank"
            title="chat">discord</a>.</p>
          <p>Find a bug? Report it on the github <a
            href="https://github.com/vuetifyjs/vuetify/issues"
            target="_blank"
            title="contribute">issue board</a>.</p>
          <p>Thank you for developing with Vuetify and I look forward to bringing more exciting features in the future.</p>
          <div class="text-xs-right">
            <em><small>&mdash; John Leider</small></em>
          </div>
          <hr class="my-3">
          <a
            href="https://nuxtjs.org/"
            target="_blank">Nuxt Documentation</a>
          <br>
          <a
            href="https://github.com/nuxt/nuxt.js"
            target="_blank">Nuxt GitHub</a>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            color="primary"
            text
            nuxt
            to="/inspire">Continue</v-btn>
        </v-card-actions>
      </v-card>
<div id="mypage">
  <p><textarea v-model="note_content"></textarea></p>
  <p><button @click="saveContent(note_content)">ノートを保存する</button></p>
  <div v-for="(item, i) in notes" v-bind:key='i' class='column is-2'>{{ item.data().content }}
  </div>
</div>
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import firebaseAPI from '~/plugins/firebaseAPI'
import logUtil from '~/plugins/logUtil'

export default {
  name: 'mypage',
  components: {
    Logo,
    VuetifyLogo
  },
  data() {
    return {
      user: '',
      note_content: 'hello',
      notes: []
    }
  },
  created: function() {
    this.user = this.$store.state.Account.user;
    console.log('index page user = ', logUtil.stringify(this.user))
    firebaseAPI.fetchNotes(this.user.uid)
    .then(querySnapshot => {
      this.notes = querySnapshot.docs
    }).catch(err => {
      console.log("Error getting documents: ", err)
    })
  },
  methods: {
    saveContent: function(value) {
      let newEntry = {
        content:value
      }
      firebaseAPI.addNote(newEntry, this.user.uid)
      .then(newData => {
        console.log('newdata = ', logUtil.stringify(newData))
      }).catch(err => {
        console.log('addNote failed, err = ', err)
      })
      
      firebaseAPI.fetchNotes(this.user.uid)
      .then(querySnapshot => {
        this.notes = querySnapshot.docs
      }).catch(err => {
        console.log("Error getting documents: ", err)
      })
    },
  }
}
</script>
