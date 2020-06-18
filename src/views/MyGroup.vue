<template>
    <h1>{{id}}</h1>
</template>

<script>
export default {
    data(){
        return{
            
        }
    },
    props: ['id'],
    created(){
        if(this.id=='5eeac798c2c3dd00176de42a'){
            localStorage.setItem('stream',true);
            this.$router.push('/stream');
        }
    }
}
</script>