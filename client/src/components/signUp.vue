<template>
    <div class="bg">   
        <v-row class="d-flex justify-center mt-6 mb-6">
            <p class="signin">Sign Up</p>
        </v-row>
        <form ref="form" class="d-flex justify-center">
            <v-col cols="3">
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

        <v-row class="d-flex justify-center">
            <v-btn
            color="error"
            class="mt-5 mb-5"
            @click="handleLogin"
            >
            Submit
            </v-btn>
        </v-row>

        <div v-if="this.err">{{ this.error }}</div>
            <v-row class="ctn">
                <v-divider inset class="left"></v-divider>&nbsp;Or&nbsp;<v-divider class="right"></v-divider>
            </v-row>
        <v-row class="d-flex justify-center mt-7">
            <v-btn
            depressed
            color="primary"
            href="http://localhost:3000/auth/google"
            >
                Sign In with Google
            </v-btn>
        </v-row>
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
    line-height: 0.35;
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