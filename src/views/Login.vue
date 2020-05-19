<template>
    <v-card
        class="mx-auto my-auto"
        width="500"
        elevation="5"
    >
        <v-img
            class="white--text align-end"
            height="100px"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        >
            <v-card-title>Iniciar sesión</v-card-title>
        </v-img>
        <v-card-text>
            <v-dialog
              v-model="dialog"
              max-width="290"
              >
              <v-card>
                  <v-card-title class="headline">{{restMessage}}</v-card-title>
                  <v-card-text>
                  Error.
                  </v-card-text>
                  <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                      color="green darken-1"
                      text
                      @click="dialog=false"
                    >
                        Ok
                  </v-btn>
                  </v-card-actions>
                </v-card>
            </v-dialog>
            <form
              autocomplete="off"
            >
                <v-text-field
                    v-model="name"
                    :error-messages="nameErrors"
                    :counter="30"
                    label="Email"
                    required
                    @input="$v.name.$touch()"
                    @blur="$v.name.$touch()"
                ></v-text-field>
                <v-text-field
                    v-model="pass"
                    :error-messages="passErrors"
                    label="Password"
                    required
                    @input="$v.pass.$touch()"
                    @blur="$v.pass.$touch()"
                    type="password"
                ></v-text-field>

                <v-btn class="mr-4" @click="submit">Entrar</v-btn>
                <v-btn @click="reg">Registrarme</v-btn>
            </form>
        </v-card-text>
        
    </v-card>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength } from 'vuelidate/lib/validators'
import qs from 'qs'

export default {
    mixins: [validationMixin],

    validations: {
      name: { required, maxLength: maxLength(30) },
      pass: { required },
    },

    data: () => ({
      name: '',
      pass: '',
      dialog:false,
      restMessage:''
    }),

    computed: {
      nameErrors () {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.required && errors.push('Email es requerido')
        return errors
      },
      passErrors () {
        const errors = []
        if (!this.$v.pass.$dirty) return errors
        !this.$v.pass.required && errors.push('Password es requerido')
        return errors
      },
    },

    methods: {
      submit () {
        this.$v.$touch()
        if(this.name!=''&&this. pass!=''){
          this.axios({
              method: 'POST',
              headers: { 'content-type': 'application/x-www-form-urlencoded' },
              data: qs.stringify({email:this.name,password:this.pass}),
              url:'http://192.168.1.5:8000/user/login',
          }).then(val=>{
              if(val.data.message=='Bienvenido'){
                localStorage.setItem('name',val.data.user.nombre);
                localStorage.setItem('nick',val.data.user.nick);
                localStorage.setItem('idUser',val.data.user.id);
                localStorage.setItem('token',val.data.token);
                this.$router.push('/home');
              }else{
                this.restMessage=val.data.message;
                this.dialog=true;
              }
          }).catch(err=>{
              console.log(err);
          });
          
        }      
      },
      reg () {
        this.$router.push('/register');
      },
    }
}
</script>