<template>
    <v-container>
        <AppBar/>
        <Drawer/>
        <v-content>
            <router-view/>
        </v-content>
        <Footer/>
    </v-container>
</template>

<script>

import AppBar from '@/components/AppBar';
import Drawer from '@/components/Drawer';
import Footer from '@/components/FooterPage';

export default {
    components:{
        AppBar,Drawer,Footer
    },
    created(){
        let local=localStorage.getItem('token');
        if(local==null||local=='undefined'){
            this.$router.push('/');
        }
    }
}
</script>