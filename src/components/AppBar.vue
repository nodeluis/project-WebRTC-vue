<template>
    <v-app-bar
        app 
        style="background: rgb(2,0,36);background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(24,54,93,0.396796218487395) 100%, rgba(0,212,255,1) 100%);"
        height="60"
        dark
    >
        <v-btn
            class="mr-3"
            elevation="2"
            fab
            small
            @click="DRAWER(!drawer)"
        >
            <v-icon>
                mdi-dots-vertical
            </v-icon>
        </v-btn>

        <v-spacer/>

        <v-text-field
            label="Buscar..."
            hide-details
            style="max-width: 300px"
        >
            <template
                v-if="$vuetify.breakpoint.mdAndUp"
                v-slot:append-outer
            >
                <v-btn
                    class="mt-n2"
                    elevation="2"
                    fab
                    small
                >
                    <v-icon>mdi-magnify</v-icon>
                </v-btn>
            </template>
        </v-text-field>
        <v-menu
            bottom
            left
        >
            <template v-slot:activator="{ on }">
            <v-btn
                icon
                v-on="on"
            >
                <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
            </template>

            <v-list>
            <v-list-item
                v-for="(item, i) in items"
                :key="i"
            >
                <v-list-item-title>
                    <v-btn @click="dialog=true">{{ item.title }}</v-btn>
                </v-list-item-title>
            </v-list-item>
            </v-list>
        </v-menu>
        <v-dialog v-model="dialog" persistent max-width="290">
            <v-card>
                <v-card-title class="headline">{{aviso}}</v-card-title>
                <v-card-text>
                    <v-text-field label="Nombre del grupo" v-model="nombre"></v-text-field>
                    <v-textarea
                        label="Descripción"
                        rows="2"
                        v-model="descripcion"
                    ></v-textarea>
                </v-card-text>
                <v-card-actions>
                <v-btn color="green darken-1" text @click="crear">Crear</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="dialog=false">Cancelar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-app-bar>
</template>

<script>

import {mapState,mapMutations} from 'vuex'
import qs from 'qs'

export default {
    data(){
        return{
            items: [
                { title: 'Crear grupo' },
            ],
            dialog:false,
            nombre:'',
            descripcion:'',
            aviso:'',
            isConnected:null
        }
    },
    sockets:{
        connect() {
        this.isConnected = true;
        },

        disconnect() {
        this.isConnected = false;
        }
    },
    computed:{
        ...mapState(['drawer'])
    },
    methods:{
        ...mapMutations(['DRAWER']),
        crear(){
            if(this.nombre!=''&&this.descripcion!=''){
                let datos={
                    nombre:this.nombre,
                    description:this.descripcion,
                    creador:localStorage.getItem('name'),
                    id:localStorage.getItem('idUser')
                }
                this.axios({
                    method: 'POST',
                    headers: { 'content-type': 'application/x-www-form-urlencoded' },
                    data: qs.stringify(datos),
                    url:this.$store.state.ip+'/chat',
                }).then(val=>{
                    if(val.data.message!='error'){
                        this.$socket.emit('upGroups',null);
                    }
                }).catch(err=>{
                    console.log(err);
                });
                this.dialog=false;
            }else{
                this.aviso='Rellena los campos';
            }
            
        }
    },
}
</script>