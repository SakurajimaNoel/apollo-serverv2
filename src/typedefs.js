export const typeDefs = `#graphql

type User {
    id: ID!
    name: String!
    username: String!
    email: String!
    dob: Date!
    bio: String
    profilePicture: String
    createdOn: DateTime! @timestamp(operations: [CREATE])
    posts: [Post!]! @relationship(type: "HAS_POSTED", direction: OUT)
    friends: [User!]! @relationship(type: "IS_FRIEND", properties: "IsFriend", direction: OUT, queryDirection: DEFAULT_UNDIRECTED)
}

type Post{
    id: ID! @id
    caption: String
    content: [String]
    likes: Int!
    createdBy: User! @relationship(type: "HAS_POSTED", direction: IN)
    createdOn: DateTime! @timestamp(operations: [CREATE])
    comments: [Comment!]! @relationship(type: "COMMENT_ON", direction: IN)
    likedBy: [User!]! @relationship(type: "LIKED_BY", direction: OUT)
}

type Comment{
    id: ID! @id
    content: [CommentContent]!
    createdOn: DateTime! @timestamp(operations: [CREATE])
    commentBy: User! @relationship(type: "COMMENT_BY", direction: OUT)
    commentOn: Post! @relationship(type: "COMMENT_ON", direction: OUT)
}

input CommentContent {
    text: String!
    data: String
}


interface IsFriend @relationshipProperties{
    status: FriendshipStatus!
    requestedBy: ID!
    addedOn: DateTime! @timestamp(operations: [CREATE])
}

enum FriendshipStatus{
    PENDING
    ACCEPTED
}

`;