import * as functions from "../Frontend/functions.js"
import { registerUser } from "./classes.js"

async function handler (request) {

    const url = new URL(request.url)

    const headersCORS = new Headers()
    headersCORS.set("Access-Control-Allow-Origin", "*");
    headersCORS.set("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
    headersCORS.set("Access-Control-Allow-Headers", "Content-Type");
    if(request.method === "OPTIONS") {
        return new Response(null, { status: 204, headers: headersCORS })
    }

    if (url.pathname === "/register") {

        if (request.method === "POST") {
            try {
                const jsonCheck = await functions.validateJsonConType(request, headersCORS)
                if(jsonCheck !== true) {
                    return jsonCheck
                }

                const userRegistrationData = await request.json()

                if (!userRegistrationData.registerUsername || !userRegistrationData.registerPassword || !userRegistrationData.registerGmail) {
                    return new Response(JSON.stringify({error: "All fields needs to fill the requirements"}), { status: 400, headers: headersCORS})
                }

                let allUsers = await Deno.readTextFile("./USERS.json")
                let allUsersParsed = JSON.parse(allUsers)


                if(allUsersParsed.find(user => user.gmail.toLowerCase() === userRegistrationData.registerGmail.toLowerCase())) {
                    return new Response(JSON.stringify({error: "Gmail already in use"}), { status: 406, headers: headersCORS})
                } 

                const newUser = new registerUser(userRegistrationData.registerUsername, userRegistrationData.registerPassword, userRegistrationData.registerGmail)

                allUsersParsed.push(newUser)

                await Deno.writeTextFile("./USERS.json", JSON.stringify(allUsersParsed, null, 2))
                return new Response(JSON.stringify({userId: newUser.userId, username: newUser.name, userBalance: newUser.balance}), { status: 202, headers: headersCORS})
            } catch (err) {
                if(err.code === "INVALID USERNAME") {
                    return new Response(JSON.stringify({error: "INVALID USERNAME"}), { status: 409, headers: headersCORS })
                }
                if(err.code === "INVALID PASSWORD") {
                    return new Response(JSON.stringify({error: "INVALID PASSWORD"}), { status: 409, headers: headersCORS })
                }
                if(err.code === "INVALID EMAIL") {
                    return new Response(JSON.stringify({error: "INVALID EMAIL"}), { status: 409, headers: headersCORS })
                }

                return new Response(JSON.stringify({error: "Unkown error"}), { status: 500, headers: headersCORS })
            }
            
        }
    }

    if(url.pathname === "/login") {
        if (request.method === "POST") {
            try {
                
                const jsonCheck = await functions.validateJsonConType(request, headersCORS)
                if(jsonCheck !== true) {
                    return jsonCheck
                }

                const loginData = await request.json()

                let userAccounts = Deno.readTextFileSync("./USERS.json")
                let Accounts = JSON.parse(userAccounts)

                let correctUser = Accounts.find(user => user.name.toLowerCase() === loginData.loginUsername.toLowerCase() && user.password === loginData.loginPassword)
                if (correctUser) {
                    return new Response(JSON.stringify({userId: correctUser.userId, username: correctUser.name, userBalance: correctUser.balance}), { status: 202, headers: headersCORS })
                }   

                return new Response(JSON.stringify({error: "Wrong username or password"}, { status: 404, headers: headersCORS }))
                


            } catch (err) {
                return new Response(JSON.stringify({error: "Unknown error"}), { status: 500, headers: headersCORS})
            }



        }
    }

    return new Response(JSON.stringify({error: "Internal server issue"}), { status: 500, headers: headersCORS })
    
}
Deno.serve(handler)