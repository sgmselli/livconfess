import { CONFESSIONS_URL, NEW_CONFESSIONS_URL, HOT_CONFESSIONS_URL, POST_URL, UPVOTE_URL, DOWNVOTE_URL, UPVOTED_URL, DOWNVOTED_URL, TOP_CONFESSIONS_URL, COMMENT_URL, COMMENT_UPVOTE_URL, COMMENT_DOWNVOTE_URL, COMMENT_UPVOTED_URL, COMMENT_DOWNVOTED_URL, IP_URL } from "./urls";

import { get_endpoint, post_endpoint } from "./template_endpoints";

export const get_confession = async (id) => {
    return await post_endpoint(CONFESSIONS_URL, {id:id})
}

export const get_new_confessions = async () => {
    return await get_endpoint(NEW_CONFESSIONS_URL)
}

export const get_hot_confessions = async () => {
    return await get_endpoint(HOT_CONFESSIONS_URL)
}

export const get_top_confessions = async () => {
    return await get_endpoint(TOP_CONFESSIONS_URL);
}

export const post_confession = async (username, instagram, text) => {
    return await post_endpoint(POST_URL, {username:username, instagram:instagram, text:text})
}

export const upvote_post = async (id) => {
    return await post_endpoint(UPVOTE_URL, {id: id});
}

export const downvote_post = async (id) => {
    return await post_endpoint(DOWNVOTE_URL, {id: id});
}

export const is_upvoted = async (id) => {
    return await post_endpoint(UPVOTED_URL, {id: id});
}

export const is_downvoted = async (id) => {
    return await post_endpoint(DOWNVOTED_URL, {id: id});
}

export const post_comment = async (id, text) => {
    return await post_endpoint(COMMENT_URL, {id:id, text:text})
}

export const upvote_comment = async (id) => {
    return await post_endpoint(COMMENT_UPVOTE_URL, {id: id});
}

export const downvote_comment = async (id) => {
    return await post_endpoint(COMMENT_DOWNVOTE_URL, {id: id});
}

export const comment_is_upvoted = async (id) => {
    return await post_endpoint(COMMENT_UPVOTED_URL, {id: id});
}

export const comment_is_downvoted = async (id) => {
    return await post_endpoint(COMMENT_DOWNVOTED_URL, {id: id});
}

export const create_ip = async () => {
    return await post_endpoint(IP_URL);
}
