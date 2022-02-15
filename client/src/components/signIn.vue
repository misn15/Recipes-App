<template>
    <div class="bg">   
        <v-row class="d-flex justify-center mt-6 mb-6">
            <p class="signin">Sign In</p>
        </v-row>
        <form ref="form" class="d-flex justify-center">
            <v-col cols="3">
                <v-text-field
                    filled
                    solo
                    counter="10"
                    label="Username"
                    v-model="username"
                    required
                ></v-text-field>
                <v-text-field
                    filled
                    solo
                    label="Password"
                    type="password"
                    v-model="password"
                    required
                    hide-details
                ></v-text-field>
                </v-col>
        </form>

        <v-row class="d-flex justify-center">
            <v-btn
            color="error"
            class="mt-5 mb-3"
            @click="handleLogin"
            >
            Sign In
            </v-btn>
            
        </v-row>
        <div class="pt-3" v-if="this.err">{{ this.error }}</div>

    </div>
</template>

<script>
import axios from "axios";

export default {

    props: {
    },
    data() {
        return { 
            err: false,
            username: '',
            password: '',
            error: '',
            signedIn: false
        }
    },
    components: {
 
    },
    methods: {

        handleLogin(){
            //const params = new URLSearchParams();
            const params = new URLSearchParams();
            params.append('username', this.username);
            params.append('password', this.password );

            console.log(params);
            // this.$store.commit('setName', {
            // name: this.name
            // });  
            // console.log(this.state.name);               
            // this.$emit('childToParent', this.name);
    
            // let data = { username: this.username, password: this.password };

    
            axios.post('http://localhost:3000/findUser',  params,
                        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(response => {
                console.log(response.data);
                console.log(response.data['name']);
                
                this.$store.commit('isSignedIn', {
                    name: true
                });  

                this.$store.commit('setName', {
                name: response.data['name']

                });  
                this.$emit('childToParent', response.data['name']);            
                
                this.$router.push('search');
            }); 
        }

    },
    computed: {

    },
}
    
</script>

<style>

.bg {
    background-color: #f1f1f1;
}

.ctn {
    line-height: 0.35;
    margin-top: 12px !important;
}

.signin {
    font-size: 25px;
}

.left {
    margin-left: 37% !important;
}

.right {
    margin-right: 37% !important;
}

</style>