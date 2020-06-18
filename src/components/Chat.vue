<template>
  <v-container
  >
    <v-row >
      <v-col cols="12">
        <v-card
          max-width="700"
          class="mx-auto"
          elevation="5"
          
        >
          <v-img
            height="150"
            src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg"
          ></v-img>

          <v-expansion-panels
            v-model="panel"
            multiple
          >
            <v-expansion-panel>
                <v-expansion-panel-header>Conectados:</v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-btn v-for="(item,index) in escucha" :key="index+1001">
                        {{item.nick}}
                    </v-btn>
                </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>

          <v-container
            id="scroll-target"
            style="max-height:300px"
            class="overflow-auto"
            
          >
            <v-row v-scroll:#scroll-target="onScroll" >
              <v-col 
                cols="12"
                v-for="(item,index) in msg" 
                :key="index"
                class="d-flex align-start flex-column"
                
              >
                <strong>{{item.nick}}:</strong>{{item.message}}
              </v-col> 
            </v-row>
          </v-container>

          <v-divider elevation="2"></v-divider>

          <v-card-actions
          >
            <v-text-field
              label="Escriba su mensaje..."
              style="max-width:600"
              v-model="send"
              @keyup.enter="insertarMensaje"
            >
            </v-text-field>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
//:class="['d-flex',(index%2==0?'align-end':'align-start'),'flex-column']"

import qs from 'qs'

export default {
    data(){
        return{
            offsetTop: 300,
            send:'',
            messages:[],
            panel: [0, 1],
            escucha:[]
        }
    },
    sockets:{
        connect() {
            console.log('socket connected')
        },
        customEmit(data) {
            console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
        }
    },
    computed: {
        msg(){
            return this.messages;
        }
    },
    methods:{
        onScroll(e){
            this.offsetTop=e.target.scrollTop;
        },
        insertarMensaje(){
            this.$socket.emit('chat719',{nick:localStorage.getItem('nick'),message:this.send});
            this.send='';
        }
    },
    created(){
        this.$options.sockets.conectados=(dat=>{
          this.escucha=dat
        });
        this.$options.sockets.chat719=(dat=>{
            this.messages.push(dat);
        });
        this.axios({
            method: 'GET',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: null,
            url:this.$store.state.ip+'/chat/chat719',
        }).then(val=>{
            this.messages=val.data;
        }).catch(err=>{
            console.log(err);
        });
    }
}
</script>