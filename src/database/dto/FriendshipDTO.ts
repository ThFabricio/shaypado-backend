export interface FriendshipDTO {
    name: string;
    init_day: Date;
    friend_code: string;
}

export interface listFriendsResponseDTO {
    user_friendship_code: string;
    friends: FriendshipDTO[];
}