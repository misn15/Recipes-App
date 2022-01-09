<template>
<div>Hello Nicole</div>
  
</template>

<script>
import axios from "axios";

export default {
    name: 'signedIn',
    mounted(){
        // to get the cookie data whenever component is mounted. 
        this.checkIfLoggedIn()
        
    },
    methods: {
        checkIfLoggedIn() {
            axios
            .get('http://localhost:3000/auth/check', {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
            })
            .then(response => {
            console.log('response', response.data);
            });
            
        }
    }
}

</script>

<style>

</style>