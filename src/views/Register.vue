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
                <v-card-title>Registro</v-card-title>
            </v-img>
            <v-card-text>
                <v-dialog
                v-model="dialog"
                max-width="290"
                >
                <v-card>
                    <v-card-title class="headline">{{restMessage}}</v-card-title>
                    <v-card-text>
                    Ud ahora es parte de la aplicación.
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="green darken-1"
                        text
                        @click="redir"
                    >
                        Ok
                    </v-btn>
                    </v-card-actions>
                </v-card>
                </v-dialog>
                <v-dialog
                v-model="dialog3"
                max-width="290"
                >
                <v-card>
                    <v-card-title class="headline">{{restMessage2}}</v-card-title>
                    <v-card-text>
                    Error.
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="green darken-1"
                        text
                        @click="dialog3=false"
                    >
                        Ok
                    </v-btn>
                    </v-card-actions>
                </v-card>
                </v-dialog>
                <v-dialog
                v-model="dialog2"
                max-width="290"
                >
                <v-card>
                    <v-card-title class="headline">Error</v-card-title>
                    <v-card-text>
                    Vuelva a llenar sus datos.
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="green darken-1"
                        text
                        @click="dialog2 = false"
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
                        label="Nombre"
                        required
                        @input="$v.name.$touch()"
                        @blur="$v.name.$touch()"
                    ></v-text-field>
                    <v-text-field
                        v-model="nick"
                        :error-messages="nickErrors"
                        :counter="30"
                        label="Nick"
                        required
                        @input="$v.nick.$touch()"
                        @blur="$v.nick.$touch(),verNick()"
                    ></v-text-field>
                    <v-text-field
                        v-model="email"
                        :error-messages="emailErrors"
                        label="E-mail"
                        required
                        @input="$v.email.$touch()"
                        @blur="$v.email.$touch();verEmail()"
                    ></v-text-field>
                    <v-text-field
                        v-model="pass"
                        :error-messages="passErrors"
                        :counter="30"
                        label="Password"
                        required
                        @input="$v.pass.$touch()"
                        @blur="$v.pass.$touch()"
                        type="password"
                        
                    ></v-text-field>
                    <v-text-field
                        v-model="pass2"
                        :error-messages="passErrors2"
                        :counter="30"
                        label="Repita el Password"
                        required
                        @input="$v.pass2.$touch()"
                        @blur="$v.pass2.$touch()"
                        type="password"
                        
                    ></v-text-field>
                    <v-btn class="mr-4" @click="submit">Enviar</v-btn>
                    <v-btn @click="clear">Limpiar</v-btn>
                </form>
            </v-card-text>
            
        </v-card>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, minLength, email } from 'vuelidate/lib/validators'
import qs from 'qs';

export default {
    mixins: [validationMixin],

    validations: {
      name: { required, maxLength: maxLength(30) },
      email: { required, email },
      nick:{ required },
      pass:{ required},
      pass2:{ required}
    },

    data: () => ({
      name: '',
      email: '',
      nick:'',
      pass:'',
      pass2:'',
      dialog: false,
      dialog2: false,
      dialog3:false,
      restMessage:'',
      restMessage2:''
    }),

    computed: {
      nameErrors () {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.maxLength && errors.push('Solo 20 caracteres')
        !this.$v.name.required && errors.push('Name es requerido.')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('El e-mail es invalido')
        !this.$v.email.required && errors.push('E-mail es requerido')
        return errors
      },
      nickErrors(){
        const errors = []
        if (!this.$v.nick.$dirty) return errors
        !this.$v.nick.required && errors.push('Nick es requerido')
        return errors
      },
      passErrors(){
        const errors=[]
        if (!this.$v.pass.$dirty) return errors
        !this.$v.pass.required && errors.push('Password es requerido')
        return errors
      },
      passErrors2(){
        const errors=[]
        if (!this.$v.pass2.$dirty) return errors
        !this.$v.pass2.required && errors.push('Password es requerido')
        this.pass!=this.pass2 && errors.push('Las contraseñas no son iguales')
        return errors
      }
    },

    methods: {
      submit () {
        this.$v.$touch()
        if(this.name != ''&&this.email != ''&&this.nick!=''&&this.pass!=''&&this.pass2!=''){
            let datos={
                nombre:this.name,
                nick:this.nick,
                email:this.email,
                password:this.pass
            }
            this.axios({
                method: 'POST',
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                data: qs.stringify(datos),
                url:'http://192.168.1.5:8000/user',
            }).then(dat=>{
                this.restMessage=dat.data.message;
                this.dialog=true;
                this.clear();
            }).catch(err=>{
                console.log(err);
            });
        }else{
            this.dialog2=true;
        }
      },
      clear () {
        this.$v.$reset()
        this.name = ''
        this.email = ''
        this.nick=''
        this.pass=''
        this.pass2=''
      },
      redir(){
          this.clear();
          this.$router.push('/');
      },
      verEmail(){
        this.axios({
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify({email:this.email}),
            url:'http://192.168.1.5:8000/user/emailv',
        }).then(dat=>{
            if(dat.data.val){
                this.restMessage2='El email ya se registro.'
                this.dialog3=true;
            }
        }).catch(err=>{
            console.log(err);
            
        });
      },
      verNick(){
        this.axios({
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify({nick:this.nick}),
            url:'http://192.168.1.5:8000/user/nickv',
        }).then(dat=>{
            if(dat.data.val){
                this.restMessage2='Ya existe un usuario con el mismo nick.'
                this.dialog3=true;
            }
        }).catch(err=>{
            console.log(err);
        });
      }
    }
}
</script>