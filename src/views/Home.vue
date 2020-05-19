<template>

  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-row 
        >
          <cards v-for="(item,n) in data" :cardProp="item" :key="n"
            class="ma-3 pa-2"
            outlined
          />
        </v-row>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>

import cards from '@/components/CardGroup'

export default {
  name: 'Home',
  data(){
    return{
      data:[],
      isConnected:null
    }
  },
  components:{
    cards:cards
  },
  sockets:{
    connect() {
      this.isConnected = true;
    },

    disconnect() {
      this.isConnected = false;
    }
  },
  mounted(){
    this.listas();
  },
  methods:{
    listas(){
      this.axios({
        method: 'GET',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: null,
        url:'http://192.168.1.5:8000/chat',
      }).then(val=>{
        console.log(val);
        if(val.data.message!='no existen mensajes'){
          this.data=val.data;
        }
      }).catch(err=>{
        console.log(err);
      });
    }
  },
  created(){
    this.$options.sockets.groups=(dt=>{
      console.log('llega el socket');
      
      this.listas();
    });
  }
}
</script>
