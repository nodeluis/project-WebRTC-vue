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
        if(this.id=='5ee6cbcdc897e9003b234d6a'){
            localStorage.setItem('stream',true);
            this.$router.push('/stream');
        }
    }
}
</script>