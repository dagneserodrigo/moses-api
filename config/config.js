try {
    const dotenv = require('dotenv')
    dotenv.load()
} catch (e) { console.log(e) }

module.exports = {
    serviceAccountFirebird: {
        "type": "service_account",
        "project_id": "moses-auth",
        "private_key_id": process.env.PRIVATE_KEY_ID,
        //"private_key": process.env.PRIVATE_KEY,
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEugIBADANBgkqhkiG9w0BAQEFAASCBKQwggSgAgEAAoIBAQDrh9ZKGoKaXQOZ\nbg+3zSqI5OiUVOdMkbW5lON+QcVez0RK5kM28cQWP0JJ2m1/bBj1Ot5nGrHxLMbp\nkGSkyQoYJJL5KFJBk2/Q1X0fEg+LwTwBH74yo8bBEnrQzKJ08rV7QAWkTtyPUW6e\n95thSvGvP6EPLiRolnVqEb2OAPvylDILPUW4CF070wpAfzpJhk4dgmkZFT/Sv2kH\nKCjmnQ7pVvZlL+mix6ja01vvkX+rBAQyta/FrMze0DVqRtqH2833nWyozhZ2D8l2\naYRMsO75rDJtHg8WQMX6lS4o23KH/e963NslKTkEqFh2ZXqXhEsE3LucBJQe08q3\nxEdpmofrAgMBAAECgf8ZXdD/l9tUe4t5+s5I2M/ggMbU6b22XNZ+uIpaDrtXn0Qp\nXzWU2eKyOYug+uViZh1ulQ0VxIEceGzz31AcJh0UxbcOjEkrD/8ffrofnokyqJ0W\n751n1s3+2LWGEIQA79nAbG3l+yqhaWzuRE7ldL8lILU37VKQzH79WzTqhAwMOJBG\nbnfegzQd5XC+j2O+GW+/Nt23jl+0RaavtA2SHAs3SMv3lXh/xpdzxiCCHNC2jP2W\nAH+sQ1t7K8gcnaAsUuL3uOTd1gTig68g8jLT+gErTofbKPfArnkRjuZpQTmT+gs3\nG86WA7wX2cdOKH9esszCq7j3CQHfd2f5B17LwZkCgYEA903E8FO4zOsxuGxqn82F\nUPbrNquW3Vr+GPaI9Pwh3JKuySzjB8icp86Tcub0A8F04mMJi08TqwAd2Pk9mgs4\ntmz8+rYUAUUjm/Uzd3CeZinZA34L1rUEWoZhmnHdgeMrEqhuPHwagco7x+/iB60q\nhJfZnfJey0kq18c9uwvzM50CgYEA89AV6Hxdeo4LkNq1LuLnc02lZsu6jnm3YbHO\nuKqhQzZtsi4iWclJ/u5Tu/fM4lboGejxqCU+p4+C0oU4yb4Z6mPQJ4HVrFe9xrRl\nanrxmgdMBaEH6u5wtWal8NleKzt9gNemH4GYVrmhfIHLlHpwExPASinoXOvKK+CM\npd535ycCgYBb8AGDBtzw8Y7ubP/GoPUrAGC5Vlkjuaw1Q5Hu4b0E71MjXxiX0DDN\nAbM3SDz3GHiHoSHvNFqve7+c5ivMlNdkmmgCHKabQkTWufWENc3tVSlkbvufunP/\n421tqV8b5oQgz5ULz2dbUP+geMGi8PGZkYpJec1b7buLtHpyiyLC0QKBgEehHK6e\nyv/Ud4VpG83Yj9MKPsvCkt6E1+F10ZvjVVlfxj6Q2zqxrnGdJzCUDrd4fNwP2d9i\ngdPMj8y1owdyOD7qcB8LP/FQHcsg+KKd2Bk+h5EnzCGzR52juKDX25ir86VEteOP\nuWfRRaZEo8DNb9vK87VWNpQGGfFmGSwp/eQFAoGAb4LI3yJi35GH5tHbCMr/R1oA\nuiHgDHpEQbE876LEgXkYI7OeKg6Wk4PEU+BeEQveBp6bxPc4Qu966CMgd7QNEs+y\n5+hbPOWNKAbqSzrXObbUms0RyTKaJwRjVJlr5+UX4SidF5N8oY3iNnnLhI6Nhcbj\n95lDd3t0YgVwpeXEKQc=\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-a48s4@moses-auth.iam.gserviceaccount.com",
        "client_id": process.env.CLIENT_ID,
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://accounts.google.com/o/oauth2/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-a48s4%40moses-auth.iam.gserviceaccount.com"
    },
    ServerKey: process.env.SERVER_KEY,
    PORT: 8888,
    TokenClientTest: process.env.TOKEN_CLIENT_TEST
}
