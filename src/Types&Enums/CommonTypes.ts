import {priority, statusEnum, listingStatus, tradeStatus, role} from "../Types&Enums/Enums";

declare global{
    interface User{
        id?: number;
        user_name: string;
        email?: string;
        phone_number: string;
        role?: role;
        bio?: string;
        profile_picture?: string;
        rating?: number;
        credits?: number;
        totalListings?: number;
        totalTrades?: number;
    }

    interface Listing{
        id: number;
        user_id: number;
        title: string;
        description: string;
        location: string;
        exchange_items: string;
        price: number;
        status: listingStatus;
        listingPicture?: string;
        bidsCount?: number;
        highestBidPrice?: number;
        topBid?: Bid;
    }

    interface Bid{
        id?: number;
        listing_id: number;
        listing_name?:string;
        description: string;
        amount: number;
        bidder_id: number;
        bidder_name?: string;
        bidder_picture?: string;
    }

    interface Tag{
        id: number;
        title: string;
    }

    interface Trade {
        id: number;
        listing_id: number;
        listing_title?: string;
        buyer_id: number;
        buyer_name?: string;
        seller_id: number;
        seller_name?: string;
        status: tradeStatus;
        amount: number;
    }

    interface Rating{
        id: number;
        rating: number;
        listing_id: number;
        trade_id: number;
        rating_giver_id: number;
        rating_taker_id: number;
        comment: string;
    }

    interface Transaction{
        id: number;
        listing_id: number;
        trade_id: number;
        buyer_id: number;
        seller_id: number;
        amount: number;
    }

    
    
    export interface Comments{
        id: number;
        comment: string;
    }
    
    interface ApiResponse<T>{
        status: string;
        message: string;
        data: T;
    }
    
    interface Auth{
        auth_token: string;
        user_id: number; 
    }
}

export function isCommentArray(data: any[]): data is Comments[] {
    return Array.isArray(data) && data.every((item) => 'comment' in item);
}

export function isTagArray(data: any[]): data is Tag[] {
    return Array.isArray(data) && data.every((item) => !('comment' in item) && !('progress' in item) && !('project_id' in item && 'priority' in item));
}

