export class registerUser {
    static userArray = []

    constructor (name, password, gmail) {
        if (this.isValidUsername(name) !== true) {
            const err = new Error("Username is required to be 3 characters or longer and does not contain special characters")
            err.code = "INVALID USERNAME"
            throw err
        }

        if (this.isValidPassword(password) !== true) {
            const err = new Error("Password needs to be 5 characters or longer")
            err.code = "INVALID PASSWORD"
            throw err
        }

        if(this.isValidGmail(gmail) !== true) {
            const err = new Error("Email is missing @ or .com")
            err.code = "INVALID EMAIL"
            throw err
        }

        this.userId = this.newId()
        this.name = name
        this.password = password
        this.gmail = gmail
        registerUser.userArray.push(this)
    }

    isValidUsername(username) {
        let forbiddenValues = ['"', "'", "@", ":", ",", ".", "-", "_", "*", ";", "|", "/", "?", "=", "%", "#", "!", "$", "£", "§", "½", "{", "}", "[", "]", "`", "^", ">", "<", "+", "&", "¤"]

        let invalidValues = forbiddenValues.some(forbidden => username.includes(forbidden))

        if(typeof username === "string" && username.length >= 3 && !invalidValues) {
            return true
        }
        return false
    }

    isValidPassword (pass) {
        if (typeof pass === "string" && pass.length >= 5) {
            return true
        }
        return false
    }

    isValidGmail(email) {
        if(typeof email === "string" && email.includes("@") && email.includes(".com")) {
            return true
        }
        return false
    }

    newId () {
        if(registerUser.userArray.length <= 0) {
            return 1
        }
        let currentUserId = -Infinity
        for (let i = 0; i < registerUser.userArray.length; i++) {
            if(registerUser.userArray[i].userId > currentUserId) {
                currentUserId = registerUser.userArray[i].userId
            }
        }
        return currentUserId + 1
    }
}