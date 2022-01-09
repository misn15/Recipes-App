<template>
    <div class="bg">   
        <!-- <v-container class="ctn"> -->
        <v-row class="d-flex justify-center mt-6 mb-6">
            <p class="signin">Sign Up</p>
        </v-row>
        
        <form ref="form" class="d-flex justify-center">
           
               <v-col cols="4">
                <v-text-field
                    filled
                    width="10%"
                    solo
                    label="Name"
                    type="name"
                    v-model="name"
                    required
                ></v-text-field>
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
        
    
    <!-- <v-card-actions class="mx-0"> -->
        <!-- v-model="submitName"  -->
        <v-row class="d-flex justify-center">
        <v-btn
        color="error"
        width="10%"
        class="mt-3"
        @click="handleLogin"
        >
        Submit
        </v-btn>
        </v-row>

        <div v-if="this.err">{{ this.error }}</div>

        <!-- </v-card-actions> -->
        <!-- <v-spacer class="space"></v-spacer> -->
        <!-- <v-container> -->
            <v-row class="d-flex justify-center">
                <v-divider></v-divider>&nbsp; Or &nbsp;<v-divider></v-divider>
            </v-row>
        <!-- </v-container> -->
        <!-- <v-spacer class="space"></v-spacer> -->
        <v-row class="d-flex justify-center">
        <v-btn
        depressed
        width="10%"
        color="primary"
        href="http://localhost:3000/auth/google"
        >
        Sign In with Google
        </v-btn>
        </v-row>
    
        <!-- </v-container> -->
    </div>
</template>

<script>
import axios from "axios";

export default {

    props: {
    },
    data() {
        return { 
            isFavorited: false,
            clientId: '',
            clientToken: '',
            username: '',
            password: '',
            results: {},
            err: false,
            error: '',
            greeting: '',
            name: ''
        }
    },
    components: {
 
    },
    methods: {

        handleLogin(){
            const params = new URLSearchParams();
            params.append('username', this.username);
            params.append('password', this.password );
            params.append('name', this.name);
            console.log(this.username);
            console.log(this.name);    
            this.$store.commit('setName', {
            name: this.name
            });  
            // console.log(this.state.name);               
            this.$emit('childToParent', this.name);
    
            // let data = { username: this.username, password: this.password };
            axios
            .post('http://localhost:3000/register', params,
            {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded', 
                }
            })
            .then(response => {
            if (response.data['name']){
                this.err = true;
                this.error = response.data['message'];
            } else if(response.data === 'Success') {
                this.$router.push('search'); 
                this.$emit('childToParent', this.name); 
            }    
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
    max-width: 25%;

    /* max-width: 100px !important; */
}

.signin {
    font-size: 25px;
}

.space {
    height: 20px;
}
</style>