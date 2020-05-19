<template>
    <v-card
    max-width="300"
    class="mx-auto"
  >
    <v-list-item>
      <v-list-item-avatar color="grey"></v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline">{{cardProp.nombre}}</v-list-item-title>
        <v-list-item-subtitle>Creador: {{cardProp.creador}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-img
      src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg"
      height="194"
    ></v-img>

    <v-card-text>
      {{cardProp.description}}
    </v-card-text>

    <v-card-actions>
      <v-spacer/>
      <v-btn
        text
        color="deep-purple accent-4"
        @click="redir"
      >
        Ingresar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
    props:{
        cardProp:{
            type:Object,
            required:true
        }
    },
    methods:{
        redir(){
            this.$router.push('/mygroup/'+this.cardProp._id);
        }
    }
}
</script>