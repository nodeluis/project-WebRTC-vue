<template>
    <v-navigation-drawer
        v-model="drawer"
        src="@/assets/hollow.jpg"
        mobile-break-point="960"
        app
        width="260"
        dark
    >

        <v-list-item
        >
            <v-list-item-avatar
                class="align-self-center"
                contain
                color="indigo"
            >
                <v-icon dark>mdi-account-circle</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title>{{name}}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-divider class="mb-5"/>

        <v-list
          color="transparent"
          nav
          dense
        >
          <v-list-item
            v-for="(item,index) in items"
            :key="index"
            link
            :to="item.to"
            class="mt-2 black"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <template v-slot:append>
            <div class="pa-2">
            <v-btn block @click="salir">Salir</v-btn>
            </div>
        </template>
    </v-navigation-drawer>
</template>

<script>

export default {
    data(){
        return{
            items: [
                { title: 'Home', icon: 'mdi-view-dashboard', to: '/home' },
                { title: 'Mis grupos', icon: 'mdi-view-dashboard', to: '/group' },
            ],
            name:''
        }
    },
    computed:{
        drawer:{
            get(){
                return this.$store.state.drawer;
            },
            set(val){
                this.$store.commit('DRAWER',val);
            }
        }
    },
    methods:{
        salir(){
            localStorage.removeItem('name');
            localStorage.removeItem('nick');
            localStorage.removeItem('idUser');
            localStorage.removeItem('token');
            localStorage.removeItem('stream');
            this.$router.push('/');
        }
    },
    created(){       
        this.name=localStorage.getItem('name');
    }
}
</script>