<template>
  <div class="flex items-center justify-center bg-discord h-screen">
      <div>
          <h1>oAuth2 redirect page</h1>
      </div>
  </div>
</template>

<script>
import { webURL, ClientId } from '../settings.js'
import { useRouter } from 'vue-router';
//import { useStore } from 'vuex'
const jwt = require('jsonwebtoken')

export default {
    setup () {
        const router = useRouter();
        //const store = useStore();
        
        function getParameterByName(name, url = window.location.href) {
            name = name.replace(/[\\[\\]]/g, '\\$&');
            var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, ' '));
        }

        //Fetching Discord API
        fetch("https://discord.com/api/oauth2/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            //@ts-ignore
            body: new URLSearchParams({
                "client_id": ClientId,
                "client_secret": process.env.VUE_APP_DISCORD_CLIENT_SECRET,
                "grant_type": "authorization_code",
                "code": getParameterByName("code"),
                "redirect_uri": `${webURL}oauth2`,
                "scope": "identify"
            })
        })
        .then(response => response.json())
        .then(response => { 
            const access_token = response["access_token"];
            
            const jwt_token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    data: access_token,
                },
                process.env.VUE_APP_ACCESS_TOKEN_SECRET, 
            );
            //Storing the JWT Token in localstorage and vuex
            localStorage.setItem('token', jwt_token);
            //Debug message
            console.log("Signed in");
            router.push('/dashboard');
        })
        .catch(e => {
            console.log(e);
            router.push('/')
        })
    }
}
</script>
