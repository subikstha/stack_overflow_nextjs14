"use server"

import { connectToDatabase } from "../mongoose"

export async function upvote() {
    try{
        connectToDatabase();
    } catch(error){
        console.log(error);
        throw error;
    }
}