//Will go through each confession on load and will check if its in the storage upvotes or downvotes, quicker then using the server.
//When you upvote or downvote, it will call the server but also just change local storage by calling the functions below.
import { create_ip, create_user_key } from "./api_endpoints/api_endpoints"

export const check_if_storage_exists = () => {
    return localStorage.getItem("userState") !== null
}

const has_key = () => {
    if (typeof(Storage) !== "undefined") {
        const userStateString = localStorage.getItem("userState");
        if(userStateString === null) {
            initialise_storage()
            return false
        }
        const userState = JSON.parse(userStateString);
        const key = userState.userKey
       
        return key !== ''
        
    } else {
        console.log("Local storage is not supported by your browser.");
        return false
    }
}

export const get_user_key = async () => {
    if (typeof(Storage) !== "undefined") {
        const userStateString = localStorage.getItem("userState");
        const userState = JSON.parse(userStateString);
        if (!has_key()) {
            const key = await create_user_key();
            userState.userKey = key.key;
            localStorage.setItem("userState", JSON.stringify(userState));
            return key.key
        } else {
            return userState.userKey
        }
        
    } else {
        console.log("Local storage is not supported by your browser.");
    }
}

export const initialise_storage = () => {

    // Check if local storage is supported by the browser
    if (typeof(Storage) !== "undefined") {

        if (!check_if_storage_exists()) {
            // Create an object to represent the userState
            var userState = {
                confession_upvotes: [],
                confession_downvotes: [],
                comment_upvotes: [],
                comment_downvotes: [],
                userKey: '',
            };

            // Convert the object to a JSON string and store it in local storage
            localStorage.setItem("userState", JSON.stringify(userState));
        }
        
    } else {
        console.log("Local storage is not supported by your browser.");
    }
}

export const check_confession_upvote = (confession_id) => {
    if (typeof(Storage) !== "undefined") {
        const userStateString = localStorage.getItem("userState");
        if(userStateString === null) {
            initialise_storage()
            return false
        }
        const userState = JSON.parse(userStateString);
        const confession_upvotes = userState.confession_upvotes
        for (const confession of confession_upvotes) {
            if (confession === confession_id) {
                return true
            }
        }
        return false
        
    } else {
        console.log("Local storage is not supported by your browser.");
        return false
    }
}

export const check_confession_downvote = (confession_id) => {
    if (typeof(Storage) !== "undefined") {
        const userStateString = localStorage.getItem("userState");
        if(userStateString === null) {
            initialise_storage()
            return false
        }
        const userState = JSON.parse(userStateString);
        const confession_downvotes = userState.confession_downvotes
        for (const confession of confession_downvotes) {
            if (confession === confession_id) {
                return true
            }
        }
        return false
        
    } else {
        console.log("Local storage is not supported by your browser.");
        return false
    }
}

export const click_confession_upvote = (confession) => {
    if (typeof(Storage) !== "undefined") {

        if (check_confession_downvote(confession)) {
            remove_confession_downvote(confession)
            add_confession_upvote(confession)
        }
        else if (!check_confession_upvote(confession)) {
            add_confession_upvote(confession);
        } else {
            remove_confession_upvote(confession);
        }
        
        
    } else {
        console.log("Local storage is not supported by your browser.");
    }
}

export const click_confession_downvote = (confession) => {
    if (typeof(Storage) !== "undefined") {
        
        if (check_confession_upvote(confession)) {
            remove_confession_upvote(confession);
            add_confession_downvote(confession)
        }
        else if (!check_confession_downvote(confession)) {
            add_confession_downvote(confession);
        } else {
            remove_confession_downvote(confession)
        }
        
        
    } else {
        console.log("Local storage is not supported by your browser.");
    }
}

export const add_confession_upvote = (confession) => {
    if (typeof(Storage) !== "undefined") {

        if (!check_confession_upvote(confession)) {
            const userStateString = localStorage.getItem("userState");
            const userState = JSON.parse(userStateString);
            const confession_upvotes = userState.confession_upvotes;
            confession_upvotes.push(confession);
            userState.confession_upvotes = confession_upvotes;
            localStorage.setItem("userState", JSON.stringify(userState));
        }
        
    } else {
        console.log("Local storage is not supported by your browser.");
    }
}

export const remove_confession_upvote = (confession) => {
    if (typeof(Storage) !== "undefined") {
        const userStateString = localStorage.getItem("userState");
        if(userStateString === null) {
            initialise_storage()
        }
        const userState = JSON.parse(userStateString);
        let confessionUpvotes = userState.confession_upvotes;
        userState.confession_upvotes = confessionUpvotes.filter((confessionUpvote) => confessionUpvote !== confession);
        localStorage.setItem("userState", JSON.stringify(userState));
        
    } else {
        console.log("Local storage is not supported by your browser.");
    }
}

export const add_confession_downvote = (confession) => {
    if (typeof(Storage) !== "undefined") {
        if (!check_confession_downvote(confession)) {
            const userStateString = localStorage.getItem("userState");
            if(userStateString === null) {
                initialise_storage()
            }
            const userState = JSON.parse(userStateString);
            userState.confession_downvotes.push(confession);
            localStorage.setItem("userState", JSON.stringify(userState));
        }
        
    } else {
        console.log("Local storage is not supported by your browser.");
    }
}

export const remove_confession_downvote = (confession) => {
    if (typeof(Storage) !== "undefined") {
        const userStateString = localStorage.getItem("userState");
        if(userStateString === null) {
            initialise_storage()
        }
        const userState = JSON.parse(userStateString);
        let confessionDownvotes = userState.confession_downvotes;
        userState.confession_downvotes = confessionDownvotes.filter((confessionDownvote) => confessionDownvote !== confession);
        localStorage.setItem("userState", JSON.stringify(userState));
    } else {
        console.log("Local storage is not supported by your browser.");
    }
}
